import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";
import responseMiddleware from "./middlewares/responseMiddleware.js"; // 注意路径
import { loadEnv } from "./config.js";

loadEnv();

const app = new Koa();

// 1️⃣ 全局错误处理
app.use(errorMiddleware);

// 2️⃣ CORS
app.use(cors());

// 3️⃣ Body 解析
app.use(bodyParser());

// 4️⃣ 成功返回标准化
app.use(responseMiddleware);

// 5️⃣ 路由
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Koa server running at http://localhost:${PORT}`);
});
