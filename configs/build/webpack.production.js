const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseCfg = require('./webpack.base');

module.exports = merge(webpackBaseCfg, {
    cache: true,
    devtool: '#source-map',
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
});
