import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";
import { loadEnv } from "./config.js";

loadEnv();

const app = new Koa();

// 全局错误处理
app.use(errorMiddleware);

// CORS
app.use(cors());

// Body 解析
app.use(bodyParser());

// 路由
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Koa server running at http://localhost:${PORT}`);
});
