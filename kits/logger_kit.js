const bunyan = require('bunyan');

function reqSerializer(req) {
    return {
        method: req.method,
        url: req.uri.href,
        headers: req.headers,
        body: req.body,
    };
}

const logger = bunyan.createLogger({
    name: 'hiteacher',
    streams: [{
        level: 'info',
        stream: process.stdout,
    }, {
        level: 'error',
        stream: process.stdout,
    }],
    serializers: {
        req: reqSerializer,
    },
});

module.exports = logger;
