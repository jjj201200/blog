/**
 * Author: Ruo
 * Create: 2018-03-04
 * Description:
 */

import {observable, action} from 'mobx';
import {Ajax, inClient} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, convertFromRaw} from 'draft-js';

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
    @action
    createBlog(param) {
        // TODO 参数校验
        Ajax({
            type: 'post',
            url: '/api/blog?method=create',
            data: {...param},
            success: (res) => {
                if (res && res.code === 0) {
                    this.updateLocalEditorState(res.data);
                }
            },
            fail: (res) => {
                console.error(res);
            },
        });
    }

    @action
    saveDraft(param) {
        // TODO 参数校验
        Ajax({
            type: 'post',
            url: '/api/blog?method=draft',
            data: {...param},
            success: (res) => {
                if (res && res.code === 0) {
                    console.log(res);
                }
            },
            fail: (res) => {
                console.error(res);
            }
        })
    }
}

export default BlogStore;
