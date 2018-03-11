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
import {observable, action, toJS, autorun, isObservable, computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Article} from 'DFModels';
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
import List, {ListItem, ListItemIcon, ListItemText, ListSubheader, ListItemSecondaryAction} from 'material-ui/List';
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
import ContentClear from 'material-ui-icons/Clear';
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

        this.onEntered = ::this.onEntered;

        this.createNewArticle = ::this.createNewArticle;
        this.onSaveArticleOnline = ::this.onSaveArticleOnline;

        this.onTitleChange = ::this.onTitleChange;
        this.onTagInputKeyUp = ::this.onTagInputKeyUp;
        this.onTagInputChange = ::this.onTagInputChange;

        this.onAddTag = ::this.onAddTag;
        this.onCreateDeleteTagEvent = ::this.onCreateDeleteTagEvent;
        this.onCreateCheckBoxChangeEvent = ::this.onCreateCheckBoxChangeEvent;

        this.onArticleMenuClick = ::this.onArticleMenuClick;
        this.onCloseArticleMenu = ::this.onCloseArticleMenu;
        this.onToggleArticleDeleteMode = ::this.onToggleArticleDeleteMode;
        this.onDeleteArticles = ::this.onDeleteArticles;
        this.onCreateDeleteArticleEvent = ::this.onCreateDeleteArticleEvent;

        this.onEditorStateChange = ::this.onEditorStateChange;
        this.saveLocalContent = ::this.saveLocalContent;
        this.initEditorState = ::this.initEditorState;

        // this.init();

        autorun(() => {
            // EditorStore.saveLocalArticle(toJS(this.currentArticle));
            // 窗口被显示 且 用户已登录
            // console.log(props.show, props.UserStore.hasSignIn, this.hasInitialed);
            // if (props.show && props.UserStore.hasSignIn && !this.hasInitialed) {
            //     this.init();
            // } else if (!props.show) { // 关闭窗口
            //     this.hasInitialed = false;
            // }
        });
    }

    @observable hasInitialed = false;

    @observable editorState = null; // 编辑器状态对象

    @observable currentArticle = null; // 当前编辑器载入文章对象

    @observable tagsInputValue = ''; // 编辑器tags编辑框值

    @observable articleMenuEl = null; // 用于显示草稿箱菜单的定位对象
    @observable deleteModeState = false; // 是否处在草稿删除模式

    /**
     * 当打开编辑器Dialog时
     * 对编辑器环境进行初始化
     */
    @action
    onEntered() {
        this.initArticleList();
    }

    /**
     * 初始化文章列表
     * 包含本地缓存文章
     */
    @action
    initArticleList() {
        if (this.props.UserStore.hasSignIn === true) { // 判断是否登录
            // 拉取远程文章列表并初始化本地列表
            const username = this.props.UserStore.currentUser.username;
            this.props.EditorStore.initArticleListByUsername(username);
            // 获取本地文章缓存数据
            this.props.EditorStore.initLocalArticle();
            this.hasInitialed = true;
        }
    }

    /**
     * 标题编辑框事件
     */
    onTitleChange(e) {
        if (e.target && e.target.value !== undefined && e.target.value.length <= 50) {
            this.props.EditorStore.article.title = e.target.value;
        }
    }

    @action
    onSaveArticleOnline() {
        const {EditorStore} = this.props;
        const article = toJS(EditorStore.article); // 获取需要保存的文章数据
        // const content = this.props.EditorStore.saveFunc();
        // console.log({title, tags, content});
        /**
         * 判断是否是新建的文章
         * 是否有id 没有就是新建的
         */
        if (article.id) {
            EditorStore.updateArticle(article.id, article.title, article.tags, article.content);
        } else {
            EditorStore.createArticle(article.title, article.tags, article.content);
        }
    }

    /**
     * tag输入框回车键添加事件
     */
    onTagInputKeyUp(e) {
        const {EditorStore} = this.props;
        if (e.key === 'Enter' && EditorStore.article.tags.length < 6) {
            const tagName = _.trim(e.target.value);
            if (tagName.length === 0) return;
            EditorStore.article.tags.push(tagName);
        }
    }

    /**
     * tag输入框事件
     */
    onTagInputChange(e) {
        if (e.target && e.target.value !== undefined && e.target.value.length <= 10) {
            this.tagsInputValue = e.target.value;
        }
    }

    /**
     * tag添加事件
     * @param {string} tagStr
     */
    onAddTag(tagStr) {
        const tags = toJS(this.props.EditorStore.article).tags;
        tags.push(tagStr);
        this.props.EditorStore.article.set({tags});
    }

    /**
     * tags删除事件
     * @param {string} tagName 需要删除的tag
     */
    onCreateDeleteTagEvent(tagName) {
        const that = this;
        const tagsArray = toJS(this.props.EditorStore.article).tags;
        return function () {
            if (tagsArray.length === 0) return;
            const index = tagsArray.findIndex(value => value === tagName);
            if (index >= 0) {
                tagsArray.splice(index, 1);
                that.props.EditorStore.article.set({tags: tagsArray});
            }
        };
    }

    /**
     * 创建新文章
     */
    createNewArticle() {
        this.props.EditorStore.createLocalArticle();
    }

    /**
     * 文章列表菜单点击事件
     */
    onArticleMenuClick(e) {
        if (e.currentTarget) {
            this.articleMenuEl = e.currentTarget;
        }
    }

    /**
     * 删除多篇文章
     */
    onDeleteArticles() {
        const {EditorStore} = this.props;
        if (EditorStore.deleteArticleList.peek().length > 0) {
            EditorStore.deleteArticle(EditorStore.deleteArticleList);
        }
    }

    onCreateDeleteArticleEvent(articleId) {
        const that = this;
        return function () {
            const {EditorStore} = that.props;
            if (articleId && articleId.length > 20) {
                EditorStore.deleteArticleList.push(articleId);
                that.onDeleteArticles();
            } else {
                EditorStore.articleList.delete(articleId);
                EditorStore.article = null;
            }
        };

    }

    /**
     * 创建事件
     * 关于文章列表删除状态改变的事件
     * @param articleId
     * @returns {Function}
     */
    onCreateCheckBoxChangeEvent(articleId) {
        const that = this;
        return function () {
            if (!that.deleteModeState) return;
            const {EditorStore} = that.props;
            if (EditorStore.articleList.has(articleId)) {
                const article = EditorStore.articleList.get(articleId);
                console.log(article.id);
                if (article.checked !== undefined) {
                    article.checked = !article.checked;
                } else {
                    article.checked = true;
                }
                if (article.checked) {
                    EditorStore.deleteArticleList.push(article.id); // 加入删除列表
                } else {
                    EditorStore.deleteArticleList.remove(article.id);
                }
            }
            // console.log(EditorStore.articleList);
        };
    }

    /**
     * 关闭文章列表菜单的事件
     */
    onCloseArticleMenu() {
        this.articleMenuEl = null;
    }

    /**
     * 切换文章列表删除模式的事件
     */
    onToggleArticleDeleteMode() {
        this.deleteModeState = !this.deleteModeState;
        this.onCloseArticleMenu();
    }

    @action
    initEditorState() {
        const localArticleObject = toJS(this.props.EditorStore.currentArticle);
        console.log(localArticleObject);
        if (localArticleObject.content) { // 获取content
            if (localArticleObject instanceof ContentState) {
                this.editorState = EditorState.createWithContent(localArticleObject.content);
            } else {
                this.editorState = EditorState.createWithContent(convertFromRaw(localArticleObject.content));
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
        this.props.EditorStore.currentArticle.content = contentState;
        return contentState;
    }

    renderEditor() {
        const {classes, show, EditorStore} = this.props;
        if (show && EditorStore.article) {
            const {title, tags, content} = toJS(EditorStore.article);
            return (
                <Grid container direction="column" className={classes.content}>
                    <Grid item xs={12}>
                        <Typography variant="display1">
                            Title
                        </Typography>
                        <FormControl fullWidth>
                            {/*<InputLabel htmlFor="write-page-title">Title</InputLabel>*/}
                            <Input
                                id="write-page-title"
                                name="write-page-title"
                                value={title}
                                placeholder="Enter your Title"
                                onChange={this.onTitleChange}
                                // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container alignItems="flex-end">
                            <Grid item style={{paddingRight: 0}}>
                                <Grid container spacing={8} wrap="wrap">
                                    {
                                        tags && tags.map((tagName) => {
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
                    <Grid item xs={12}>
                        <Editor
                            editorState={this.editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            // defaultContentState={this.contentState}
                            onEditorStateChange={this.onEditorStateChange}
                            // onContentStateChange={this.onContentStateChange}
                        />
                    </Grid>
                </Grid>
            );
        } else {
            return (
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.content}
                >
                    <Grid item className={classes.emptyPage}>
                        <Typography variant="headline" className={classes.emptyPageHeader}>
                            在左侧列表选择需要编辑的文章或者新建一个
                        </Typography>
                        <Button
                            variant="raised"
                            color="primary"
                            className={classes.emptyPageButton}
                            onClick={this.createNewArticle}
                        >
                            添加新文章
                        </Button>
                    </Grid>
                </Grid>
            );
        }
    }

    render() {
        // TODO tags换行
        const {show, onClose, classes, EditorStore} = this.props;
        const articleObject = toJS(EditorStore.articleList);
        // console.log(articleObject, EditorStore.articleList);
        const deleteNum = EditorStore.deleteArticleList.peek().length;
        return (
            <Dialog open={show} onClose={onClose} fullScreen onEntered={this.onEntered}>
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
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            onClick={onClose}
                                            disabled={!EditorStore.article}
                                        >
                                            Publish Article
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            onClick={this.onSaveArticleOnline}
                                            disabled={!EditorStore.article}
                                        >
                                            Save Article
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
                            <div className={classes.articleListHeader}>
                                <ListSubheader className={classes.articleListHeaderText}>
                                    Article list
                                </ListSubheader>
                                <IconButton>
                                    <MenuIcon onClick={this.onArticleMenuClick}/>
                                    <Menu
                                        anchorEl={this.articleMenuEl}
                                        open={Boolean(this.articleMenuEl)}
                                        onClose={this.onCloseArticleMenu}
                                    >
                                        <MenuItem>
                                            New Article
                                        </MenuItem>
                                        <Divider/>
                                        <MenuItem onClick={this.onToggleArticleDeleteMode}>
                                            Delete Article
                                        </MenuItem>
                                    </Menu>
                                </IconButton>
                            </div>
                            <List className={classes.articleItemList}>
                                {
                                    _.map(articleObject, (data) => {
                                        const dateTime = data.lastUpdateDate;
                                        return [
                                            <ListItem
                                                button
                                                key={data.id || data.tempId}
                                                onClick={this.onCreateCheckBoxChangeEvent(data.id || data.tempId)}
                                                className='article-list-item'
                                            >
                                                {this.deleteModeState && <Checkbox
                                                    tabIndex={-1}
                                                    disableRipple
                                                    // onChange={this.onCreateCheckBoxChangeEvent(data.id)}
                                                    checked={data.checked}
                                                />}
                                                <ListItemText
                                                    primary={data.title}
                                                    secondary={dateTime}
                                                    className={classes.articleListItemText}
                                                />
                                                {!this.deleteModeState && (
                                                    <ListItemSecondaryAction className='article-list-delete-btn'>
                                                        <IconButton
                                                            onClick={this.onCreateDeleteArticleEvent(data.id || data.tempId)}
                                                        >
                                                            <ContentClear/>
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                )}
                                            </ListItem>,
                                            <Divider key={`${data.id || data.tempId}-divider`}/>,
                                        ];
                                    })
                                }
                            </List>
                            {this.deleteModeState && <Button
                                variant="raised"
                                color="secondary"
                                className={classes.articleDeleteBtn}
                                onClick={this.onDeleteArticles}
                            >Delete {deleteNum} items</Button>}
                        </div>
                    </Drawer>
                    {this.renderEditor()}
                </DialogContent>
            </Dialog>
        );
    }
};

const drawerWidth = 320;
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
    articleListHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 0,
        flexShrink: 0,
    },
    articleListHeaderText: {
        flexGrow: 1,
    },
    articleItemList: {
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
    articleListItemText: {
        padding: '2px 16px',
    },
    articleDeleteBtn: {
        // position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    content: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    emptyPage: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyPageHeader: {
        padding: '20px 0',
    },
    emptyPageButton: {
        width: 200,
    },
    toolbar: theme.mixins.toolbar,
});
const WriteMob = withStyles(styles)(WriteMobView);
export {WriteMob};
