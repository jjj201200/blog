/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

import {observable, action, toJS} from 'mobx';
import {Ajax, inClient} from 'DFUtils';
import {BasicStore, localStorage} from './BasicStore';
import {EditorState, convertFromRaw} from 'draft-js';

class EditorStore extends BasicStore {
    constructor(rootStore) {
        super('EditorStore', rootStore, [localStorage]);
        this.load();
        // this.init();
    }

    @action('initContentStore')
    init() {
        // let localEditorState = this.getLocalEditorState();
        // if (localEditorState) {
        //     this.updateEditorState(localEditorState);
        // } else {
            // this.updateEditorState(EditorState.createEmpty());
        // }
    }

    initEditorState(editorState) {

    }



    @action
    getLocalContentState() {
        return toJS(this.store.get('localContentState'));
    }

    @action
    getContent() {

    }

    @action
    getBlogList() {

    }

    @action
    saveLocalContentState(editorState) {
        this.store.set('localContentState', editorState);
    }

    /*@action
    deleteLocalContentState() {
        this.store.delete('localContentState');
    }*/

    @action
    saveLocalTitle(title) {
        this.store.set('localTitle', title);
    }

    @action
    getLocalTitle() {
        return toJS(this.store.get('localTitle'));
    }

    @action
    saveLocalTags(tags) {
        this.store.set('localTags', tags);
    }

    @action
    getLocalTags() {
        return toJS(this.store.get('localTags'));
    }
}
export default EditorStore;
