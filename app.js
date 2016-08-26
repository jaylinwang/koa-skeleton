const Koa = require('koa');
const views = require('koa-views');
const nunjucks = require('nunjucks');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const convert = require('koa-convert');
const csrf = require('koa-csrf');

const logger = require('./kits/logger_kit');
const routers = require('./routers');
const siteCfg = require('./configs/site_cfg');

const app = new Koa();

app.use(convert(session({
    store: redisStore(siteCfg.redis),
})));

app.use(convert(csrf()));

app.use(views(siteCfg.view_path, {
    map: {
        html: 'nunjucks',
    },
}));

// nunjucks配置
nunjucks.configure(siteCfg.view_path);

app.use(routers.routes());

app.listen(siteCfg.port, () => {
    logger.info({
        port: siteCfg.port,
        env: app.env,
    }, '服务器启动信息');
});
