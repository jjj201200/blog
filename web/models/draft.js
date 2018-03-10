/**
 * Author: Ruo
 * Create: 2018-03-05
 * Description:
 */

import {observable, action} from 'mobx';
import {now} from 'DFUtils';

class Draft {
    //TODO 改名为Article
    /**
     * 文章对象
     * @param title
     * @param tags
     * @param content
     */
    constructor({
        title = null,
        tags = [],
        content = null
    } = {
        title: null,
        tags: [],
        content: null
    }) {
        this.set({title, tags, content});
    }

    @observable id = null;
    @observable title = '';
    @observable tags = [];
    @observable content = {};
    @observable createDate = now();
    @observable saveDate = now();
    // 代表了是否已经被发布，以及发布的日期时间
    @observable publishDate = null;

    @action('setDraft')
    set({title, tags, content}) {
        this.title = title || '';
        this.tags = tags || [];
        this.content = content || {};
        this.saveDate = now();
    }
}

export {Draft};