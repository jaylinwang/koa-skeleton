# koa-skeleton

## 项目描述

    基于koa2的web项目架子，自娱自乐，仅供参考，欢迎指正 :)

## 目录结构

`+`表示一级目录，`++`表示二级目录，`+++`表示三级级目录，

```
+ configs(项目配置文件目录)
++ build(项目编译相关配置) *

+ controllers(项目业务控制代码目录)

+ kits(常用工具包)

+ middlewares(项目中间件)

+ models(业务数据对象，可以是操作数据库，可以是来源于调用api)

+ public(静态资源目录)
++ src(项目静态资源源文件)
+++ fonts(字体文件)
+++ iamges(图片)
+++ styles(未编译样式脚本，本项目使用sass)
+++ scripts(未编译js脚本，本项目部分使用es6)
++ publish(项目静态资源发布文件，发布自动生成)

+ routers(路由配置文件目录)

+ test(项目相关测试文件)

+ views(项目视图目录)
++ dev(开发视图文件)
++ pro(发布视图文件，发布自动生成)

+ app.js(项目入口)

```

## License

MIT - [@jaylinwang](https://github.com/jaylinwang)

