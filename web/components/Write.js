/**
 * Author: Ruo
 * Create: 2018-02-10
 * Description: write mode
 */
/* global require */

import _ from 'lodash';
import React from 'react';
import uniqid from 'uniqid';
import {observable, action, toJS, autorun, isObservable} from 'mobx';
import {observer, inject} from 'mobx-react';
// import styled from 'styled-components';
// import {theme, rem} from 'DFStyles';
// import {Form, Label, LabelName, Submit} from 'DFUIs';
// import {Mob} from 'DFComponents';
import GBS from 'DFStores';
import {DFEditor} from 'DFComponents';
// import LzEditor from 'react-lz-editor';
import Dialog, {DialogTitle, DialogContent, DialogContentText} from 'material-ui/Dialog';
import Input, {InputLabel, InputAdornment} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';
// import IconButton from 'material-ui/IconButton';
// import Visibility from 'material-ui-icons/Visibility';
// import VisibilityOff from 'material-ui-icons/VisibilityOff';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Button from 'material-ui/Button';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
// import CloseIcon from 'material-ui-icons/Close';
import Chip from 'material-ui/Chip';
import Drawer from 'material-ui/Drawer';

import 'DFStyles/sass';

@inject('UserStore', 'BlogStore', 'EditorStore')
@observer
class WriteMob extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;
        this.receiveMarkdown = ::this.receiveMarkdown;

        this.onTitleChange = ::this.onTitleChange;

        this.onTagInputKeyUp = ::this.onTagInputKeyUp;
        this.onTagInputChange = ::this.onTagInputChange;

        this.onAddTag = ::this.onAddTag;
        this.onCreateDeleteTagEvent = ::this.onCreateDeleteTagEvent;

        this.onToggleDrawer = ::this.onToggleDrawer;

        this.init();
        autorun(() => {
            let title, tagsArray;
            if (isObservable(this.title)) {
                title = toJS(this.title);
            } else {
                title = this.title;
            }
            if (isObservable(this.tagsArray)) {
                tagsArray = toJS(this.tagsArray);
            } else {
                tagsArray = this.tagsArray;
            }
            this.props.EditorStore.saveLocalTitle(title);
            this.props.EditorStore.saveLocalTags(tagsArray);
        });
    }

    @observable title = '';
    @observable tagsArray = [];
    @observable tagsInputValue = '';
    @observable drawerOpenState = false;

    @action
    init() {
        this.title = this.props.EditorStore.getLocalTitle() || '';
        this.tagsArray = this.props.EditorStore.getLocalTags() || [];
    }

    @action
    onTitleChange(e) {
        if (e.target && e.target.value !== undefined) {
            this.title = e.target.value;
        }
    }

    receiveMarkdown(content) {
        console.log('recieved markdown content', content);
    }

    @action
    onSaveDraft(content) {
        this.props.BlogStore.saveDraft();
    }

    onTagInputKeyUp(e) {
        if (e.key === 'Enter') {
            const tagName = _.trim(e.target.value);
            if (tagName.length === 0) return;
            this.tagsArray.push(tagName);
        }
    }

    onTagInputChange(e) {
        if (e.target && e.target.value !== undefined) {
            this.tagsInputValue = e.target.value;
        }
    }

    onAddTag(tagStr) {
        this.tagsArray.push(tagStr);
    }

    onToggleDrawer() {
        this.drawerOpenState = !this.drawerOpenState;
    }
    // @action
    onCreateDeleteTagEvent(tagName) {
        const that = this;
        return function () {
            const tagsArray = toJS(that.tagsArray);
            if (tagsArray.length === 0) return;
            const index = tagsArray.findIndex(value => value === tagName);
            if (index >= 0) {
                tagsArray.splice(index, 1);
                that.tagsArray = tagsArray;
            }
        };
    }

    render() {
        // TODO tags换行
        const {show, onClose} = this.props;
        return (
            <Dialog open={show} onClose={onClose} fullScreen>
                <AppBar style={{position: 'relative'}}>
                    <Toolbar>
                        <Grid container alignItems="center">
                            <Grid item xs={6}>
                                <Typography variant="title" color="inherit" style={{flex: 1}}>
                                    Write Article
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={16} justify="flex-end">
                                    <Grid item>
                                        <Button variant="raised" color="primary" onClick={onClose}>
                                            Publish Article
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="raised" color="primary" onClick={onClose}>
                                            Save Draft
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="raised" color="primary" onClick={this.onToggleDrawer}>
                                            Draft List
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="raised" color="secondary" onClick={onClose}>
                                            Close
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container direction="column" style={{marginTop: 10}}>
                        <Grid item>
                            <Typography variant="display1">
                                Title
                            </Typography>
                            <FormControl fullWidth>
                                {/*<InputLabel htmlFor="write-page-title">Title</InputLabel>*/}
                                <Input
                                    id="write-page-title"
                                    name="write-page-title"
                                    value={this.title}
                                    placeholder="Enter your Title"
                                    onChange={this.onTitleChange}
                                    // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="flex-end">
                                <Grid item style={{paddingRight: 0}}>
                                    <Grid container spacing={8} wrap="wrap">
                                        {
                                            this.tagsArray && this.tagsArray.map((tagName) => {
                                                const key = uniqid();
                                                const onDelete = this.onCreateDeleteTagEvent(tagName);
                                                return (
                                                    <Grid item key={key} style={{paddingRight: 8}}>
                                                        <Chip
                                                            label={tagName}
                                                            onDelete={onDelete}
                                                        />
                                                    </Grid>
                                                );
                                            })
                                        }
                                    </Grid>
                                </Grid>
                                <Grid item style={{flex: 1, paddingLeft: 0}}>
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="write-page-tags">Tags</InputLabel>
                                        <Input
                                            id="write-page-tags"
                                            name="write-page-tags"
                                            placeholder="Enter your tags and press the Enter key"
                                            value={this.tagsInputValue}
                                            onKeyUp={this.onTagInputKeyUp}
                                            onChange={this.onTagInputChange}
                                            // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <DFEditor/>
                        </Grid>
                    </Grid>
                </DialogContent>
                <Drawer
                    anchor="left"
                    open={this.drawerOpenState}
                    onClose={this.onToggleDrawer}
                >
                    <List>
                        <ListItem button>
                            aaa
                        </ListItem>
                        <ListItem button>
                            bbb
                        </ListItem>
                    </List>
                </Drawer>
            </Dialog>
        );
    }
};
export {WriteMob};
