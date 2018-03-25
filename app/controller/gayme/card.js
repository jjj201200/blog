/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description: gayme card
 */

module.exports = app => {
    const {Controller} = app;

    return class GaymePlayerController extends Controller {
        /**
         * methods是一个校验请求方法的配置对象
         * 包含了允许请求的方法名称和参数校验规则
         * 区分不同类型的request 如GET、POST
         * TODO 添加default，default和required冲突
         */
        get methods() {
            return {
                GET: {
                    // get: { // 获取单张卡牌数据
                    //     name: 'get',
                    //     rule: {
                    //         cardId: {type: 'string', required: true},
                    //     },
                    //     checkJWT: false,
                    // },
                    getList: { // 获取指定类型的卡牌数据列表
                        name: 'getListByUsername',
                        rule: {
                            type: {type: 'number', required: true},
                            page: {type: 'number'},
                            pageSize: {type: 'number'},
                        },
                        checkJWT: false,
                    },
                },
                POST: {
                    create: { // 创建卡牌条目
                        name: 'create',
                        rule: {
                            name: {type: 'string', required: true},
                            type: {type: 'string', required: true},
                            attack: {type: 'number', required: true},
                            defend: {type: 'number', required: true},
                            duration: {type: 'number', required: true},
                        },
                    },
                    update: { // 更新卡牌数据
                        name: 'update',
                        rule: {
                            name: {type: 'string'},
                            type: {type: 'string'},
                            attack: {type: 'number'},
                            defend: {type: 'number'},
                            duration: {type: 'number'},
                        },
                    },
                    remove: { // 更新玩家胜负数据及场数
                        name: 'remove',
                        rule: {
                            cardIdArray: {type: 'array', required: true},
                        },
                    },
                },
            };
        };

        /**
         * 这里是对象操作的统一入口，通过传递的操作类型再调用不同方法
         */
        async index() {
            // TODO 最好可以统一入口
            const {ctx} = this;
            const {service, cookies, request} = ctx;
            try {
                const jwToken = cookies.get('jwt');
                this.isPost = request.method === 'POST';
                const {method} = this.isPost ? request.body : request.query; // 本次执行的方法参数
                if (this.methods[request.method]) { // 校验method类型
                    const execFuncObject = this.methods[request.method][method];
                    if (execFuncObject) {
                        const {name, rule, checkJWT = true} = execFuncObject;
                        if (checkJWT) { // 是否校验jwt，是否需要用到jwt的数据
                            if (jwToken) service.jwt.verify(jwToken);
                            else throw new Error('invalid jwt');
                        }
                        if (this[name] && rule) await this[name](rule);
                    } else throw new Error('empty or invalid method: ' + method);
                } else throw new Error('no request method');
            } catch (e) {
                console.error(e);
                ctx.body = {
                    code: -1,
                    message: e.message,
                };
            }
        }

        /**
         * 返回卡牌列表 - 默认根据type返回
         */
        async getList(rule) {
            const {request, helper} = this.ctx;
            try {
                helper.checkParams(request, rule);
                const {type = 0, page = 1, pageSize = 30} = request.query;
                const conditions = {
                    type,
                };
                await service.gayme.card.getList(
                    conditions, page, pageSize,
                );
            } catch (e) {
                this.ctx = {
                    code: -1,
                    msg: e.msg,
                }
            }
        }

        /**
         * 创建一个文章条目
         * username从jwt中获取
         */
        async create(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.body, rule);
                const {targetType, type, name, attark, defend, duration} = request.body;
                await service.gayme.card.create(
                    targetType, type, name, attark, defend, duration,
                );
            } catch (e) {
                // TODO 标准的错误处理
                console.error(e);
                this.ctx.body = {
                    code: -1,
                    message: e.message,
                };
            }
        }
        /**
         * 更新卡牌数据
         */
        async update(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.body, rule);
                const {cardId, ...params} = request.body;
                await service.gayme.card.update(cardId, params);
            } catch (e) {
                // TODO 标准的错误处理
                console.error(e);
                this.ctx.body = {
                    code: -1,
                    message: e.message,
                };
            }
        }

        async delete(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.body, rule);
                const {cardIdArray} = request.body;
                await service.gayme.card.delete(cardIdArray);
            } catch (e) {
                // TODO 标准的错误处理
                console.error(e);
                this.ctx.body = {
                    code: -1,
                    message: e.message,
                };
            }
        }
    }
}