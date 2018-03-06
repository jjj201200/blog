/**
 * Author: Ruo
 * Create: 2018-02-13
 * Description: A editor of draft.js
 */

import React from 'react';
import PropTypes from 'prop-types';
import {observable, action, autorun, toJS, isObservable} from 'mobx';
import {inject, observer} from 'mobx-react';
import {EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

@inject('EditorStore')
@observer
export class DFEditor extends React.Component {
    @observable editorState = EditorState.createEmpty();
    // @observable contentState = null;

    constructor(props) {
        super(props);
        this.onEditorStateChange = ::this.onEditorStateChange;
        this.saveLocalContent = ::this.saveLocalContent;
        this.initEditorState = ::this.initEditorState;

        this.initEditorState();
        autorun(() => {
            return;
        });
    }
    componentDidMount() {
        if (this.props.EditorStore) {
            this.props.EditorStore.saveFunc = this.saveLocalContent;
        }
    }

    @action
    initEditorState() {
        const localContentStateObject = this.props.EditorStore.getLocalContentState();
        if (localContentStateObject) { // 获取content
            if (localContentStateObject instanceof ContentState) {
                this.editorState = EditorState.createWithContent(localContentStateObject);
            } else {
                this.editorState = EditorState.createWithContent(convertFromRaw(localContentStateObject));
            }
        } else {
            this.editorState = EditorState.createEmpty();
        }
    }

    @action('editorStateChange')
    onEditorStateChange(editorState) {
        this.editorState = editorState;
    }

    // @action('contentStateChange')
    // onContentStateChange(contentState) {
    //     this.contentState = contentState;
    // }

    @action
    saveLocalContent() {
        if (this.editorState) { // 存储content流程
            let contentState;
            /**
             * 判断是否是被观察对象，因为获取自store
             * 而store是被观察的，所以其子对象也是被观察的
             * 不是可观察对象，就是刚刚生成的原始对象，可以直接用
             */
            if (isObservable(this.editorState)) {
                contentState = toJS(this.editorState);
            }

            if (this.editorState instanceof EditorState) { // 判断是否为原始对象EditorState，是的话直接用于生成上下文状态对象
                contentState = convertToRaw(this.editorState.getCurrentContent());
            }

            this.props.EditorStore.saveLocalContentState(contentState);
            return contentState;
        }
    }

    render() {
        return (
            <Editor
                editorState={this.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                // defaultContentState={this.contentState}
                onEditorStateChange={this.onEditorStateChange}
                onContentStateChange={this.onContentStateChange}
            />
        );
    }
}
DFEditor.contextTypes = {
    getEditorSaveFunc: PropTypes.func
};