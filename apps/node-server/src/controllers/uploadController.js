import { success, throwError } from '../middlewares/response.js';
import { uploadToQiniu } from '../services/qiniuService.js';

export async function uploadFile(ctx) {
  const file = ctx.file;
  const { fileName } = ctx.request.body;

  if (!file) {
    throwError('没有上传文件', 400);
  }

  try {
    const realName = fileName || file.originalname;
    const { url, key, hash } = await uploadToQiniu(file.buffer, realName, file.mimetype);
    ctx.body = {
      url,
      key,
      hash,
      size: file.size,
      originalName: file.originalname,
    };
  } catch (err) {
    console.error('七牛上传失败:', err);
    throwError('上传失败，请稍后重试', 500);
  }
}
