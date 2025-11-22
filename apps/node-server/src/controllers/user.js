import { demoService } from "../services/demo.js";

export const userInfoController = async (ctx) => {
  const data = await demoService(ctx);
  ctx.body = {
    data,
  };
};
