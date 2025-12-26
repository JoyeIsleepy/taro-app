// utils/upload.js 或组件内
import Taro from '@tarojs/taro';
import API from '@packages/api';
import { prefix } from '../utils/config'; // 根据你的配置调整

export async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    let fileName = '';
    if (file?.originalFileObj?.name) {
      fileName = file.originalFileObj.name;
    } else {
      const fileType = file.fileType;
      const ext = fileType.split('/')[1] || 'jpg';
      fileName = `默认文件_${Date.now()}.${ext}`;
    }

    Taro.uploadFile({
      url: `${prefix}${API.COMMON.UPLOAD_URL}`,
      filePath: file.tempFilePath || file.thumbTempFilePath,
      name: 'file',
      header: {
        // 可选：带 token
        // 'Authorization': `Bearer ${Taro.getStorageSync('token')}`,
      },
      formData: {
        fileName: fileName,
        fileType: file.fileType,
      },
      success: res => {
        if (res.statusCode === 200) {
          const data = JSON.parse(res.data);
          resolve(data);
        } else {
          reject(new Error(`上传失败: ${res.statusCode}`));
        }
      },
      fail: err => {
        console.error('上传失败:', err);
        reject(err);
      },
    });
  });
}
