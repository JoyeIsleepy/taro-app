/**
 * 演示 Service，接收从 Controller 传递过来的参数
 * @param {Object} postData - 从 POST 请求体中获取的数据
 * @param {Object} queryParams - 从 URL 查询字符串中获取的参数
 * @returns {Promise<Object>} - 返回一个包含业务数据的对象
 */
export const demoService = async (postData, queryParams) => {
  // 现在你可以在 Service 内部使用这些传递过来的参数了
  console.log("从 Controller 传递过来的 POST 数据:", postData);
  console.log("从 Controller 传递过来的 Query 参数:", queryParams);

  // ... 在这里执行你的业务逻辑，例如查询数据库、调用第三方API等 ...
  // 这里我们用一个简单的对象来模拟业务逻辑的返回结果
  const result = {
    serviceName: "Koa Service",
    timestamp: Date.now(),
    receivedPostData: postData,
    receivedQueryParams: queryParams,
    message: "成功处理了来自 Controller 的请求",
  };

  return result;
};
