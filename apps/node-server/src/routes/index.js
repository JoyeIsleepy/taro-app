import Router from "@koa/router";
import { demoController } from "../controllers/demo.js";

const router = new Router({
  prefix: "/api",
});

router.get("/ping", (ctx) => {
  ctx.body = { msg: "pong" };
});

router.get("/", (ctx) => {
  ctx.body = "Koa server is running!";
});

router.get("/demo", demoController);

export default router;
