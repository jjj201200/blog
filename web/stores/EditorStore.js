/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

import {observable, action, toJS} from 'mobx';
import {Ajax, inClient, JSON_CONTENT_TYPE} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
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
        this.openArticle = ::this.openArticle;
        this.saveArticleOnline = ::this.saveArticleOnline;
        this.publish = ::this.publish;
        this.unpublish = ::this.unpublish;
    }

    @observable newNumberId = 0;
    @observable article = null;
    articleList = observable.map({});
    deleteArticleList = observable.array([]); // 待删除文章id列表
    @observable deleteModeState = false; // 是否处在草稿删除模式
    @observable editorState = null; // 编辑器状态对象

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
        const that = this;
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
                }
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
            url: '/api/article',
            data: {
                username,
                method: 'getListByUsername',
            },
            dataType: 'json',
            success: (res) => {
                if (res && res.data && res.code === 0) {
                    _.forEach(res.data, (value) => {
                        if (!that.articleList.has(value._id)) {
                            const articleObject = {id: value._id, hasSavedOnline: true, ...value};
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
        if (!this.articleList.has(localArticle._id)) { // 没有相同id的文章
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
     * 初始化文本编辑器对象
     */
    @action
    initEditorState() {
        const article = toJS(this.article);
        if (_.isEmpty(article.content)) { // 获取content
            this.editorState = EditorState.createEmpty();
        } else {
            if (!article.content.entityMap) article.content.entityMap = {};
            this.editorState = EditorState.createWithContent(convertFromRaw(article.content));
        }
    }

    /**
     * 将文章保存到线上
     */
    @action
    saveArticleOnline() {
        // const content = this.props.EditorStore.saveFunc();
        // console.log({title, tags, content});
        const contentObject = convertToRaw(this.editorState.getCurrentContent());
        this.article.content = contentObject;
        const article = toJS(this.article); // 获取需要保存的文章数据
        /**
         * 判断是否是新建的文章
         * 是否有id 没有就是新建的
         */
        if (article.id) {
            this.updateArticle(article.id, article.title, article.tags, article.content);
        } else {
            this.createArticle();
        }
    }

    /**
     * 在本地打开有的文章
     */
    openArticle(article) {
        this.article = article;
        if (_.isEmpty(article.content)) { // 如果没有拉过数据就拉一下content
            this.getArticle(article.id);
        } else { // 否则就直接加载本地数据
            this.initEditorState();
        }
    }

    /**
     * 创建文章条目
     * @param {string} title
     * @param {array} tags
     * @param {object} content
     * @param {number} tempId 当使用tempId创建新的文章时需要传递这个参数
     */
    @action
    createArticle() {
        const that = this;
        try {
            if (!this.article) {
                throw new Error('no article need to create online');
            }
            const {tempId, title, tags, content} = this.article;
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
                        const {_id: id, ...rest} = res.data;
                        that.article = new Article({
                            id, hasSavedOnline: true, ...rest,
                        });
                        that.articleList.delete(tempId);
                        that.articleList.set(id, that.article);
                        that.initEditorState();
                        console.log(that.article);
                    }
                },
                fail: (res) => {
                    console.error(res);
                },
            });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 更新（保存）文章内容
     * @param articleId
     * @param title
     * @param tags
     * @param content
     */
    @action
    updateArticle() {
        // TODO 参数校验
        const that = this;
        try {
            if (!this.article) {
                throw new Error('no article need to update');
            }
            const {id, title, tags, content} = this.article;
            return Ajax({
                type: 'post',
                url: '/api/article',
                data: JSON.stringify({
                    articleId: id, title, tags, content,
                    method: 'update',
                }),
                contentType: JSON_CONTENT_TYPE,
                dataType: 'json',
                success: (res) => {
                    if (res && res.code === 0) {
                        const {_id: id, ...rest} = res.data;
                        console.log(res.data);
                        that.article.set({
                            id, hasSavedOnline: true, ...rest,
                        });
                    }
                },
                fail: (res) => {
                    console.error(res);
                },
            });
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * 删除文章
     * @param articleId
     */
    @action
    deleteArticle() {
        const that = this;
        const deleteArticleList = toJS(this.deleteArticleList);
        return Ajax({
            type: 'post',
            url: '/api/article',
            data: JSON.stringify({
                articleIdArray: deleteArticleList,
                method: 'delete',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                _.map(deleteArticleList, (articleId) => { // 删除成功后清理本地数据
                    that.articleList.delete(articleId); //  清理文章列表
                    that.deleteArticleList.remove(articleId); // 清理待删除文章id列表
                    if (that.article && that.article.id === articleId) { // 如果被删除文章已被打开则也清空
                        that.article = null;
                    }
                });
                if (that.articleList.size === 0) this.deleteModeState = false;
                console.log(res);
            },
            fail: (e) => {
                console.error(e);
            },
        });
    }

    /**
     * 发布文章
     * @param articleId
     */
    @action
    publish() {
        if (this.article) {
            const that = this;
            const articleId = this.article.id;
            return Ajax({
                type: 'post',
                url: '/api/article',
                data: JSON.stringify({
                    articleId,
                    hasPublished: true,
                    publishDate: new Date(),
                    method: 'publish',
                }),
                contentType: JSON_CONTENT_TYPE,
                success: (res) => {
                    if (res && res.code === 0) {
                        const {_id: id, ...rest} = res.data;
                        that.article.set({
                            id, hasSavedOnline: true, ...rest,
                        });
                    }
                },
                fail: (e) => {
                    console.error(new Error(e));
                },
            });
        }
    }

    /**
     * 取消发布
     * @param articleId
     */
    @action
    unpublish() {
        if (this.article) {
            const that = this;
            const articleId = this.article.id;
            return Ajax({
                type: 'post',
                url: '/api/article',
                data: JSON.stringify({
                    articleId,
                    hasPublished: false,
                    method: 'unpublish',
                }),
                contentType: JSON_CONTENT_TYPE,
                success: (res) => {
                    if (res && res.code === 0) {
                        const {_id: id, ...rest} = res.data;
                        that.article.set({
                            id, hasSavedOnline: true, ...rest,
                        });
                    }
                },
                fail: (e) => {
                    console.error(new Error(e));
                },
            });
        }
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
        this.initEditorState(); // 使用 this.article 初始化文本编辑器环境
    }

    @action
    saveLocalArticle(draftObject) {
        this.store.set('localDraft', draftObject);
    }
}

export default EditorStore;
