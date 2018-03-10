/**
 * Author: Ruo
 * Create: 2018-02-10
 * Description: write mode
 */
/* global require */

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import {withStyles} from 'material-ui/styles';
import {observable, action, toJS, autorun, isObservable} from 'mobx';
import {observer, inject} from 'mobx-react';
// import styled from 'styled-components';
// import {theme, rem} from 'DFStyles';
// import {Form, Label, LabelName, Submit} from 'DFUIs';
// import {Mob} from 'DFComponents';
import GBS from 'DFStores';
// import {DFEditor} from 'DFComponents';
import {formDate2YMDHMS} from 'DFUtils';
// import LzEditor from 'react-lz-editor';
import {EditorState, ContentState, convertFromRaw, convertToRaw} from 'draft-js';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
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

@inject('UserStore', 'EditorStore')
@observer
class WriteMobView extends React.Component {
    /**
     * 文章发布Dialog的逻辑
     * 初始化react组件的可视化
     * 分为两个部分：草稿箱 编辑器（区域）
     * 1.载入Write Article窗口时自动拉取用户的草稿箱数据并显示，此时右侧编辑区域为空，可以选择创建新的草稿或者新建草稿
     * 2.点击草稿箱的列表项目会载入想赢的草稿到后侧，此时右侧编辑区域将显示草稿的内容
     * 3.点击新建草稿则在草稿箱底部生成新的列表项目，同时编辑区域显示，各编辑项目为空
     * @param props
     */
    constructor(props) {
        super(props);
        const {EditorStore} = this.props;
        this.UserStore = GBS.stores.UserStore;

        /**
         * 草稿箱
         */

        /**
         * 编辑区域
         */

        this.onSaveDraft = ::this.onSaveDraft;

        this.onTitleChange = ::this.onTitleChange;
        this.onTagInputKeyUp = ::this.onTagInputKeyUp;
        this.onTagInputChange = ::this.onTagInputChange;

        this.onAddTag = ::this.onAddTag;
        this.onCreateDeleteTagEvent = ::this.onCreateDeleteTagEvent;

        this.onGetArticleList = ::this.onGetArticleList;
        this.onDraftMenuClick = ::this.onDraftMenuClick;
        this.onCloseDraftMenu = ::this.onCloseDraftMenu;
        this.onToggleDraftDeleteMode = ::this.onToggleDraftDeleteMode;

        this.onEditorStateChange = ::this.onEditorStateChange;
        this.saveLocalContent = ::this.saveLocalContent;
        this.initEditorState = ::this.initEditorState;

        // this.init();

        autorun(() => {
            // EditorStore.saveLocalDraft(toJS(this.currentDraft));
            if (this.props.UserStore.hasSignIn === true && this.hasInitialed === false) {
                this.init();
            }
        });
    }
    @observable hasInitialed = false;

    @observable editorState = EditorState.createEmpty();

    @observable articleList = [];

    @observable currentArticle = null;

    @observable tagsInputValue = '';

    @observable draftMenuEl = null; // 用于显示草稿箱菜单的定位原色
    @observable draftDeleteModeState = false; // 是否处在草稿删除模式

    componentWillUpdate() {
        // console.log(this.props.show);
        // if (this.props.show) {
            // this.init();
        // }
        this.onGetArticleList();
    }

    @action
    init() {
        // TODO 最好能够让他在编辑器打开的时候再获取，目前是页面打开就获取
        if (this.props.UserStore.hasSignIn === true) { // 判断是否登录
            console.log(this.props.UserStore.currentUser.username);
            this.initEditorState();
            this.onGetArticleList(this.props.UserStore.currentUser.username);
            this.hasInitialed = true;
        }
    }

    onTitleChange(e) {
        if (e.target && e.target.value !== undefined && e.target.value.length <= 50) {
            this.currentDraft.title = e.target.value;
        }
    }

    @action
    onSaveDraft() {
        const title = toJS(this.title);
        const tags = toJS(this.tagsArray);

        const content = this.props.EditorStore.saveFunc();
        // console.log({title, tags, content});
        this.props.EditorStore.saveDraft({title, tags, content});
        this.onGetArticleList();
    }

    @action
    onGetArticleList(username) {
        this.props.EditorStore.getArticleListByUsername(username).then((res) => {
            console.log(res);
            if (res.code === 0) {
                this.articleList = res.data;
            } else {
                console.error(res);
            }
        });
    }

    onTagInputKeyUp(e) {
        if (e.key === 'Enter' && this.tagsArray.length < 6) {
            const tagName = _.trim(e.target.value);
            if (tagName.length === 0) return;
            this.currentDraft.tags.push(tagName);
        }
    }

    onTagInputChange(e) {
        if (e.target && e.target.value !== undefined && e.target.value.length <= 10) {
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
            this.draftMenuEl = e.currentTarget;
        }
    }

    onCloseDraftMenu() {
        this.draftMenuEl = null;
    }

    onToggleDraftDeleteMode() {
        this.draftDeleteModeState = !this.draftDeleteModeState;
        this.onCloseDraftMenu();
    }

    @action
    initEditorState() {
        const localDraftObject = toJS(this.props.EditorStore.currentDraft);
        console.log(localDraftObject);
        if (localDraftObject.content) { // 获取content
            if (localDraftObject instanceof ContentState) {
                this.editorState = EditorState.createWithContent(localDraftObject.content);
            } else {
                this.editorState = EditorState.createWithContent(convertFromRaw(localDraftObject.content));
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
        // 存储content流程
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

        console.log(this.props.EditorStore);
        this.props.EditorStore.currentDraft.content = contentState;
        return contentState;
    }

    renderEditor() {
        if (this.props.show)
            return (
                <Editor
                    editorState={this.editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    // defaultContentState={this.contentState}
                    onEditorStateChange={this.onEditorStateChange}
                    // onContentStateChange={this.onContentStateChange}
                />
            );
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
                                        <Button variant="raised" color="primary" onClick={this.onSaveDraft}>
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
                        <div className={classes.articleList}>
                            <div className={classes.draftListHeader}>
                                <ListSubheader className={classes.draftListHeaderText}>
                                    Draft list
                                </ListSubheader>
                                <IconButton>
                                    <MenuIcon onClick={this.onDraftMenuClick}/>
                                    <Menu
                                        anchorEl={this.draftMenuEl}
                                        open={Boolean(this.draftMenuEl)}
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
                                {
                                    this.articleList.map((data, index) => {
                                        const time = new Date(data.lastUpdateDate);
                                        const dateTime = formDate2YMDHMS(time);
                                        return [
                                            <ListItem button key={data.id}>
                                                {this.draftDeleteModeState && <Checkbox
                                                    tabIndex={-1}
                                                    disableRipple
                                                />}
                                                <ListItemText
                                                    primary={data.title}
                                                    secondary={dateTime}
                                                    className={classes.draftListItemText}
                                                />
                                            </ListItem>,
                                            ((this.articleList.length - 1 < index) &&
                                                <Divider key={`${data.id}-divider`}/>),
                                        ];
                                    })
                                }
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
                            {this.renderEditor()}
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
    articleList: {
        display: 'flex',
        height: '100%',
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
        paddingTop: 0,
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
