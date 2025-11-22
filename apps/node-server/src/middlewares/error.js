import { fail } from "./response.js";

export default async function errorMiddleware(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.error("❌ Server Error:", err);
    // HTTP 状态保持 200，让前端更容易统一处理
    ctx.status = 500;

    ctx.body = fail(
      err.message || "Server Error",
      err.status || 500,
      err.result || null,
    );
  }
}
