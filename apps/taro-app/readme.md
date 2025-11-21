## taro常用命令

   快速生成页面：taro create home 

## 项目目录

├── dist/                       # 编译结果目录
│
├── config/                     # 项目编译配置目录
│   ├── index.js                # 默认配置
│   ├── dev.js                  # 开发环境配置
│   └── prod.js                 # 生产环境配置
│
├── src/                        # 源码目录
│   ├── pages/                  # 页面目录
│   │   └── index/              # index 页面
│   │       ├── index.js        # 页面逻辑
│   │       ├── index.css       # 页面样式
│   │       └── index.config.js # 页面配置
│   │
│   ├── app.js                  # 项目入口文件
│   ├── app.css                 # 全局样式
│   └── app.config.js           # 应用配置（注册页面）
│
├── project.config.json         # 微信小程序项目配置
├── project.tt.json             # 抖音小程序项目配置
├── project.swan.json           # 百度小程序项目配置
├── project.qq.json             # QQ 小程序项目配置
├── ascf.config.json            # ASCF 元服务项目配置
│
├── babel.config.js             # Babel 配置
├── tsconfig.json               # TypeScript 配置
├── .eslintrc                   # ESLint 配置
│
└── package.json                # 项目依赖与脚本
