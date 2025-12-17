import Router from '@koa/router';
import { demoController } from '../controllers/demo.js';
import { upload } from '../middlewares/uploadMiddleware.js';
import { uploadFile } from '../controllers/uploadController.js';

const publicRouter = new Router({
  prefix: '/public',
});

publicRouter.get('/demo', demoController);
publicRouter.post('/file', upload.single('file'), uploadFile);

export default publicRouter;
