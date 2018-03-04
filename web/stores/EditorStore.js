/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

import {observable, action} from 'mobx';
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
        return this.store.get('localContentState');
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

    @action
    deleteLocalContentState() {
        this.store.delete('localContentState');
    }
}
export default EditorStore;
