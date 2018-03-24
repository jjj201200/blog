/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description:
 */

import {observable, action, autorun, toJS} from 'mobx';
import {Ajax} from 'DFUtils';
import io from 'socket.io-client';
import {BasicStore, memoryStorage} from "./BasicStore";

/**
 * Gayme游戏框架的变量仓库
 */
export class GaymeStore extends BasicStore {
    constructor(rootStore) {
        super('GaymeStore', rootStore, [memoryStorage]);
        this.load();
        const that = this;
        const {UserStore} = rootStore.stores;
        autorun(() => {
            // 用户没有登录 且 socket已经连接
            if (!UserStore.userInitialed && that.socket && that.socket.connected) {
                that.disconnect();
            }
        })
    }

    socket = null; // 本地socket对象

    roomId = null; // 进入的房间号

    playerData = null; // 玩家数据

    @observable requestSending = false; // 请求状态，如果在请求中，这个状态可用于置灰按钮

    @observable.shallow playerList = {}; // 大厅的玩家列表

    @observable clickedPlayer = {}; // 被点击的玩家，用来查看玩家的数据

    @observable battlePostDialog = { // 存储挑战相关的数据
        open: false,
        // defaultMessage: '',
        // message: '',
        postId: undefined, // 挑战发起者的userId
    };

    init() {
        const that = this;
        // 获取初始化游戏数据
        this.socket.off('getInitData').on('getInitData', (initData) => {
            console.log(initData);
            that.roomId = initData.roomId;
            console.log(`${'roomId'.padEnd(6, ' ')} ${initData.roomId}`);
            that.getPlayerList(initData.roomId);
            that.playerData = initData.playerData;
        });

        // 收到挑战申请
        this.socket.off('getBattlePost').on('getBattlePost', (postId) => {
            that.setPostDialog(true, postId);
        });

        // 连接超时提示
        let connectTimeoutCounter = 0;
        this.socket.off('connect_timeout').on('connect_timeout', function (e) {
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Connect timeout: ' + (++connectTimeoutCounter) + 'time',
            });
        });

        this.socket.off('reconnect').on('reconnect', function (e) {
            that.init();
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Reconnect successfully',
            });
            connectTimeoutCounter = 0;
        });

        this.socket.off('disconnect').on('disconnect', function (e) {
            that.playerList = {};
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Disconnect successfully',
            });
            connectTimeoutCounter = 0;
        });
    }

    getPlayerList(roomId) {
        const that = this;
        this.socket.emit('livingRoom', {method: 'getPlayerList', data: {roomId}});
        this.socket.off('playerList').on('playerList', (listData) => {
            console.table(listData);
            that.playerList = listData;
        });
    }

    /**
     * 发送挑战请求
     * @param targetId 想要挑战的目标的userId
     */
    sendBattlePost(targetId) {
        this.socket.emit('livingRoom', {
            method: 'sendBattlePost',
            data: {
                targetId,
            },
        });
    }

    // 接受挑战请求
    acceptPost() {

    }

    // 拒绝请求
    denyPost() {

    }


    setPostDialog(open, postId) {
        this.battlePostDialog.open = open;
        this.battlePostDialog.postId = postId;
    }

    @action
    connect(user) {
        const that = this;
        const {UserStore} = this.root.stores;
        if (user) { // 已经登录
            const {id, username} = UserStore.currentUser;
            this.socket = io('http://127.0.0.1:7001/', {
                reconnectionAttempts: 3, // 重连尝试次数
                reconnectionDelay: 5000, // 重连间隔
                forceNew: true,
                query: {
                    userId: id,
                    username: username,
                },
            });
            this.socket.off('connect').on('connect', function (e) {
                // 成功连接时，打印自己的id
                if (!that.socket.id) that.socket.id = that.socket.io.engine.id;
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: `Connect successfully: ${that.socket.id}`,
                });
                // 初始化
                that.init();
            });
        } else { // 没有登录
            this.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'please sign in first',
            });
        }
    }

    disconnect() {
        const that = this;
        if (this.socket) {
            this.socket.disconnect(() => {
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Disconnect successfully',
                });
                that.playerList.clear();
            });
        }
    }

    reconnect() {
        const that = this;
        if (this.socket) this.socket.open(() => {
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Reconnect successfully',
            });
        });
    }
}