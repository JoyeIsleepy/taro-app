export default async function errorMiddleware(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.error("❌ Server Error:", err);

    ctx.status = err.status || 500;
    ctx.body = {
      code: err.code || -1,
      message: err.message || "Server Error",
    };
  }
}
