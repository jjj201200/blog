/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */
const _ = require('lodash');
const Service = require('egg').Service;

const CardReturnKeys = [
    '_id',
    'targetType',
    'type',
    'name',
    'attack',
    'defend',
    'duration',
    'consume',
];

module.exports = class CardService extends Service {
    constructor(ctx) {
        super(ctx);
        const {service, model, helper, app} = ctx;
        this.app = app;
        this.service = service;
        this.model = model;
        this.helper = helper;
        this.Card = model.Gayme.Card;
    }

    /**
     * 获取指定类型的卡牌列表
     * 支持分页
     * @param {object} conditions 卡牌筛选条件
     * @param {number} [page=1] 卡牌列表的页数 从1开始计数
     * @param {number} [pageSize=30] 列表的长度
     */
    async getList(conditions, page = 1, pageSize = 30) {
        try {
            let list = this.Card.find();
            if (conditions) {
                list = list.where(conditions);
            }
            list = list.select(CardReturnKeys.join(' '))
                .skip((page - 1) * pageSize)
                .limit(pageSize);
            await list.exec((err, resList) => {
                if (resList && resList.length) { // 查询到了
                    this.ctx.body = {
                        code: 0,
                        data: resList,
                        message: 'get card list successfully',
                    };
                } else { // 没有查询到
                    // TODO 标准的错误处理
                    this.ctx.body = {
                        code: -1,
                        message: 'no card',
                    };
                }
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
     * 创建一个新卡牌条目
     * @param {number} targetType 目标类型
     * @param {number} type 卡牌类型 目前默认都为0
     * @param {string} name 卡牌名称
     * @param {number} attack 卡牌发动效果 - 造成多少点伤害 - 攻击值
     * @param {number} defend 卡牌发动效果 - 给予多少点格挡 - 防御值
     * @param {number} duration 卡牌效果持续回合数，如：攻击牌持续时间0，防御牌持续时间1
     * @param {number} consume 卡牌发动所需的费用
     */
    async create(targetType, type = 0, name, attack = 0, defend = 0, duration = 0, consume = 0) {
        try {
            // 获取用户id
            const searchCard = await this.Card.findOne()
                .where({targetType, name, type, attack, defend, duration, consume}) // 查询是否有一模一样的卡
                .select(CardReturnKeys.join(' '))
                .exec();

            if (searchCard) {
                this.ctx.body = {
                    code: 0,
                    data: searchCard,
                    msg: 'has card',
                }
            } else { // 没有完全相同的牌则创建一张
                const card = new this.Card({
                    targetType,
                    name,
                    type,
                    attack,
                    defend,
                    duration,
                    consume,
                });
                await card.save().then((newCard) => {
                    if (newCard) {
                        this.ctx.body = {
                            code: 0,
                            data: newCard,
                            message: 'create card successfully',
                        };
                    } else {
                        this.ctx.body = {
                            code: -1,
                            message: 'create card failed',
                        };
                    }
                }).catch((e) => {
                    // TODO 标准的错误处理
                    this.ctx.body = {code: -1, message: e};
                });
            }
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
            this.ctx.body = {code: -1, message: e};
        }
    }

    /**
     * 更新卡牌数据
     * @param {string} cardId
     * @param {object} params
     */
    async update(cardId, params) {
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
            const card = await this.Card
                // .select(ArticleReturnString)
                    .findByIdAndUpdate(cardId, updateObject, {new: true})
                    .select(CardReturnKeys.join(' '));
            if (card) {
                this.ctx.body = {
                    code: 0,
                    data: card,
                    msg: 'update card successfully',
                }
            } else throw new Error('update card failed')
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
            this.ctx.body = {
                code: -1,
                data: card,
                msg: e.msg,
            }
        }
    }

    /**
     * 删除卡牌条目
     * @param cardIdArray
     */
    async delete(cardIdArray) {
        try {
            const card = await this.Card
                .remove({_id: {$in: cardIdArray}});
            if (card) {
                this.ctx.body = {
                    code: 0,
                    message: 'delete card successfully',
                };
            } else {
                this.ctx.body = {
                    code: -1,
                    message: 'delete card failed',
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
}