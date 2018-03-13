# react-mobx-ssr

### 安装mongoDB

```bash
# 添加安装库配置
$ sudo vi /etc/yum.repos.d/mongodb-org.repo
```

```ini
# /etc/yum.repos.d/mongodb-org.repo
# 注意版本号
[mongodb-org-3.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.4.asc
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

### 安装其他环境

```bash
$ mkdir db
$ npm install
# launch mongodb
$ mongod --dbpath=./db
# launch server
$ npm run dev
```

#### Node-sass

```Bash
$ npm i node-sass --save-dev
$ npm rebuild node-sass
```



### FE

Mobx:[https://mobx.js.org/](https://mobx.js.org/)

material ui:[https://material-ui-next.com](https://material-ui-next.com)

Draft.js:[https://draftjs.org/docs/](https://draftjs.org/docs/)

react-draft-wysiwyg:[https://jpuri.github.io/react-draft-wysiwyg/#/docs](https://jpuri.github.io/react-draft-wysiwyg/#/docs)

### BE

mongoose:[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)

egg.js:[http://eggjs.org/zh-cn/intro/](http://eggjs.org/zh-cn/intro/)

MongoDB:[https://docs.mongodb.com/](https://docs.mongodb.com/)

### Other

mobx-logger:[https://github.com/winterbe/mobx-logger](https://github.com/winterbe/mobx-logger)

**本工程支持css in js, sass, styled component

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
