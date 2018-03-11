/**
 * Author: Ruo
 * Create: 2018-03-05
 * Description:
 */

import {observable, action} from 'mobx';
import {formDate2YMDHMS} from 'DFUtils';

class Article {
    //TODO 改名为Article
    /**
     * 文章对象
     * @param title
     * @param tags
     * @param content
     */
    constructor({
        id = null,
        title = '',
        tags = [],
        content = {},
        publishDate = null,
        lastUpdateDate = null,
        hasPublished = false,
    } = {
        id: null,
        title: '',
        tags: [],
        content: {},
        publishDate: null,
        lastUpdateDate: null,
        hasPublished: false,
    }) {
        this.set({id, title, tags, content, publishDate, lastUpdateDate, hasPublished});
    }

    @observable id = null;
    @observable authorId = null;
    @observable title = '';
    @observable tags = [];
    @observable content = {};
    @observable publishDate = null;
    @observable lastUpdateDate = formDate2YMDHMS(new Date());
    @observable hasPublished = false; // publish tag
    @observable checked = false; // delete tag

    // @action('setArticle')
    set({id, title, tags, content, publishDate, lastUpdateDate, hasPublished}) {
        this.id = id || this.id;
        this.title = title || this.title;
        this.tags = tags || this.tags;
        this.content = content || this.content;
        this.publishDate = publishDate || this.publishDate;
        this.lastUpdateDate = lastUpdateDate || this.lastUpdateDate;
        this.hasPublished = hasPublished || this.hasPublished;
    }
}

export {Article};