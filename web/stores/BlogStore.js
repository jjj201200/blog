/**
 * Author: Ruo
 * Create: 2018-03-04
 * Description:
 */

import _ from 'lodash';
import {observable, action} from 'mobx';
import {Ajax, inClient} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, convertFromRaw} from 'draft-js';
import {Article} from 'DFModels';

class Blog {
    constructor({
        author = null,
        title = null,
        tags = null,
        content = {},
        publishDate = null,
        lastUpdateDate = null,
    } = {
        author: null,
        title: null,
        tags: null,
        content: {},
        publishDate: null,
        lastUpdateDate: null,
    }) {
        this.set({author, title, tags, content, publishDate, lastUpdateDate});
    }

    @observable author = null;
    @observable title = null;
    @observable tags = null;
    @observable content = {};
    @observable publishDate = null;
    @observable lastUpdateDate = null;

    @action('setBlog')
    set({author, title, tags, content, publishDate, lastUpdateDate}) {
        this.author = author;
        this.title = title;
        this.tags = tags;
        this.content = content;
        this.publishDate = publishDate;
        this.lastUpdateDate = lastUpdateDate;
    }
}

class BlogStore extends BasicStore {
    constructor(rootStore) {
        super('BlogStore', rootStore, [localStorage]);
    }

    articleList = observable.map({});

    @action
    getArticleListByPublished() {
        const that = this;
        return Ajax({
            type: 'get',
            url: '/api/article',
            data: {
                method: 'getListByPublished',
            },
            dataType: 'json',
            success: (res) => {
                // console.log(res);
                if (res && res.code === 0) {
                    _.forEach(res.data, (value) => {
                        if (!that.articleList.has(value._id)) {
                            const articleObject = {id: value._id, author: value.authorId, ...value};
                            that.articleList.set(value._id, new Article(articleObject));
                        } else if (this.hasSavedOnline) { // 已经在线上保存
                            return;
                        } else {
                            /**
                             * TODO
                             * 本地有数据且没有保存
                             * 处理出具冲突
                             */
                        }
                    });
                }
            },
            fail: (e) => {
                console.error(e);
            }
        })
    }
}

export default BlogStore;
