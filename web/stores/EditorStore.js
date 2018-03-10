/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

import {observable, action, toJS} from 'mobx';
import {Ajax, inClient, JSON_CONTENT_TYPE} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, convertFromRaw} from 'draft-js';
import {Draft} from 'DFModels';

/**
 * 一个用来管理文章发布界面的类
 * 初始化文章发布界面
 * 保存文章发布界面当前的状态
 */
class EditorStore extends BasicStore {
    constructor(rootStore) {
        super('EditorStore', rootStore, [localStorage]);
        this.load(); // 载入本地localstorage的数据（如果有的话）
        this.draft = null; // 编辑器状态对象
    }

    get currentDraft() {
        if (this.draft) return this.draft;
        return this.initDraft();
    };

    set currentDraft(draft) {
        this.draft = draft;
        // this.saveLocalDraft(draft);
    }

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
            }
        })
    }

    /**
     * 获取文章列表
     */
    @action
    getArticleListByUsername(username) {
        return Ajax({
            type: 'get',
            url: 'api/article',
            data: {
                username,
                method: 'getListByUsername',
            },
            dataType: 'json',
            fail: (e) => {
                console.error(e)
            },
        });
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
            }
        });
    }

    /**
     * 更新文章内容
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
            }
        });
    }

    /**
     * 删除文章
     * @param articleId
     */
    @action
    deleteArticle(articleId) {
        return Ajax({
            type: 'post',
            url: 'api/article',
            data: JSON.stringify({
                articleId,
                method: 'delete',
            }),
            contentType: JSON_CONTENT_TYPE,
            dataType: 'json',
            success: (res) => {
                console.log(res);
            },
            fail: (e) => {
                console.error(e);
            }
        })
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
                    method: 'publish'
                }),
                contentType: JSON_CONTENT_TYPE,
                success: (res) => {
                    console.log(res);
                },
                fail: (e) => {
                    console.error(new Error(e));
                }
            })
    }

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
            }
        })
    }



    /*@action
    deleteLocalContentState() {
        this.store.delete('localContentState');
    }*/

    @action
    initDraft() {
        const title = toJS(this.store.get('localTitle'));
        const tags = toJS(this.store.get('localTags'));
        const content = toJS(this.store.get('localContentState'));
        console.log({title, tags, content});
        this.draft = new Draft({title, tags, content});
        return this.currentDraft;
    }

    @action
    saveLocalDraft(draftObject) {
        this.store.set('localDraft', draftObject);
    }
}
export default EditorStore;
