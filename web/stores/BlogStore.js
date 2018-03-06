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

}

export default BlogStore;
