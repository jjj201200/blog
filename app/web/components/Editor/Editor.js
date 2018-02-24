/**
 * Author: Ruo
 * Create: 2018-02-13
 * Description: A editor of draft.js
 */

import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';

export class DFEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }
        this.onChange = ::this.onChange;
    }
    onChange(editorState) {
        this.setState({editorState});
    }
    render() {
        const {editorState} = this.state;
        return <Editor editorState={editorState} onChange={this.onChange}/>;
    }
}