const Router = require('koa-router');
const homeRouter = require('./home');

const router = new Router();

router.use('/', homeRouter.routes(), homeRouter.allowedMethods());

module.exports = router;
