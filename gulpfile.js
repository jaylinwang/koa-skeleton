'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const nodemon = require('gulp-nodemon');
const webpack = require('webpack');
const sass = require('gulp-sass');
const base64 = require('gulp-base64');
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace');
const gulpSequence = require('gulp-sequence');
const plumber = require('gulp-plumber');
const del = require('del');

const webpackDevCfg = require('./configs/build/webpack.development');
const webpackProdCfg = require('./configs/build/webpack.production');

//= =====================================================
// # 公共操作
// ## sass编译
// ## 删除不想干文件
//= ======================================================

// 压缩合并css, css中既有自己写的.scss, 也有引入第三方库的.css
gulp.task('build:sass', () => {
    gulp.src(['public/src/styles/*.scss'])
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(base64())
        .pipe(gulp.dest('./public/src/css'));
});

// 删除目录
gulp.task('clean', () => {
    del(['public/publish/**/*']).then(paths => {
        gutil.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

//= ===========================================
// # 开发相关操作
// ## 编译js
// ## 监听文件变化
// ## nodemon模式启动
//= ===========================================

// 开发环境中编译js
gulp.task('build:js-dev', () => {
    webpack(webpackDevCfg, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
        }));
    });
});

// 监听src下文件变化
gulp.task('watch', () => {
    gulp.watch(['public/src/styles/**/*.scss'], ['build:sass']);
    gulp.watch('public/src/styles/**/*.js', ['build:js-dev']);
});

// nodemon setting
gulp.task('nodemon:wap-dev', () => {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        // ignore: ['public/**/*'],
        env: {
            NODE_ENV: 'wap-dev',
        },
    });
});
gulp.task('nodemon:wechat-dev', () => {
    nodemon({
        script: 'app.js',
        ext: 'js html',
        env: {
            NODE_ENV: 'wechat-dev',
        },
    });
});

// 开发任务入口
gulp.task('dev:wechat', gulpSequence(
    ['build:sass', 'build:js-dev'],
    'watch',
    'nodemon:wechat-dev'
));

gulp.task('dev:wap', gulpSequence(
    ['build:sass', 'build:js-dev'],
    'watch',
    'nodemon:wap-dev'
));

//= ===========================================
// # 发布到线上环境操作
// ## 编译js
// ## 文件md5后缀及文件中文件引入替换
// ## 监听文件变化
// ## nodemon模式启动
//= ===========================================

// # 生产环境中编译js
gulp.task('build:js-pro', (cb) => {
    webpack(webpackProdCfg, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({
            colors: true,
        }));
        cb();
    });
});

// publish setting
gulp.task('revision', () => {
    gulp.src(['public/src/**/*'])
        .pipe(plumber())
        .pipe(rev())
        .pipe(gulp.dest('public/publish'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('public/publish'));
});
gulp.task('revreplace', () => {
    const manifest = gulp.src('public/publish/rev-manifest.json');
    return gulp.src('views/dev/**/*.html')
        .pipe(revReplace({
            manifest,
        }))
        .pipe(gulp.dest('views/prod'));
});

// nodemon setting
gulp.task('nodemon:wap-preprod', () => {
    nodemon({
        script: 'app.js',
        ext: 'js hbs',
        ignore: [
            'public/**/*', 'views/**/*',
        ],
        env: {
            NODE_ENV: 'wap-preprod',
        },
    });
});
gulp.task('nodemon:wechat-preprod', () => {
    nodemon({
        script: 'app.js',
        ext: 'js hbs',
        ignore: [
            'public/**/*', 'views/**/*',
        ],
        env: {
            NODE_ENV: 'wechat-preprod',
        },
    });
});

// 发布任务入口
gulp.task('publish:wechat', gulpSequence(
    'clean', ['build:sass', 'build:js-pro'],
    'revision',
    'revreplace',
    'nodemon:wechat-preprod'
));
gulp.task('publish:wap', gulpSequence(
    'clean', ['build:sass', 'build:js-pro'],
    'revision',
    'revreplace',
    'nodemon:wap-preprod'
));
