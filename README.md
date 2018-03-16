# react-mobx-ssr

### 安装

### MongoDB

```bash
# 添加安装库配置
$ sudo vi /etc/yum.repos.d/mongodb-org.repo
```

```ini
# /etc/yum.repos.d/mongodb-org.repo
# 注意版本号
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc
```
```Bash
# 执行这行确认添加成功
$ yum repolist
```
**mac 下可以使用下面的代码安装来替代以上配置安装方法**
```Bash
$ sudo brew install mongodb
```
**安装**
```Bash
$ sudo yum install mongodb-org -y
```

**设置为系统服务**

```Bash
$ sudo systemctl start mongod # 启动服务
$ sudo systemctl start mongod # 停止服务
$ sudo systemctl status mongod.service # 查看服务状态
$ sudo systemctl reload mongod # 重新读取/etc/mongod.conf配置
```

**log**

```Bash
$ sudo tail /var/log/mongodb/mongod.log # 查看最后10条log
```

**other**

```Bash
$ mongo # 进入当前运行文本行界面
```

默认数据库目录在 `/var/lib/mongo`

### Other

```bash
$ mkdir db
$ npm install
# launch mongodb
$ mongod --dbpath=./db # 在该目录启动数据库软件
# launch server
$ npm run dev
```

### Node-sass

```Bash
$ sudo npm i node-sass --save-dev
$ sudo npm rebuild node-sass
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



### ME - 中断

NONE



### BE - 后端

mongoose:[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)

egg.js:[http://eggjs.org/zh-cn/intro/](http://eggjs.org/zh-cn/intro/)

MongoDB:[https://docs.mongodb.com/](https://docs.mongodb.com/)



### Other

mobx-logger:[https://github.com/winterbe/mobx-logger](https://github.com/winterbe/mobx-logger)



***本工程支持 css in js, sass, styled component 和 less***



## 文件目录

```bash
project
┣━ app - egg.js后端文件目录
┃  ┣━ controller - CMS中的c部分
┃  ┣━ extend
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
┣━ run
┣━ .babelrc
┣━ .eslintignore
┣━ .eslintrc.json
┣━ .gitignore
┣━ .npmrc
┣━ app.js - egg.js后端入口，使用了babel-polyfill和babel-register，注册了react模板编译器
┣━ package.json
┣━ README
┣━ webpack.basic.config.js - 不能用来直接编译
┣━ webpack.development.config.js
┣━ webpack.production.config.js
┗━ webpack.dll.config.js - 提前编译

```



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
