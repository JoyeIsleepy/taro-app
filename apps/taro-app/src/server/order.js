import request from '../utils/request';
import API from '@packages/api';

export const createOrder = data => {
  return request.get(API.ORDER_LIST.LIST, data);
};

export const createProduct = data => {
  return request.post(API.PRODUCT.CREATE, data);
};

export const getProductList = data => {
  return request.post(API.PRODUCT.LIST, data);
};
