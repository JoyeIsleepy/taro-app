import Taro from "@tarojs/taro";
import { prefix } from "../utils/config";

const BASE_URL = process.env.TARO_ENV === "h5" ? "" : "http://localhost:3001";

function getToken() {
  return Taro.getStorageSync("token") || "";
}

const request = (options) => {
  const { url, method = "GET", data, header = {} } = options;

  return new Promise((resolve, reject) => {
    Taro.request({
      url: BASE_URL + prefix + url,
      method,
      data,
      header: {
        "Content-Type": "application/json",
        Authorization: getToken(),
        ...header,
      },
      success(res) {
        const { status, data } = res;

        if (status >= 200 && status < 300) {
          resolve(data);
        } else if (status === 401) {
          Taro.showToast({ title: "请重新登录", icon: "none" });
          Taro.removeStorageSync("token");
          // Taro.redirectTo({ url: "/pages/login/index" });
          reject(res);
        } else {
          Taro.showToast({
            title: data?.message || "请求失败",
            icon: "none",
          });
          reject(res);
        }
      },
      fail(err) {
        Taro.showToast({ title: "网络异常", icon: "none" });
        reject(err);
      },
    });
  });
};

// ⭐ 自动生成 GET / POST / PUT / DELETE 方法
["GET", "POST", "PUT", "DELETE"].forEach((method) => {
  request[method.toLowerCase()] = (url, data = {}, options = {}) =>
    request({
      url,
      method,
      data,
      ...options,
    });
});

export default request;
