import { createProductService, getProductListService } from '../services/productService.js';
import { throwError } from '../middlewares/response.js';

// 商品列表分页查询控制器
export const getProductListController = async ctx => {
  try {
    // 1. 获取分页参数
    const { current, pageSize } = ctx.request.body;

    // 2. 调用 Service 层查询
    const serviceResult = await getProductListService(current, pageSize);

    // 3. 返回响应
    ctx.body = serviceResult;
  } catch (error) {
    console.error('查询商品列表失败:', error);
    throwError(error.message || '查询失败', error.status || 500);
  }
};
/**
 * 新增商品控制器
 * @param {Koa.Context} ctx - Koa 上下文
 */
export const createProductController = async ctx => {
  try {
    const postData = ctx.request.body;
    // 2. 基础参数校验（前置兜底）
    const requiredFields = ['categoryType', 'productName', 'price', 'image'];
    const missingFields = requiredFields.filter(field => !postData[field]);
    if (missingFields.length > 0) {
      throwError(`缺少必填字段：${missingFields.join(',')}`, 400);
    }

    // 3. 校验 image 格式（必须是数组且包含有效项）
    if (!Array.isArray(postData.image) || postData.image.length === 0) {
      throwError('商品图片不能为空', 400);
    }

    // 4. 调用 Service 层创建商品
    const serviceResult = await createProductService(postData);

    // 5. 返回成功响应
    ctx.body = serviceResult;
  } catch (error) {
    console.error('创建商品失败:', error);
    // 若未自定义错误码，默认 500
    throwError(error.message || '创建商品失败', error.status || 500);
  }
};
