/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

module.exports = app => {
    const {Controller, mongoose} = app;
    return class BLogController extends Controller {
        // blog的操作类型
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
            console.log(ctx.request.body);
            try {
                if (jwToken) {
                    ctx.validate(createRule);
                    service.jwt.verify(jwToken); // 因为没有需要用到的数据，就不用获取值了
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
                console.log(new Error(e));
            }
        }

        /**
         * 这里这样做，是给以后做扩展的时候留有空间
         * @returns {Promise.<Promise|string|Draft.Model.ImmutableData.CharacterMetadata|T|Promise<T[]>|Object|*>}
         */
        async create() {
            return this.ctx.service.blog.create();
        }

        async get() {
            return this.ctx.service.blog.get();
        }

        async getList() {
            return this.ctx.service.blog.getList();
        }

        async update() {
            return this.ctx.service.blog.update();
        }

        async delete() {
            return this.ctx.service.blog.delete();
        }
    };
};