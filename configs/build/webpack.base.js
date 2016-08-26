const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
// const npmRoot = path.resolve(process.cwd(), 'node_modules');

module.exports = {
    context: path.resolve(process.cwd(), 'public/src'),
    entry: {
        common: ['./scripts/common/index'],
    },
    output: {
        path: path.join(process.cwd(), 'public/src/js/'),
        publicPath: 'src/js/',
        filename: '[name].js',
    },
    resolve: {
        alias: {},
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css'],
        }, {
            test: /\.(woff2?|svg)$/,
            loader: 'url?limit=10000',
        }, {
            test: /\.(ttf|eot)$/,
            loader: 'file',
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
            },
        }],
    },
    plugins: [
        new CommonsChunkPlugin({
            name: 'core',
            filename: 'core.js',
        }),
        new webpack.ProvidePlugin({}),
    ],
};
