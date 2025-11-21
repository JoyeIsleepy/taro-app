pnpm Monorepo + 前端 Taro + 后端 Node（koa）

/project-root
 ├─ apps/
 │   ├─ taro-app/        # 小程序前端
 │   └─ node-server/     # 后端 node 服务
 │
 ├─ packages/
 │   ├─ shared/          # 公共逻辑（utils）
 │   ├─ types/           # 数据模型、接口类型
 │   ├─ api-sdk/         # 前端可直接 import 的 API 封装
 │
 ├─ pnpm-workspace.yaml
 └─ package.json
