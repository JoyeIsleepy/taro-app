
## 📁 项目目录结构

```
/node-server
├─ src/
│  ├─ controllers/        
│  ├─ middlewares/        
│  ├─ models/        
│  ├─ routes/        
│  └─ services/ 
└─ package.json
```


服务器

/var/www/myapp
├── docker-compose.yml        # Docker 编排文件
├── Dockerfile                # 后端 Node 服务 Dockerfile（workspace 用）
│
├── packages/                 # monorepo 公共包（如 utils / api / types）
│   ├── api/
│   ├── utils/
│   └── ...
│
├── apps/
│   └── node-server/         
│       ├── package.json
│       ├── src/
│       │   ├── index.js
│       │   ├── app.js
│       │   └── ...
│       ├── types/
│       └── ...
│
├── mongo_data/               # MongoDB 数据持久化目录
│
└── 
    ├── pnpm-workspace.yaml   # pnpm workspace 定义
    └── pnpm-lock.yaml        # pnpm 锁文件
