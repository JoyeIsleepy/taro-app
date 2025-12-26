import request from '../utils/request';
import API from '@packages/api';

export const uploadFile = data => {
  return request.post(API.COMMON.UPLOAD_URL, data);
};
