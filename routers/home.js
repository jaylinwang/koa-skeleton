const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
    return next().then(() => {
        // ctx.body = 'home';
        return ctx.render('home/index');
    });
});

module.exports = router;
