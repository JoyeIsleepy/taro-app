import Router from "@koa/router";
import { demoController } from "../controllers/demo.js";

const publicRouter = new Router({
  prefix: "/public",
});

publicRouter.get("/demo", demoController);

export default publicRouter;
