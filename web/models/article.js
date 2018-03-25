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

    // local params
    @observable hasPublished = false; // publish tag
    @observable deleteChecked = false; // delete tag
    @observable hasSavedOnline = false; // save tag
    @observable hasOpened = false; // judge open on local editor
    @observable author = {};

    set({id, title, tags, content, publishDate, lastUpdateDate, hasPublished, hasSavedOnline, hasOpened, author}) {
        if (id !== undefined) this.id = id;
        if (title !== undefined) this.title = title;
        if (tags !== undefined) this.tags = tags;
        if (content !== undefined) this.content = content;
        if (publishDate !== undefined) this.publishDate = publishDate;
        if (lastUpdateDate !== undefined) this.lastUpdateDate = lastUpdateDate;
        if (hasPublished !== undefined) this.hasPublished = hasPublished;
        if (hasSavedOnline !== undefined) this.hasSavedOnline = hasSavedOnline;
        if (hasOpened !== undefined) this.hasOpened = hasOpened;
        if (author !== undefined) this.author = author;
    }
}

export {Article};