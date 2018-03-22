/**
 * Author: Ruo
 * Create: 2018-03-21
 * Description:
 */

module.exports = app => {
    class Controller extends app.Controller {
        /**
         * 这里的方法都作为客户端请求的事件名称进行命名
         */

        /**
         * 客户端请求
         * @returns {Promise.<void>}
         */
        async index() {
            const message = this.ctx.args[0];
            console.log(this.ctx.socket.id);
            await this.ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
        }
    }
    return Controller
};
