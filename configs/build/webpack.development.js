const merge = require('webpack-merge');
const webpackBaseCfg = require('./webpack.base');

module.exports = merge(webpackBaseCfg, {
    cache: true,
    devtool: '#source-map',
});
