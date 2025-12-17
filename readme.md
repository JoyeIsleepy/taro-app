# Monorepo 中为指定子包安装/删除依赖说明

在 **pnpm workspace（monorepo）** 中，依赖是 **集中管理的**，不应该进入子目录直接执行 `pnpm add`。

正确做法是：

- **在根目录执行命令**
- 使用 `--filter` 指定子包名称（即 package.json 的 name 字段）

---

## 🎯 示例：在 `taro-app` 中安装 / 删除 koa

### ✅ 安装依赖到 taro-app
```bash
pnpm --filter taro-app add koa
```

### ❌ 错误写法（不要进入子目录执行）
```bash
cd apps/node-server
pnpm add koa   # ❌ 会污染 workspace
```

### ✅ 删除依赖
```bash
pnpm --filter node-server remove koa
```

---

## 📌 为什么不能进入 node-server 执行安装？

因为：

- pnpm workspace **不会在子目录安装 node_modules**
- 所有依赖存放在根目录统一的 `pnpm-lock.yaml` 中
- 需要通过 `--filter` 精确指定安装目标子包

---

## 🧩 Taro 新建页面命令

Taro 自动生成页面（会自动写入路由）：

```bash
taro create page <page-name>
```

示例：

```bash
taro create page pages/home/index
```

---

## 📁 项目目录结构

```
/project-root
├─ apps/
│  ├─ taro-app/        # 小程序前端（Taro）
│  └─ node-server/     # 后端 Node.js（Koa）
│
├─ packages/
│  ├─ shared/          # 公共逻辑（utils、工具方法）
│  ├─ types/           # 数据模型、接口 TypeScript 定义
│  ├─ api-sdk/         # 前端可直接 import 的后端 API 封装
│
├─ pnpm-workspace.yaml
└─ package.json
```


/var/www/myapp
│── docker-compose.yml
├── Dockerfile
│──packages/
│──apps/
│  ├─ node-server/       
│     ├─ types/          
│     ├── package.json
│     ├── src/
│── mongo_data/  