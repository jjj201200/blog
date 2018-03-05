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

FE
??? Mobx:                   [](https://mobx.js.org/)
??? material ui:            [](https://material-ui-next.com)
??? Draft.js:               [](https://draftjs.org/docs/)
??? react-draft-wysiwyg:    [](https://jpuri.github.io/react-draft-wysiwyg/#/docs)

BE
??? mongoose:               [](http://mongoosejs.com/docs/guide.html)
??? egg.js:                 [](http://eggjs.org/zh-cn/intro/)
??? MongoDB:                [](https://docs.mongodb.com/)

Other
??? mobx-logger:            [](https://github.com/winterbe/mobx-logger)

**?????css in js?sass ? styled component

## ???????
????: GBS - GlobalStore
??????????store??UserStore?BlogStore

UserStore???Store????BasicStore?????????????
``` javaScript
    class BlogStore extends BasicStore {
        constructor(rootStore) {
            /**
             * param1 ????store???
             * param2 ????GBS?????????
             * param3 ???????????memoryStorage?cookieStorage
             */
            super('BlogStore', rootStore, [localStorage]);
        }
    }
```


## Questions & Suggestions
