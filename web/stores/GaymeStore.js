/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description:
 */

import {observable, action, autorun} from 'mobx';
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
            if (UserStore.userInitialed) { // 是否登录
                if (!that.socket) { // 是否连接过
                    that.connect(UserStore.currentUser);
                } else if (!that.socket.connected) { // 没有连接过就重连
                    that.reconnect();
                }
            }
        })
    }

    socket = null; // 本地socket对象

    roomId = null; // 进入的房间号

    @observable requestSending = false; // 请求状态，如果在请求中，这个状态可用于置灰按钮

    @observable.shallow playerList = {}; // 大厅的玩家列表



    init() {
        const that = this;
        // 获取房间号
        this.socket.on('getInitData', (initData) => { // 获取初始化游戏数据
            that.roomId = initData.roomId;
            console.log(`${'roomId'.padEnd(6, ' ')} ${initData.roomId}`);
            that.getPlayerList(initData.roomId);
        });

        this.socket.on('getBattlePost', (postId) => {
            console.log(postId);
        });

        this.socket.on('disconnect', function (e) {
            console.log('disconnect', e);
            that.root.stores.GlobalStore.onOpenSnackbar({
                msg: 'Disconnect successfully',
            });
        });
    }

    getPlayerList(roomId) {
        const that = this;
        this.socket.emit('livingRoom', {method: 'getPlayerList', data: {roomId}});
        this.socket.on('playerList', (listData) => {
            console.table(listData.sockets);
            that.playerList = listData.sockets;
        });
        this.socket.on('res', function (data) {
            console.log(data);
        });
    }

    sendBattlePost(targetId) {
        this.socket.emit('livingRoom', {
            method: 'sendBattlePost',
            data: {
                targetId,
            },
        });
    }

    @action
    connect(user) {
        const that = this;
        const {UserStore} = this.root.stores;
        if (user) { // 已经登录
            this.socket = io('http://127.0.0.1:7001/', {
                reconnection: true, // 开启重连
                reconnectionAttempts: 10, // 重连尝试次数
                reconnectionDelay: 5000, // 重连间隔
                forceNew: true,
                query: {
                    username: UserStore.currentUser.username,
                },
            });
            this.socket.on('connect', function (e) {
                // 成功连接时，打印自己的id
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Connect successfully',
                });
                console.log(`${'id'.padEnd(6, ' ')} ${that.socket.id}`);
                // 初始化
                that.init();
            });
            this.socket.on('connect_timeout', function (e) {
                console.log('connect timeout', e);
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Connect timeout',
                });
            });
            this.socket.on('reconnect', function (e) {
                console.log('reconnect', e);
                that.init();
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Reconnect successfully',
                });
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