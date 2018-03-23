/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description: 分发房间
 */

module.exports = app => {
    let roomIndex = 0;
    return async (ctx, next) => {
        // 判断有没有空的房间
        const {socket} = ctx;
        const rooms = app.io.sockets.adapter.rooms; // 房间
        const roomsKey = Object.keys(rooms);
        // console.log(roomsKey);
        // if (roomsKey.length) {
        socket.join('room0');
        socket.emit('getRoomId', 'room0');
        // }
        next();
    };
}