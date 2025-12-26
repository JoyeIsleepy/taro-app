import Router from '@koa/router';
import { demoController } from '../controllers/demo.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { uploadFile } from '../controllers/uploadController.js';
import {
  createProductController,
  getProductListController,
} from '../controllers/productController.js';

const publicRouter = new Router({
  prefix: '/public',
});

publicRouter.get('/demo', demoController);
publicRouter.post('/file/upload', upload.single('file'), uploadFile);
publicRouter.post('/product/create', createProductController);
publicRouter.post('/product/list', getProductListController);

export default publicRouter;
