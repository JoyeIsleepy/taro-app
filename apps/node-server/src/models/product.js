import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    categoryType: {
      type: [String],
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
      trim: true,
    },
    // 核心修改：image 改为对象数组，包含 url + name
    image: {
      type: [
        {
          name: { type: String, required: true, trim: true }, // 文件名
          url: { type: String, required: true, trim: true }, // 图片URL
        },
      ],
      required: true,
      validate: {
        validator: v => v.length > 0, // 至少一张图片
        message: '商品图片不能为空',
      },
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', ProductSchema);
