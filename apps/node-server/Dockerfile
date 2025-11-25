# 1. 使用 Node 官方镜像
FROM node:18-alpine

# 2. 设置工作目录
WORKDIR /app

# 3. 仅复制 package.json（加速构建）
COPY package.json package-lock.json* pnpm-lock.yaml* ./

# 4. 安装依赖（即使你本地用 pnpm，这里依然建议用 npm）
RUN npm install --production

# 5. 复制项目源码
COPY . .

# 6. 暴露端口（和 docker-compose 对应）
EXPOSE 3000

# 7. 启动 Koa 服务
CMD ["node", "src/app.js"]
