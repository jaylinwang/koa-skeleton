const config = {
    /**
     * 程序运行端口
     */
    port: 3000,

    /**
     * 静态资源路径
     */
    resource_url: '/build',

    /**
     * 视图路径
     */
    view_path: `${process.cwd()}/views/dev`,

    /**
     * redis
     */
    redis: {
        host: '',
        port: 6379,
        prefix: 'jaylinwang_session_',
        pass: '',
        db: 7,
        ttl: 60 * 60 * 2,
    },

    /**
     * session secret setting
     */
    session_secret: 'jaylinwang_secret',

    /**
     * auth_cookie_name setting
     */
    auth_cookie_name: 'sunny',

    /**
     * 执行上下文
     */
    scope: 'wechat',

    /**
     * 站点地址
     */
    site_url: 'http://172.16.1.224:4000',
};

//= ================================================
// # 微信环境配置
//= ================================================

// 微信上下文
//
if (process.env.NODE_ENV === 'wechat-dev' ||
    process.env.NODE_ENV === 'wechat-preprod' ||
    process.env.NODE_ENV === 'wechat-prod') {
    config.scope = 'wechat';
    config.port = 4000;
    config.session_secret = 'jaylinwang_wechat_secret';
    config.auth_cookie_name = 'jaylinwang_wechat';
    config.site_url = 'http://172.16.1.224:4000';
}

// 预生产环境
//
if (process.env.NODE_ENV === 'wechat-preprod') {
    config.resource_url = '';
    config.site_url = 'http://w.jx-cloud.cc';
    config.view_path = `${process.cwd()}/views/pro`;
}

// 生产环境
if (process.env.NODE_ENV === 'wechat-prod') {
    config.resource_url = '';
    config.site_url = 'http://jaylinwang_wechat.com.cn';
    config.view_path = `${process.cwd()}/views/pro`;
    config.redis = {
        // # 内网
        host: '',
        // # 外网
        // host: '120.24.44.32',
        port: 6379,
        pass: '',
        db: 7,
        prefix: 'jaylinwang_wechat_session_',
        ttl: 60 * 60 * 2,
    };
}

//= ================================================
// # 手机网站环境配置
//= ================================================

// wap上下文
if (process.env.NODE_ENV === 'wap-dev' ||
    process.env.NODE_ENV === 'wap-preprod' ||
    process.env.NODE_ENV === 'wap-prod') {
    config.scope = 'wap';
    config.port = 5000;
    config.session_secret = 'jaylinwang_wap_secret';
    config.auth_cookie_name = 'jaylinwang_wap';
    config.site_url = 'http://192.168.100.201:5000';
}

//  预生产环境
if (process.env.NODE_ENV === 'wap-preprod') {
    config.resource_url = 'http://s.jxcstatic.com/wapstatics';
    config.site_url = 'http://w.jx-cloud.cc';
    config.view_path = `${process.cwd()}/views/pro`;
}

// 生产环境
if (process.env.NODE_ENV === 'wap-prod') {
    config.resource_url = '';
    config.site_url = '';
    config.view_path = `${process.cwd()}/views/pro`;
    config.redis = {
        // # 内网
        host: '',
        // # 外网
        // host: '120.24.44.32',
        port: 6379,
        pass: '',
        db: 7,
        prefix: 'jaylinwang_wap_session_',
        ttl: 60 * 60 * 2,
    };
}

module.exports = config;
