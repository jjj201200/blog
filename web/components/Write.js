/**
 * Author: Ruo
 * Create: 2018-02-10
 * Description: write mode
 */
/* global require */

import $ from 'jquery';
import React from 'react';
import {action} from 'mobx';
import {observer, inject} from 'mobx-react';
import styled from 'styled-components';
import {theme, rem} from 'DFStyles';
import {Form, Label, LabelName, Submit} from 'DFUIs';
import {Mob} from 'DFComponents';
import GBS from 'DFStores';
import {DFEditor} from 'DFComponents';
// import LzEditor from 'react-lz-editor';
import Dialog, {DialogTitle, DialogContent, DialogContentText} from 'material-ui/Dialog';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';

@inject('UserStore')
@observer
class WriteMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.handleSubmit = ::this.handleSubmit;
        this.receiveMarkdown = ::this.receiveMarkdown;
    }
    componentWillMount() {
    }

    @action handleSubmit(e) {
        e.preventDefault();
    }
    receiveMarkdown(content) {
        console.log("recieved markdown content", content);
    }

    render() {
        const {show, onClose} = this.props;
        return (
            <Dialog open={show} onClose={onClose} fullWidth>
                <DialogTitle>Write Article</DialogTitle>
                <DialogContent>
                    <Form className="sign-up">
                        <DFEditor/>
                        {/*<Submit onClick={this.handleSubmit}>GO</Submit>*/}
                    </Form>
                </DialogContent>
            </Dialog>
        );
    }
};
export {WriteMob};
