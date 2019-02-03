/**
 * Author: Ruo
 * Create: 2018-03-08
 * Description:
 */
const _ = require('lodash');
const Service = require('egg').Service;
// const uniqid = require('uniqid');
// 文章对象允许返回的字段
const ArticleReturnKeys = [
    'title',
    'tags',
    'content',
    'username',
    'authorId',
    'publishDate',
    'lastUpdateDate',
    'hasPublished',
];
const ArticleListReturnKeys = [
    'title',
    'tags',
    'username',
    'authorId',
    'publishDate',
    'lastUpdateDate',
    'hasPublished',
];
const ArticleReturnString = ArticleReturnKeys.join(' ');

/**
 * 文章模型
 */
class ArticleService extends Service {
    constructor(ctx) {
        super(ctx);
        const {service, model, helper, app} = ctx;
        const {Article, User} = model;
        this.app = app;
        this.service = service;
        this.model = model;
        this.helper = helper;
        this.Article = Article;
        this.User = User;
    }

    /**
     * 创建一个文章条目
     * @param {string} username 用户名
     * @param {string} title 文章名
     * @param {array} tags 标签列表
     * @param {object} content 存储文章内容的对象
     */
    async create(username, title, tags, content) {
        try {
            // 获取用户id
            const authorId = await this.User.findOne()
                .where({username})
                .select('_id').exec();

            // 创建属于该用户的文章
            const article = new this.Article({
                authorId: authorId._id,
                title,
                tags,
                content,
                lastUpdateDate: this.helper.currentTime,
            });

            // 保存文章数据
            await article.save().then((newArticle) => {
                if (newArticle) {
                    this.ctx.body = {
                        code: 0,
                        data: newArticle,
                        message: 'create article successfully',
                    };
                } else {
                    this.ctx.body = {
                        code: -1,
                        message: 'create article failed',
                    };
                }
            }).catch((e) => {
                // TODO 标准的错误处理
                this.ctx.body = {code: -1, message: e};
            });
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
     * 包括更新草稿 发布文章
     * @param {string} articleId
     * @param {object} params
     */
    async update(articleId, params) {
        const that = this;
        try {
            /**
             * 筛选出需要更新的字段
             */
            const updateObject = {};
            _.map(params, (value, key) => {
                updateObject[key] = value;
            });

            /**
             * TODO 这里需要搞清楚如果捕获错误
             */
                // conditions, updateObject
            const article = await this.Article
                // .select(ArticleReturnString)
                    .findByIdAndUpdate(articleId, updateObject, {new: true});

            if (article) {
                const {_id, __v, ...rest} = article._doc;
                that.ctx.body = {
                    code: 0,
                    data: {id: _id, ...rest},
                    message: 'update article successfully',
                };
            } else {
                this.ctx.body = {
                    code: -1,
                    message: 'no article',
                };
            }
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
     * 根据id查询文章并返回
     * @param {string} _id objectId
     */
    async get(_id) {
        try {
            // TODO select可以选择查询返回的字段，最好将字段设计为可配置对象自动生成需要的字符串
            const searchArticle = await this.Article
                .findOne({_id})
                // .populate('authorId', 'username email', this.User)
                .select(ArticleReturnString);
            if (searchArticle) {
                this.ctx.body = {
                    code: 0,
                    data: searchArticle,
                    message: 'get article successfully',
                };
            } else {
                this.ctx.body = {
                    code: -1,
                    message: 'no article',
                };
            }
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
     * 获取一个文章列表
     * 支持分页
     * @param {object} conditions 文章筛选条件
     * @param {number} [page=1] 需要文章列表的页数 从1开始计数
     * @param {number} [pageSize=10] 需要列表的长度
     */
    async getList(conditions, page = 1, pageSize = 10) {
        try {
            let userId;
            if (conditions.username) {
                const {username, ...rest} = conditions;
                const user = await this.User.findOne({username}).exec();
                if (user) userId = user._id;
                conditions = {authorId: userId, ...rest};
            }
            const list = await this.Article.find()
                .populate('authorId', 'username email', this.User)
                .select(ArticleReturnString)
                .where(conditions)
                .skip((page - 1) * pageSize)
                .limit(pageSize);
            if (list) {
                this.ctx.body = {
                    code: 0,
                    data: list,
                    message: 'get article list successfully',
                };
            } else {
                this.ctx.body = {
                    code: -1,
                    message: 'no article',
                };
            }
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
     * 根据文章id数组批量删除文章条目
     * @param {array} articleIdArray
     */
    async delete(articleIdArray) {
        try {
            const article = await this.Article.remove({_id: {$in: articleIdArray}});
            if (article) {
                this.ctx.body = {
                    code: 0,
                    message: 'delete article successfully',
                };
            } else {
                this.ctx.body = {
                    code: -1,
                    message: 'delete article failed',
                };
            }
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
            this.ctx.body = {
                code: -1,
                message: e.message,
            };
        }
    }
};

module.exports = ArticleService;
