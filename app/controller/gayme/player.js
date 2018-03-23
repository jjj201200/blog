/**
 * Author: Ruo
 * Create: 2018-03-22
 * Description:
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
                    get: { // 获取玩家数据
                        name: 'get',
                        rule: {
                            userId: {type: 'string', required: true},
                        },
                    },
                    // getListByUsername: { // 获取文章列表
                    //     name: 'getListByUsername',
                    //     rule: {
                    //         username: {type: 'string', required: true},
                    //         page: {type: 'number'},
                    //         pageSize: {type: 'number'},
                    //     },
                    // },
                    // getListByPublished: { // 获取文章列表
                    //     name: 'getListByPublished',
                    //     rule: {
                    //         page: {type: 'number'},
                    //         pageSize: {type: 'number'},
                    //     },
                    //     checkJWT: false,
                    // },
                },
                POST: {
                    create: { // 给已登录用户创建玩家数据
                        name: 'create',
                        rule: {
                            nickname: {type: 'string', required: true},
                        },
                    },
                    addCard: { // 给玩家增加卡牌
                        name: 'addCard',
                        rule: {
                            cardId: {type: 'number', required: true},
                            number: {type: 'number', required: true},
                        },
                    },
                    update: { // 更新玩家胜负数据及场数
                        name: 'update',
                        rule: {
                            userId: {type: 'string', required: true},
                            win: {type: 'boolean', required: true},
                        },
                    },
                    // create: { // 创建新文章
                    //     name: 'create',
                    //     rule: {
                    //         title: {type: 'string', required: true},
                    //         tags: {type: 'array', required: true},
                    //         content: {type: 'object', required: true},
                    //     },
                    // },
                    // update: { // 更新文章
                    //     name: 'update',
                    //     rule: {
                    //         articleId: {type: 'string', required: true},
                    //         title: {type: 'string'},
                    //         tags: {type: 'array'},
                    //         content: {type: 'object'},
                    //         username: {type: 'string'},
                    //     },
                    // },
                    // delete: { // 删除文章
                    //     name: 'delete',
                    //     rule: {
                    //         articleIdArray: {type: 'array', required: true},
                    //     },
                    // },
                    // publish: { // 发布文章
                    //     name: 'update',
                    //     rule: {
                    //         articleId: {type: 'string', required: true},
                    //         hasPublished: {type: 'boolean'},
                    //     },
                    // },
                    // unpublish: { // 取消发布文章
                    //     name: 'update',
                    //     rule: {
                    //         articleId: {type: 'string', required: true},
                    //         hasPublished: {type: 'boolean'},
                    //     },
                    // },
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
                        if (checkJWT) { // 因为没有需要用到的数据，就不用获取值了
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
         * method - get
         * 根据用户id返回游戏数据
         */
        async get(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.query, rule); // 校验get请求的参数
                const {userId} = request.query;
                await service.gayme.player.get(userId);
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
         * 给已登录用户创建玩家数据
         */
        async create(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.body, rule);
                const {userId, nickname} = request.body;
                await service.gayme.player.create(
                    userId, nickname,
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

        async addCard(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.body, rule);
                const {userId, cardId} = request.body;
                await service.gayme.player.addCard(userId, cardId);
            } catch (e) {
                // TODO 标准的错误处理
                console.error(e);
                this.ctx.body = {
                    code: -1,
                    message: e.message,
                };
            }
        }

        async removeCard(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.body, rule);
                const {userId, cardId} = request.body;
                await service.gayme.player.removeCard(userId, cardId);
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