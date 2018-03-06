/**
 * Author: Ruo
 * Create: 2018-03-04
 * Description:
 */

module.exports = app => {
    const {Controller, mongoose} = app;
    return class DraftController extends Controller {
        // draft的操作类型
        get methodArray() {
            return [
                'create',
                'update',
                'get',
                'getList',
                'delete',
            ];
        };

        /**
         * 这里是对象操作的统一入口，通过传递的操作类型再调用不同方法
         * @returns {Promise.<void>}
         */
        async index() {
            // TODO 最好可以统一入口
            const {ctx} = this;
            const {service, cookies} = ctx;
            const jwToken = cookies.get('jwt');
            const createRule = { // 参数校验规则
                method: {type: 'string', required: true},
            };
            try {
                if (jwToken) { // 初步确认jwt是否存在
                    service.jwt.verify(jwToken); // 校验jwt
                    ctx.validate(createRule);
                    const {method} = ctx.request.body;
                    if (this.methodArray.findIndex((value) => value === method) >= 0) {
                        await this[method]();
                    } else {
                        ctx.body = {code: -1, message: 'empty or invalid method: ' + method};
                    }
                } else {
                    ctx.body = {code: -1, message: 'invalid jwt'};
                }
            } catch (e) {
                ctx.body = {code: -1, message: e.message};
                console.log(new Error(e));
            }
        }

        /**
         * 这里这样做，是给以后做扩展的时候留有空间
         * @returns {Promise.<Promise|string|Draft.Model.ImmutableData.CharacterMetadata|T|Promise<T[]>|Object|*>}
         */
        async create() {
            return this.ctx.service.draft.create();
        }

        async get() {
            return this.ctx.service.draft.get();
        }

        async getList() {
            return this.ctx.service.draft.getList();
        }

        async update() {
            return this.ctx.service.draft.update();
        }

        async delete() {
            return this.ctx.service.draft.delete();
        }
    }
}