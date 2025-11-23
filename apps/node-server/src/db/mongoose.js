// db.js (建议将数据库连接相关代码放在单独的文件中，如 /config/db.js)
import mongoose from 'mongoose';
import { loadEnv } from '../config.js'; // 假设你的环境变量加载函数在这里

// 确保在使用 process.env 之前加载环境变量
loadEnv();

const MONGO_URI = process.env.MONGO_URI;

// 用于存储数据库连接状态，避免重复连接
let isConnected = false;

export async function connectMongo() {
  // 如果已经连接，则直接返回，避免重复调用 connect
  if (isConnected) {
    console.log('🍃 MongoDB 已处于连接状态。');
    return;
  }

  try {
    // Mongoose 7.x 及以上版本推荐的写法，无需再传入 useNewUrlParser, useUnifiedTopology 等选项
    const conn = await mongoose.connect(MONGO_URI);

    isConnected = true; // 连接成功后，更新状态为已连接

    console.log(`🍃 MongoDB 连接成功: ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ MongoDB 连接失败:', err.message);
    process.exit(1); // 退出程序，以便 Docker/K8s 等服务编排工具可以自动重启
  }
}
