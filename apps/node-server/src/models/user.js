import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // 姓名为必填项
      trim: true, // 去除首尾空格
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true, // 钱包地址必须是唯一的
      trim: true,
    },
    // 你可以在这里添加更多字段，例如：
    // email: String,
    // avatar: String,
    // role: { type: String, enum: ['user', 'admin'], default: 'user' }
  },
  { timestamps: true } // 自动添加 createdAt 和 updatedAt 字段
);

export const User = mongoose.model('User', UserSchema);
