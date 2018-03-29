/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description:
 */
const _ = require('lodash');

module.exports = app => {
    return class LivingRoomController extends app.Controller {
        async index() {
            const {socket, args} = this.ctx;
            try {
                const requestBody = args[0];
                if (requestBody.method) {
                    if (this[requestBody.method]) {
                        this[requestBody.method](requestBody);
                    } else throw new Error('none method: ' + requestBody.method);
                } else throw new Error('need param: method');
            } catch (e) {
                socket.emit({
                    code: -1,
                    msg: e.msg,
                });
            }
        }

        /**
         * 返回大厅玩家列表
         */
        getPlayerList(requestBody) {
            const {socket, app} = this.ctx;
            const {data} = requestBody;
            // console.log(socket.session);
            // console.log(socket.id, socket.rooms, app.io.sockets.adapter.rooms);
            app.io.emit('playerList', app.players);
        }

        sendBattlePost(requestBody) {
            const {socket, app} = this.ctx;
            const {data} = requestBody;
            console.log(data);
            socket.to(app.players[data.targetId].sid).emit('getBattlePost', {
                postId: data.postId,
                posterName: data.posterName,
            });
        }
    }
}