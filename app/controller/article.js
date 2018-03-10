/**
 * Author: Ruo
 * Create: 2018-03-08
 * Description:
 */

module.exports = app => {
    const {Controller} = app;

    class ArticleController extends Controller {
        /**
         * methods是一个校验请求方法的配置对象
         * 包含了允许请求的方法名称和参数校验规则
         * 区分不同类型的request 如GET、POST
         * TODO 添加default
         */
        get methods() {
            return {
                GET: {
                    get: { // 获取文章数据
                        name: 'get',
                        rule: {
                            articleId: {type: 'string', required: true},
                        },
                    },
                    getListByUsername: { // 获取文章列表
                        name: 'getListByUsername',
                        rule: {
                            username: {type: 'string', required: true},
                            page: {type: 'number'},
                            pageSize: {type: 'number'},
                        },
                    },
                },
                POST: {
                    create: { // 创建新文章
                        name: 'create',
                        rule: {
                            title: {type: 'string', required: true},
                            tags: {type: 'array', required: true},
                            content: {type: 'object', required: true},
                        },
                    },
                    update: { // 更新文章
                        name: 'update',
                        rule: {
                            articleId: {type: 'string', required: true},
                            title: {type: 'string'},
                            tags: {type: 'array'},
                            content: {type: 'object'},
                            username: {type: 'string'},
                        },
                    },
                    delete: { // 删除文章
                        name: 'delete',
                        rule: {
                            articleId: {type: 'string', required: true},
                        },
                    },
                    publish: { // 发布文章
                        name: 'update',
                        rule: {
                            articleId: {type: 'string', required: true},
                            hasPublished: {type: 'boolean'},
                        },
                    },
                    unpublish: { // 取消发布文章
                        name: 'update',
                        rule: {
                            articleId: {type: 'string', required: true},
                            hasPublished: {type: 'boolean'},
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
            const {service, cookies, request, validate, helper} = ctx;
            try {
                const jwToken = cookies.get('jwt');
                const createRule = { // 参数校验规则
                    method: {type: 'string', required: true},
                };
                this.isPost = request.method === 'POST';
                if (jwToken) {
                    this.isPost ? validate(createRule) : helper.checkParams(request.query, createRule); // 校验参数
                    if (this.methods[request.method]) { // 校验method类型
                        service.jwt.verify(jwToken); // 因为没有需要用到的数据，就不用获取值了
                        const {method} = this.isPost ? request.body : request.query; // 本次执行的方法参数
                        const execFuncObject = this.methods[request.method][method];
                        if (execFuncObject) {
                            const {name, rule} = execFuncObject;
                            await this[name](rule);
                        } else throw new Error('empty or invalid method: ' + method);
                    } else throw new Error('no request method');
                } else throw new Error('invalid jwt');
            } catch (e) {
                console.error(e);
                ctx.body = {
                    code: -1,
                    message: e.message,
                };
            }
        }

        /**
         * 根据文章id返回文章数据
         */
        async get(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.query, rule); // 校验get请求的参数
                const {articleId} = request.body;
                await service.article.get(articleId);
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
         * 根据用户名返回文章列表
         * 支持分页
         */
        async getListByUsername(rule) {
            const {service, request, helper} = this.ctx;
            try {
                helper.checkParams(request.query, rule); // 校验get请求的参数
                const {username, page, pageSize} = request.body;
                await service.article.getListByUsername(
                    username, page, pageSize,
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
         * 创建一个文章条目
         * username从jwt中获取
         */
        async create(rule) {
            const {service, request, validate} = this.ctx;
            try {
                validate(rule);
                const username = service.jwt.currentJwtData.username;
                if (!username) {
                    throw new Error('invalide username');
                }
                const {title, tags, content} = request.body;
                await service.article.create(
                    username, title, tags, content,
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
         * 更新文章数据
         * 包括发布/取消发布
         */
        async update(rule) {
            const {service, request, validate} = this.ctx;
            try {
                validate(rule);
                const {articleId, ...params} = request.body;
                await service.article.update(articleId, params);
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
            const {service, request, validate} = this.ctx;
            try {
                validate(rule);
                const {articleId} = request.body;
                await service.article.delete(articleId);
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

    return ArticleController;
};