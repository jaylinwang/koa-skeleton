'use strict';

const bunyan = require('bunyan');
const Redis = require('ioredis');

const logger = bunyan.createLogger({
    name: 'api request',
});

module.exports = (opts) => {
    const redis = new Redis(opts);
    redis.on('error', (err) => {
        if (err) {
            logger.error('connect to redis error, check your redis config', err);
            process.exit(1);
        }
    });
    return redis;
};
