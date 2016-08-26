const bunyan = require('bunyan');
const Promise = require('bluebird');

const logger = bunyan.createLogger({
    name: 'api request',
});

const baseRequest = require('requestretry').defaults({
    gzip: true,
    encoding: 'utf8',
    headers: {
        'User-Agent': 'request from node',
    },
    maxAttempts: 3, // 最大尝试次数
    retryDelay: 3000, // 每次重试间隔时间
    fullResponse: true,
    promiseFactory: (resolver) => new Promise(resolver),
});

/**
 * api请求
 * @param  {string} url
 * @param  {Object} data
 * @param  {Object} options
 */
const request = function (url, data, options) {
    const mData = Object.assign({}, data || {});
    const mOptions = Object.assign({
        url,
        form: mData,
    }, options || {});
    const beginDate = new Date();
    return baseRequest(mOptions).then((response) => {
        const time = new Date() - beginDate;
        logger.info(`request <${url}> cost ${time}`);
        try {
            const body = JSON.parse(response.body);
            if (body.ret !== -500 && body.ret !== -404) {
                return body;
            }
            logger.error({
                error: body,
            }, 'API请求错误');
            throw new Error('API请求错误');
        } catch (error) {
            throw new Error('API返回一个非json数据');
        }
    }).catch((error) => {
        logger.error({
            error,
        });
    });
};

/**
 * api post请求
 * @param  {string} url
 * @param  {Object} data
 * @param  {Object} options
 */
const post = function (url, data, options) {
    Object.assign({
        method: 'POST',
    }, options || {});

    return request(url, data, options);
};

/**
 * api get请求
 * @param  {string} url
 * @param  {Object} data
 * @param  {Object} options
 */
const get = function (url, data, options) {
    Object.assign({
        method: 'GET',
    }, options || {});
    return request(url, data, options);
};

exports.get = get;
exports.post = post;
