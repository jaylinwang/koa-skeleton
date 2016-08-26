import test from 'ava';

const apiKit = require('../kits/api_kit');

test('api_request', t => {
    const promise = apiKit.post('http://ht.p.jx-cloud.cc:3032/api/pub/live/getLatestCourses');
    return promise.then(body => {
        t.deepEqual({
            ret: -212,
            message: 'invalid client_id',
        }, body);
    });
});
