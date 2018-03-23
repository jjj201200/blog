/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */
const _ = require('lodash');
const Service = require('egg').Service;

module.exports = class PlayerService extends Service {
    constructor(ctx) {
        super(ctx);
        const {service, model, helper, app} = ctx;
        this.app = app;
        this.service = service;
        this.model = model;
        this.helper = helper;
        this.Player = model.gayme.Player;
    }

    /**
     * 创建一个新玩家条目
     * @param {string} userId 游戏账号对应的用户id
     * @param {string} nickname 玩家昵称
     * @param {number} sum 总游戏场数
     * @param {number} win 胜利场数
     * @param {array} cards 卡牌对象
     */
    async create(userId, nickname, sum = 0, win = 0, cards = []) {
        try {
            // 获取用户id
            const userId = await this.User.findOne()
                .where({userId})
                .select('_id').exec();

            // 创建属于该用户的游戏账号数据
            const article = new this.Player({
                authorId: userId._id,
                nickname,
                sum,
                win,
                cards,
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
}