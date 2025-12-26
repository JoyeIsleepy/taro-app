import qiniu from 'qiniu';
import { throwError } from '../middlewares/response.js';

export async function uploadToQiniu(fileBuffer, originalName, mimetype) {
  const ACCESS_KEY = process.env.QINIU_AK;
  const SECRET_KEY = process.env.QINIU_SK;
  const BUCKET = process.env.QINIU_BUCKET;
  const DOMAIN = process.env.QINIU_DOMAIN;

  const mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0;

  if (!ACCESS_KEY || !SECRET_KEY || !BUCKET || !DOMAIN) {
    throwError('七牛云配置缺失', 500);
  }

  // 上传时指定一个带扩展名的临时 key（七牛会用这个作为实际存储名）
  const tempKey = `${Date.now()}_${originalName}`;

  const options = {
    scope: BUCKET,
    expires: 3600,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const formUploader = new qiniu.form_up.FormUploader(config);
  const putExtra = new qiniu.form_up.PutExtra();

  return new Promise((resolve, reject) => {
    formUploader.put(uploadToken, tempKey, fileBuffer, putExtra, (err, body, info) => {
      if (err) return reject(err);

      if (info.statusCode === 200) {
        resolve({
          key: body.key,
          hash: body.hash,
          url: `${DOMAIN}/${body.key}`,
        });
      } else {
        reject(new Error(`上传失败: ${info.statusCode} ${JSON.stringify(body)}`));
      }
    });
  });
}
