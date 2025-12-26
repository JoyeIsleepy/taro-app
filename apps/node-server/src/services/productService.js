import { Product } from '../models/product.js';
import { throwError } from '../middlewares/response.js';

// 新增：商品分页查询
export const getProductListService = async (current = 1, pageSize = 10) => {
  try {
    const pageNum = Number(current);
    const size = Number(pageSize);
    if (isNaN(pageNum) || isNaN(size) || pageNum < 1 || size < 1) {
      throwError('分页参数错误：current 和 pageSize 必须为正整数', 400);
    }

    const skip = (pageNum - 1) * size;

    const [list, total] = await Promise.all([
      Product.find({})
        .skip(skip)
        .limit(size)
        .sort({ createdAt: -1 })
        .select('-__v -image._id')
        .lean(),
      Product.countDocuments({}),
    ]);

    const formattedList = list.map(item => {
      const formattedImage = item.image.map(img => {
        if (typeof img === 'string') {
          const name = img.split('/').pop() || 'image.png'; // 从URL提取文件名
          return { name, url: img };
        }
        return {
          name: img.name || img.url.split('/').pop() || 'image.png',
          url: img.url,
        };
      });
      return {
        id: item._id,
        categoryType: item.categoryType,
        productName: item.productName,
        price: item.price,
        image: formattedImage,
      };
    });
    console.log(formattedList, 'list');
    // 4. 构造分页返回数据
    return {
      list: formattedList, // 当前页数据列表
      pagination: {
        current: pageNum, // 当前页
        pageSize: size, // 每页条数
        total, // 总条数
        totalPages: Math.ceil(total / size), // 总页数
      },
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throwError(
        Object.values(error.errors)
          .map(e => e.message)
          .join(','),
        400
      );
    }
    throw error;
  }
};

export const createProductService = async productData => {
  try {
    // 核心修改：提取 image 中的 name + url，而非仅 url
    const imageList =
      productData.image?.map(item => {
        // 1. 校验图片上传状态
        if (item.status !== 'success' || !item.url) {
          throwError(`图片 ${item.name || '未知文件'} 上传失败`, 400);
        }
        // 2. 校验 name 是否存在
        if (!item.name) {
          throwError(`图片 URL: ${item.url} 缺少文件名`, 400);
        }
        // 3. 返回包含 name + url 的对象
        return {
          name: item.name, // 保留文件名
          url: item.url, // 保留图片URL
        };
      }) || [];

    // 构造入库数据（匹配修改后的 Model）
    const productInfo = {
      categoryType: productData.categoryType,
      productName: productData.productName,
      price: productData.price,
      image: imageList, // 传入包含 name + url 的对象数组
    };

    // 创建并保存商品
    const newProduct = new Product(productInfo);
    await newProduct.save();

    // 返回格式化结果（包含 name + url）
    return {
      id: newProduct._id,
      categoryType: newProduct.categoryType,
      productName: newProduct.productName,
      price: newProduct.price,
      image: newProduct.image,
      createTime: newProduct.createdAt,
    };
  } catch (error) {
    if (error.name === 'ValidationError') {
      throwError(
        Object.values(error.errors)
          .map(e => e.message)
          .join(','),
        400
      );
    }
    throw error;
  }
};
