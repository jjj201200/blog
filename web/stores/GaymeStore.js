/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description:
 */

import {observable, action, autorun} from 'mobx';
import {Ajax} from 'DFUtils';
import io from 'socket.io-client';
import {BasicStore, memoryStorage} from "./BasicStore";

export class GaymeStore extends BasicStore {
    constructor(rootStore) {
        super('GaymeStore', rootStore, [memoryStorage]);
        this.load();
        const that = this;
        autorun(() => {
            if (!rootStore.stores.UserStore.userInitialed && that.socket && that.socket.connected) {
                that.disconnect();
            }
        })
    }

    socket = null; // 本地socket对象

    roomId = null; // 进入的房间号

    @observable requestSending = false; // 请求状态，如果在请求中，这个状态可用于置灰按钮

    @observable playerList = {}; // 大厅的玩家列表

    init() {
        const that = this;
        this.socket.on('getRoomId', (roomId) => {
            that.roomId = roomId;
            console.log(roomId);
            console.log(`${'roomId'.padEnd(6, ' ')} ${roomId}`)
            that.getPlayerList();
        })

        this.socket.on('getBattlePost', (postId) => {
            console.log(postId);
        })
    }

    getPlayerList() {
        const that = this;
        this.socket.emit('livingRoom', {method: 'getPlayerList'});
        this.socket.on('playerList', (listData) => {
            console.table(listData.sockets);
            that.playerList = listData.sockets;
        })
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
        if (user) { // 已经登录
            this.socket = io('http://0.0.0.0:7001/', {forceNew: false});
            this.socket.on('connect', function (e) {
                console.log(`${'id'.padEnd(6, ' ')} ${that.socket.id}`);
                that.init();
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Connect successfully',
                });
            });
            this.socket.on('res', function (data) {
                console.log(data);
            });
            this.socket.on('roomId', function (data) {
                console.log('roomId', data);
            });
            this.socket.on('reconnect', function (e) {
                console.log('reconnect', e);
                that.init();
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Reconnect successfully',
                });
            });
            this.socket.on('disconnect', function (e) {
                console.log('disconnect', e);
                that.root.stores.GlobalStore.onOpenSnackbar({
                    msg: 'Disconnect successfully',
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
