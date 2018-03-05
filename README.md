# react-mobx-ssr

## QuickStart

```bash
$ sudo brew install mongodb
$ mkdir db
$ npm install
// run db
$ mongod --dbpath=./db
// run server
$ npm run dev
```

###FE

Mobx:[https://mobx.js.org/](https://mobx.js.org/)

material ui:[https://material-ui-next.com](https://material-ui-next.com)

Draft.js:[https://draftjs.org/docs/](https://draftjs.org/docs/)

react-draft-wysiwyg:[https://jpuri.github.io/react-draft-wysiwyg/#/docs](https://jpuri.github.io/react-draft-wysiwyg/#/docs)

###BE

mongoose:[http://mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html)

egg.js:[http://eggjs.org/zh-cn/intro/](http://eggjs.org/zh-cn/intro/)

MongoDB:[https://docs.mongodb.com/](https://docs.mongodb.com/)

###Other

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
