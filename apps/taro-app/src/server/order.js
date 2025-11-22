import request from "../utils/request";
import API from "@packages/api";

export const createOrder = (data) => {
  return request.get(API.ORDER_LIST.LIST, data).then((res) => {
    console.log(res);
  });
};
