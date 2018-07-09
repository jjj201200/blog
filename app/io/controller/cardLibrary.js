/**
 * Author: Ruo
 * Create: 2018-04-02
 * Description:
 */

module.exports = app => {
    return class CardLibraryController {
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
                socket.emit({code: -1, msg: e.msg});
            }
        }
        get() {
            const {socket, args} = this.ctx;
        }
    }
}