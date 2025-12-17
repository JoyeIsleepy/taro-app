// src/services/qiniuService.js
import qiniu from 'qiniu';
import { throwError } from '../middlewares/response.js';

export async function uploadToQiniu(fileBuffer, originalName, mimetype) {
  // 七牛配置（建议从环境变量读取）
  const ACCESS_KEY = process.env.QINIU_AK;
  const SECRET_KEY = process.env.QINIU_SK;
  const BUCKET = process.env.QINIU_BUCKET;
  const DOMAIN = process.env.QINIU_DOMAIN;

  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0; // 根据你的空间区域修改

  if (!ACCESS_KEY || !SECRET_KEY || !BUCKET || !DOMAIN) {
    throwError('七牛云配置缺失', 500);
  }

  const key = `${Date.now()}_${Math.random().toString(36).substr(2, 8)}${originalName ? '_' + originalName : ''}`;

  const options = {
    scope: BUCKET,
    expires: 3600,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  // 可选：保留文件扩展名（强烈推荐，便于浏览器识别类型）
  const ext = originalName ? '.' + originalName.split('.').pop() : '';

  return new Promise((resolve, reject) => {
    formUploader.put(uploadToken, null, fileBuffer, putExtra, (err, body, info) => {
      if (err) return reject(err);

      if (info.statusCode === 200) {
        const finalKey = body.hash + ext;

        resolve({
          key: finalKey,
          hash: body.hash,
          url: `${DOMAIN}/${finalKey}`,
        });
      } else {
        reject(new Error(`上传失败: ${info.statusCode} ${JSON.stringify(body)}`));
      }
    });
  });
}
