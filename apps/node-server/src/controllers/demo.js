import { demoService } from "../services/demo.js";

export const demoController = async (ctx) => {
  const data = await demoService();
  ctx.body = {
    code: 0,
    data,
  };
};
