FROM node:18-alpine

WORKDIR /app

# 1. 启用 corepack（Node 16+ 自带）
RUN corepack enable

# 2. 拷贝 workspace 关键文件
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# 3. 拷贝当前服务的 package.json
COPY apps/node-server/package.json apps/node-server/

# 4. 安装依赖（只装当前服务）
RUN pnpm install --filter ./apps/node-server... --prod

# 5. 拷贝源码
COPY . .

WORKDIR /app/apps/node-server

EXPOSE 3001
CMD ["pnpm", "start"]
