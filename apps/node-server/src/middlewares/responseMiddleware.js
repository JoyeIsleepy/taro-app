import { success, fail } from "./response.js";

export default async function responseMiddleware(ctx, next) {
  try {
    await next();

    // 如果控制器已经返回 ctx.body，则自动包装 success
    if (ctx.body !== undefined) {
      ctx.body = success(ctx.body);
    }
  } catch (err) {
    console.error("API Error:", err);

    ctx.status = 200; // 前端更好处理
    ctx.body = fail(err.message || "服务器错误", err.status || -1);
  }
}
