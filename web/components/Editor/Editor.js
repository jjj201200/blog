/**
 * Author: Ruo
 * Create: 2018-02-13
 * Description: A editor of draft.js
 */

import React from 'react';
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
        // this.onContentStateChange = ::this.onContentStateChange;
        this.initEditorState = ::this.initEditorState;

        this.initEditorState();
        autorun(() => {
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

                props.EditorStore.saveLocalContentState(contentState);
            }
        });
    }

    @action
    initEditorState() {
        const localContentStateString = this.props.EditorStore.getLocalContentState();
        if (localContentStateString) { // 获取content
            let localContentStateObject;
            /**
             * 判断是否是被观察对象，因为获取自store
             * 而store是被观察的，所以其子对象也是被观察的
             * 不是可观察对象，就是刚刚生成的原始对象，可以直接用
             */
            if (isObservable(localContentStateString)) {
                localContentStateObject = toJS(localContentStateString);
            }

            // localContentStateObject = convertFromRaw(localContentStateObject);
            // console.log(localContentStateObject);
            if (localContentStateObject instanceof ContentState) {
                this.editorState = EditorState.createWithContent(localContentStateObject);
            } else {
                this.editorState = EditorState.createWithContent(convertFromRaw(localContentStateObject));
            }

            // this.contentState = this.editorState.getCurrentContent();
            // this.editorState = EditorState.createWithContent(this.contentState);
            // this.contentState = this.editorState.getCurrentContent();
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
    saveBlog() {

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