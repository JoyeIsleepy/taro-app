import Router from '@koa/router';
import publicRouter from './public.js';
import authRouter from './auth.js';

const router = new Router({
  prefix: '/api',
});

router.use(publicRouter.routes());
router.use(authRouter.routes());

export default router;
