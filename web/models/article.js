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
        id,
        title = '',
        tags = [],
        content = {},
        publishDate,
        lastUpdateDate,
        hasPublished = false,
        hasSavedOnline = false,
        hasOpened = false,
        author = {},
    } = {
        id,
        title: '',
        tags: [],
        content: {},
        publishDate,
        lastUpdateDate,
        hasPublished: false,
        hasSavedOnline: false,
        hasOpened: false,
        author: {},
    }) {
        this.set({id, title, tags, content, publishDate, lastUpdateDate, hasPublished, hasSavedOnline, hasOpened, author});
    }

    @observable id;
    @observable authorId;
    @observable title = '';
    @observable tags = [];
    @observable content = {};
    @observable publishDate;
    @observable lastUpdateDate = formDate2YMDHMS(new Date());
    @observable hasPublished = false; // publish tag
    @observable deleteDhecked = false; // delete tag
    @observable hasSavedOnline = false; // save tag
    @observable hasOpened = false; // judge open on local editor
    @observable author = {};

    // @action('setArticle')
    set({id, title, tags, content, publishDate, lastUpdateDate, hasPublished, hasSavedOnline, hasOpened, author}) {
        if (id) this.id = id;
        if (title) this.title = title;
        if (tags) this.tags = tags;
        if (content) this.content = content;
        if (publishDate) this.publishDate = publishDate;
        if (lastUpdateDate) this.lastUpdateDate = lastUpdateDate;
        if (hasPublished) this.hasPublished = hasPublished;
        if (hasSavedOnline) this.hasSavedOnline = hasSavedOnline;
        if (hasOpened) this.hasOpened = hasOpened;
        if (author) this.author = author;
    }
}

export {Article};