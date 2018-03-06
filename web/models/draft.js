/**
 * Author: Ruo
 * Create: 2018-03-05
 * Description:
 */

import {observable, action} from 'mobx';

class Draft {
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
    @observable title = null;
    @observable tags = null;
    @observable content = null;
    @observable createDate = (new Date()).getTime();
    @observable saveDate = null;
    @observable publishDate = null;

    @action('setUser')
    set({title, tags, content}) {
        this.title = title;
        this.tags = tags;
        this.content = content;
        this.saveDate = (new Date()).getTime();
    }
}

export {Draft};