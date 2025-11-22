export const authMiddleware = async (ctx, next) => {
  const token = ctx.headers.authorization;

  if (!token) {
    ctx.status = 401;
    ctx.body = { message: "Unauthorized" };
    return;
  }

  // TODO: token 校验逻辑
  try {
    // verify token
    await next();
  } catch (e) {
    ctx.status = 401;
    ctx.body = { message: "Invalid token" };
  }
};
