# react-mobx-ssr

### 安装

### Mongdb → [link](./install_mongodb.m)

### Node-sass

```bash
$ sudo npm i node-sass --save-dev
$ sudo npm rebuild node-sass
```

### Rest packages

```bash
$ mkdir db
$ npm i
$ npm install shelljs -g
# launch mongodb
$ mongod --dbpath=./db # 在该目录启动数据库软件
# launch server
$ npm run dev
```

## 部署

```Bash
# 构建
## dll - 当外部库(node_modules)变化时重新构建
$ npm run build:dll
## development
$ npm run build:dev
## production
$ npm run build
# 启动
$ npm run start
$ npm run start:7001 #在7001端口打开
$ npm run stop

# 包分析 - 不能在服务端启用
$ npm run analysis
```



### 说明

#### webpack

1. 分三个文件basic，development 和 production
   1. basic 包含`entry`，`output`，`externals`，`resolve`，`module`配置和一些path导出
   2. development 和 production 仅对`devtool`，`output`和`plugin`进行修改和补充
2. development 和 production 都采用了DLL方式加载，所以都需要先跑一下`$ npm run build:dll`
3. production 时的output目录在`app/public` 也就是`appPath`，这是egg.js约定的，可以改，但是需要改egg.js的配置，不推荐





### FE - 前端

Mobx:[https://mobx.js.org/](https://mobx.js.org/)

material ui:[https://material-ui-next.com](https://material-ui-next.com)

Draft.js:[https://draftjs.org/docs/](https://draftjs.org/docs/)

react-draft-wysiwyg:[https://jpuri.github.io/react-draft-wysiwyg/#/docs](https://jpuri.github.io/react-draft-wysiwyg/#/docs)



### ME - 中端

NONE



### BE - 后端

mongoose:[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)

egg.js:[http://eggjs.org/zh-cn/intro/](http://eggjs.org/zh-cn/intro/)

MongoDB:[https://docs.mongodb.com/](https://docs.mongodb.com/)



### Other

mobx-logger:[https://github.com/winterbe/mobx-logger](https://github.com/winterbe/mobx-logger)



## 文件目录

```bash
project
┣━ app - egg.js后端文件目录
┃  ┣━ controller
┃  ┣━ extend - egg.js中约定的扩展目录
┃  ┃  ┣━ application.js - 对app对象的扩展
┃  ┃  ┣━ context.js - 对ctx对象的扩展
┃  ┃  ┣━ helper.js - 对ctx.helper对象的扩展
┃  ┣━ middleware - 中间件
┃  ┣━ model
┃  ┣━ public
┃  ┣━ service
┃  ┣━ view
┃  ┗━ router.js
┣━ config
┃  ┣━ babelRegister.config.js
┃  ┣━ config.default.js - egg.js默认配置文件
┃  ┗━ plugin.js
┣━ db - 数据库
┣━ lib
┃  ┣━ framework.js
┃  ┗━ reactRenderEngine.js - react模板渲染器
┣━ i18n
┣━ logs
┣━ node_modules
┣━ web
┃  ┣━ components - 基于ui库的组件
┃  ┣━ libs
┃  ┣━ models - 对应于后端model的模型，用于mobx实例化数据对象，便于管理
┃  ┣━ pages - 页面入口，即需要添加在webpack entry中的文件
┃  ┣━ plugins - 前端（开发）插件
┃  ┃  ┗━ logger - mobx日志插件
┃  ┣━ stores
┃  ┃  ┣━ BasicStore - 数据持久化方案中的基类，所有Store都必须继承自该类
┃  ┃  ┣━ GlobalStore - GBS数据持久化方案中的最上层类，所有Store都必须加载于他
┃  ┃  ┣━ index.js - 实例化并初始化GBS的入口文件
┃  ┃  ┣━ UserStore - 用户数据相关Store，包含登录注册和是否需要登录校验等
┃  ┃  ┣━ EditorStore - 文章编辑器相关数据Store，包含发布，上传，下载等
┃  ┃  ┗━ BlogStore - 文章数据相关Store，文章列表数据和文章相信数据相关的操作和管理
┃  ┣━ styles
┃  ┃  ┣━ globalInject.js - 使用Styled-component注入全局样式
┃  ┃  ┣━ theme.js - 以Styled-component语法风格编写的方便调用的样式库对象，包含参数设定
┃  ┃  ┣━ var.js - 以Styled-component语法风格编写的变量/方法导出文件，不包含参数设定
┃  ┣━ uis - ui组件，以后改为ui库
┃  ┗━ utils
┣━ .babelrc
┣━ .eslintignore
┣━ .eslintrc.json
┣━ .gitignore
┣━ .npmrc
┣━ app.js - egg.js后端入口，使用了babel-polyfill和babel-register，注册了react模板编译器
┣━ package.json
┣━ README
┣━ webpack.config.js - 这个文件仅仅用来给IDE读取alias用，不用来编译!!
┣━ webpack.config.basic.js - 不能用来直接编译
┣━ webpack.config.development.js - 先编译dll脚本
┣━ webpack.config.production.js - 先编译dll脚本
┗━ webpack.config.dll.js - 提前编译

```

*** 不知道为什么webstorm明明可以指定webpack设置文件，但是只有默认的webpack文件名才有用**

##样式

提倡使用Styled-component定制全局样式，将常用样式组合模块化，个别特殊的/不常用的样式使用sass/less

***支持 css in js, sass, styled component 和 less***



## 数据持久化
全局对象: GBS - GlobalStore
二级对象: UserStore, BlogStore 等

UserStore等二级Store需要继承BasicStore，其提供了初始化方法，如下:
``` javaScript
    class BlogStore extends BasicStore {
        constructor(rootStore) {
            /**
             * param1 记录store的名字
             * param2 全局GBS对象，用于在特殊情况下调用
             * param3 数据持久化类型，默认为memoryStorage?cookieStorage，必须以数组的形式传入
             */
            super('BlogStore', rootStore, [localStorage]);
        }
    }
```


## Questions & Suggestions
