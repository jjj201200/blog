/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

import {observable, action, toJS} from 'mobx';
import {Ajax, inClient, JSON_CONTENT_TYPE} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, convertFromRaw} from 'draft-js';
import {Article} from 'DFModels';

/**
 * 一个用来管理文章发布界面的类
 * 初始化文章发布界面
 * 保存文章发布界面当前的状态
 */
class EditorStore extends BasicStore {
    constructor(rootStore) {
        super('EditorStore', rootStore, [localStorage]);
        this.load(); // 载入本地localstorage的数据（如果有的话）
        this.article = null; // 编辑器状态对象
    }

    @observable newNumberId = 0;
    @observable article = undefined;
    articleList = observable.map({});
    deleteArticleList = observable.array([]); // 待删除文章id列表
    @observable hasSavedOnline = false;

    /**
     * temp local number id
     * @returns {number}
     */
    get articleNumber() {
        return ++this.newNumberId;
    }

    /**
     * temp local id
     * @returns {number}
     */
    get articleId() {
        return (new Date()).getTime();
    }

    /**
     * 获取指定文章id的数据
     * @param {string} articleId
     */
    @action
    getArticle(articleId) {
        return Ajax({
            type: 'get',
            url: 'api/article',
            data: JSON.stringify({
                articleId,
                method: 'get',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                console.log(res);
            },
            fail: (e) => {
                console.error(e);
            },
        });
    }

    /**
     * 拉取远程文章列表并初始化本地列表
     */
    @action
    initArticleListByUsername(username) {
        const that = this;
        return Ajax({
            type: 'get',
            url: 'api/article',
            data: {
                username,
                method: 'getListByUsername',
            },
            dataType: 'json',
            success: (res) => {
                if (res && res.data && res.code === 0) {
                    _.forEach(res.data, (value) => {
                        if (!that.articleList.has(value._id)) {
                            const articleObject = {id: value._id, ...value};
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
                // 获取本地文章缓存数据
            },
            fail: (e) => {
                console.error(e);
            },
        });
    }

    /**
     * 获取本地存贮的文章数据
     *
     */
    @action
    initLocalArticle() {
        const localArticle = toJS(this.store.get('localArticle')); // 获取本地存储的文章
        // console.log(localArticle);
        if (!localArticle) return false;
        // this.article = {title, tags, content};
        if (!this.articleList.has(localArticle._id)) {
            this.articleList.set(localArticle._id, new Article(value));
        } else if (this.hasSavedOnline) { // 已经在线上保存
            return;
        } else {
            /**
             * TODO
             * 本地有数据且没有保存
             * 处理出具冲突
             */
        }
        return localArticle;
    }

    /**
     * 创建文章条目
     * @param param
     */
    @action
    createArticle(title, tags, content) {
        // TODO 参数校验
        // console.log(title, tags, content);
        return Ajax({
            type: 'post',
            url: '/api/article',
            data: JSON.stringify({
                title, tags, content,
                method: 'create',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                if (res && res.code === 0) {
                    console.log(res);
                }
            },
            fail: (res) => {
                console.error(res);
            },
        });
    }

    /**
     * 更新（保存）文章内容
     * @param articleId
     * @param title
     * @param tags
     * @param content
     */
    @action
    updateArticle(articleId, title, tags, content) {
        // TODO 参数校验
        // console.log(title, tags, content);
        return Ajax({
            type: 'post',
            url: '/api/article',
            data: JSON.stringify({
                articleId, title, tags, content,
                method: 'update',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                if (res && res.code === 0) {
                    console.log(res);
                }
            },
            fail: (res) => {
                console.error(res);
            },
        });
    }

    /**
     * 删除文章
     * @param articleId
     */
    @action
    deleteArticle(articleIdArray) {
        const that = this;
        return Ajax({
            type: 'post',
            url: 'api/article',
            data: JSON.stringify({
                articleIdArray,
                method: 'delete',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                const array = toJS(articleIdArray);
                _.map(array, (articleId) => {
                    that.articleList.delete(articleId);
                    articleIdArray.remove(articleId);
                });
                console.log(res);
            },
            fail: (e) => {
                console.error(e);
            },
        });
    }

    /**
     * 发布文章
     * @param param
     */
    @action
    publish(articleId, hasPublished) {
        if (hasPublished)
            return Ajax({
                type: 'post',
                url: 'api/article',
                data: JSON.stringify({
                    articleId,
                    hasPublished,
                    method: 'publish',
                }),
                contentType: JSON_CONTENT_TYPE,
                success: (res) => {
                    console.log(res);
                },
                fail: (e) => {
                    console.error(new Error(e));
                },
            });
    }

    /**
     * 取消发布
     * @param articleId
     * @param hasPublished
     */
    @action
    unpublish(articleId, hasPublished) {
        return Ajax({
            type: 'post',
            url: 'api/article',
            data: JSON.stringify({
                articleId,
                hasPublished,
                method: 'unpublish',
            }),
            contentType: JSON_CONTENT_TYPE,
            success: (res) => {
                console.log(res);
            },
            fail: (e) => {
                console.error(new Error(e));
            },
        });
    }

    /*@action
    deleteLocalContentState() {
        this.store.delete('localContentState');
    }*/

    /**
     * 初始化文章对象，两种情况:
     * 1. 通过已有数据创建文章对象
     * 2. 创建新的文章对象
     */
    @action
    createLocalArticle(articleData) {
        if (articleData) {
            this.article = new Article(articleData);
        } else {
            this.article = new Article({title: `新建文章 ${this.articleNumber}`});
            this.article.tempId = this.articleId; // 没有保存到线上的临时使用的本地id
            this.articleList.set(this.articleId, this.article);
        }
    }

    @action
    saveLocalArticle(draftObject) {
        this.store.set('localDraft', draftObject);
    }
}

export default EditorStore;
