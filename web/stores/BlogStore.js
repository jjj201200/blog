/**
 * Author: Ruo
 * Create: 2018-03-04
 * Description:
 */

import _ from 'lodash';
import {observable, action, toJS} from 'mobx';
import {Ajax, inClient} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, convertFromRaw} from 'draft-js';
import {Article} from 'DFModels';

export class BlogStore extends BasicStore {
    constructor(rootStore) {
        super('BlogStore', rootStore, [localStorage]);
    }

    @observable requestSending = false;

    articleList = observable.map({});

    @action
    getArticleListByPublished() {
        const that = this;
        if (this.requestSending) return;
        this.requestSending = true;
        return Ajax({
            type: 'get',
            url: '/api/article',
            data: {
                method: 'getListByPublished',
            },
            dataType: 'json',
            success: (res) => {
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
        }).always(() => {
            this.requestSending = false;
        })
    }
    /**
     * 获取指定文章id的数据
     * @param {string} articleId
     */
    @action
    getArticle(articleId) {
        const that = this;
        if (this.requestSending) return;
        this.requestSending = true;
        return Ajax({
            type: 'get',
            url: '/api/article',
            data: {
                articleId,
                method: 'get',
            },
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                if (res.code === 0 && res.data) {
                    // console.log(res.data);
                    that.article.content = res.data.content;
                    this.initEditorState();
                    this.root.stores.GlobalStore.onOpenSnackbar({
                        msg: 'get article successfully',
                    });
                }
            },
            fail: (e) => {
                console.error(e);
            },
        }).always(() => {
            this.requestSending = false;
        });
    }
}
