/**
 * Author: Ruo
 * Create: 2018-02-10
 * Description: write mode
 */
/* global require */

import _ from 'lodash';
import React from 'react';
import uniqid from 'uniqid';
import {withStyles} from 'material-ui/styles';
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
import IconButton from 'material-ui/IconButton';
// import Visibility from 'material-ui-icons/Visibility';
// import VisibilityOff from 'material-ui-icons/VisibilityOff';
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader} from 'material-ui/List';
import Button from 'material-ui/Button';
import GridList, {GridListTile, GridListTileBar} from 'material-ui/GridList';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
// import CloseIcon from 'material-ui-icons/Close';
import Chip from 'material-ui/Chip';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import Menu, {MenuItem} from 'material-ui/Menu';
import Checkbox from 'material-ui/Checkbox';

import 'DFStyles/sass';

@inject('UserStore', 'BlogStore', 'EditorStore')
@observer
class WriteMobView extends React.Component {
    constructor(props) {
        super(props);
        this.UserStore = GBS.stores.UserStore;

        this.onTitleChange = ::this.onTitleChange;

        this.onTagInputKeyUp = ::this.onTagInputKeyUp;
        this.onTagInputChange = ::this.onTagInputChange;

        this.onAddTag = ::this.onAddTag;
        this.onCreateDeleteTagEvent = ::this.onCreateDeleteTagEvent;

        this.onDraftMenuClick = ::this.onDraftMenuClick;
        this.onCloseDraftMenu = ::this.onCloseDraftMenu;
        this.onToggleDraftDeleteMode = ::this.onToggleDraftDeleteMode;

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

    @observable draftListEl = null; // 用于显示草稿箱菜单的定位原色
    @observable draftDeleteModeState = false; // 是否处在草稿删除模式

    @action
    init() {
        this.title = this.props.EditorStore.getLocalTitle() || '';
        this.tagsArray = this.props.EditorStore.getLocalTags() || [];
    }

    onTitleChange(e) {
        if (e.target && e.target.value !== undefined) {
            this.title = e.target.value;
        }
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

    onDraftMenuClick(e) {
        if (e.currentTarget) {
            this.draftListEl = e.currentTarget;
        }
    }

    onCloseDraftMenu() {
        this.draftListEl = null;
    }

    onToggleDraftDeleteMode() {
        this.draftDeleteModeState = !this.draftDeleteModeState;
        this.onCloseDraftMenu();
    }

    render() {
        // TODO tags换行
        const {show, onClose, classes} = this.props;
        return (
            <Dialog open={show} onClose={onClose} fullScreen>
                <AppBar style={{position: 'relative'}} className={classes.appBar}>
                    <Toolbar>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography variant="title" color="inherit" style={{flex: 1}}>
                                    Write Article
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
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
                                        <Button variant="raised" color="secondary" onClick={onClose}>
                                            Close
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.root}>
                    <Drawer
                        anchor="left"
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.draftList}>
                            <div className={classes.draftListHeader}>
                                <ListSubheader className={classes.draftListHeaderText}>
                                    Draft list
                                </ListSubheader>
                                <IconButton>
                                    <MenuIcon onClick={this.onDraftMenuClick}/>
                                    <Menu
                                        anchorEl={this.draftListEl}
                                        open={Boolean(this.draftListEl)}
                                        onClose={this.onCloseDraftMenu}
                                    >
                                        <MenuItem>
                                            New Draft
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={this.onToggleDraftDeleteMode}>
                                            Delete Draft
                                        </MenuItem>
                                    </Menu>
                                </IconButton>
                            </div>
                            <List className={classes.draftItemList}>
                                <ListItem button>
                                    {this.draftDeleteModeState && <Checkbox
                                        tabIndex={-1}
                                        disableRipple
                                    />}
                                    <ListItemText primary="aaa" secondary="aaa" className={classes.draftListItemText}/>
                                </ListItem>
                                <Divider/>
                                <ListItem button sytle={{width: 300}}>
                                    {this.draftDeleteModeState && <Checkbox
                                        tabIndex={-1}
                                        disableRipple
                                    />}
                                    <ListItemText primary="bbb" secondary="bbb" className={classes.draftListItemText}/>
                                </ListItem>
                                <Divider/>
                                <ListItem button sytle={{width: 300}}>
                                    {this.draftDeleteModeState && <Checkbox
                                        tabIndex={-1}
                                        disableRipple
                                    />}
                                    <ListItemText primary="bbb" secondary="bbb" className={classes.draftListItemText}/>
                                </ListItem>
                                <Divider/>
                                <ListItem button sytle={{width: 300}}>
                                    {this.draftDeleteModeState && <Checkbox
                                        tabIndex={-1}
                                        disableRipple
                                    />}
                                    <ListItemText primary="bbb" secondary="bbb" className={classes.draftListItemText}/>
                                </ListItem>
                                <Divider/>
                                <ListItem button sytle={{width: 300}}>
                                    {this.draftDeleteModeState && <Checkbox
                                        tabIndex={-1}
                                        disableRipple
                                    />}
                                    <ListItemText primary="bbb" secondary="bbb" className={classes.draftListItemText}/>
                                </ListItem>
                                <Divider/>
                                <ListItem button sytle={{width: 300}}>
                                    {this.draftDeleteModeState && <Checkbox
                                        tabIndex={-1}
                                        disableRipple
                                    />}
                                    <ListItemText primary="bbb" secondary="bbb" className={classes.draftListItemText}/>
                                </ListItem>
                            </List>
                            {this.draftDeleteModeState && <Button
                                variant="raised"
                                color="secondary"
                                className={classes.draftDeleteBtn}
                            >Delete 2 items</Button>}
                        </div>
                    </Drawer>
                    <Grid container direction="column" style={{marginTop: 10}} className={classes.content}>
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
                                            placeholder="Enter your tags and press Enter"
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
            </Dialog>
        );
    }
};
const drawerWidth = 240;
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        padding: 0,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        minWidth: drawerWidth,
        height: '100%',
    },
    draftList: {
        display: 'flex',
        flexDirection: 'column',
    },
    draftListHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 0,
        flexShrink: 0,
    },
    draftListHeaderText: {
        flexGrow: 1,
    },
    draftItemList: {
        // position: 'absolute',
        // top: 48,
        // right: 0,
        // bottom: 36,
        // left: 0,
        flexGrow: 1,
        overflow: 'auto',
        height: '100%',
        paddingBottom: 0,
    },
    draftListItemText: {
        padding: '2px 16px',
    },
    draftDeleteBtn: {
        // position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    content: {
        flexGrow: 1,
        display: 'block',
        overflow: 'auto',
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: theme.mixins.toolbar,
});
const WriteMob = withStyles(styles)(WriteMobView);
export {WriteMob};
