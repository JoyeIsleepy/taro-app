import { demoService } from "../services/demo.js";

export const demoController = async (ctx) => {
  // try {
  //   // 1. 从 ctx 中获取你需要的入参
  //   // 这里演示了几种常见的参数获取方式
  //   const urlParams = ctx.params; // 从 URL 路径中获取的参数 (例如 /user/:id)
  //   const queryParams = ctx.query; // 从 URL 查询字符串中获取的参数 (例如 /list?page=1&size=10)
  //   const postData = ctx.request.body; // 从 POST 请求体中获取的数据 (需要 koa-bodyparser 中间件)

  //   // 2. (可选) 对参数进行验证或处理
  //   // ...

  //   // 3. 调用 Service 层函数，并将参数传递过去
  //   // 你可以根据需要传递一个或多个参数
  //   const serviceResult = await demoService(postData, queryParams);

  //   // 4. 将 Service 的返回结果作为响应发送给客户端
  //   ctx.body = {
  //     ...serviceResult,
  //   };
  // } catch (error) {
  // 错误处理

  const postData = ctx.request.body;

  // 示例1：手动校验失败，直接抛出错误
  if (!postData || !postData.username) {
    // 主动抛出一个 Error 对象
    // 你可以自定义错误信息和状态码
    const error = new Error("用户名不能为空");
    error.status = 400; // 例如，400 Bad Request
    throw error;
  }

  // 示例2：调用 service，如果 service 内部抛出错误，也会被中间件捕获
  const serviceResult = await demoService(postData);

  // 如果一切正常，设置成功的响应体
  ctx.body = serviceResult;
  // }
};
