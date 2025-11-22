import Router from "@koa/router";
import { authMiddleware } from "../middlewares/auth.js";
import { userInfoController } from "../controllers/user.js";

const authRouter = new Router({
  prefix: "/auth",
});

// 这里加 token 校验
authRouter.use(authMiddleware);

// 所有路由都需要 token
authRouter.get("/userinfo", userInfoController);

export default authRouter;
