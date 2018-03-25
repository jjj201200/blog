/**
 * Author: Ruo
 * Create: 2018-03-23
 * Description:
 */
const _ = require('lodash');
const Service = require('egg').Service;

const PlayerReturnKeys = [
    '_id',
    'userId',
    'nickname',
    'sum',
    'win',
    'cards',
    'loginDate',
];

module.exports = class PlayerService extends Service {
    constructor(ctx) {
        super(ctx);
        const {service, model, helper, app} = ctx;
        this.app = app;
        this.service = service;
        this.model = model;
        this.helper = helper;
        this.User = model.User;
        this.Player = model.Gayme.Player;
    }


    /**
     * 获取游戏账号数据
     * @param userId
     */
    async get(userId) {
        try {
            // TODO select可以选择查询返回的字段，最好将字段设计为可配置对象自动生成需要的字符串
            const searchPlayer = this.Player
                .findOne({userId}).select(PlayerReturnKeys.join(' '));
            // .populate('authorId', 'username email', this.User);
            return await searchPlayer.exec();
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
            throw new Error(e);
        }
    }

    /**
     * 创建一个新玩家条目
     * @param {string} userId 游戏账号对应的用户id
     * @param {string} nickname 玩家昵称
     * @param {number} sum 总游戏场数
     * @param {number} win 胜利场数
     * @param {array} cards 卡牌对象
     */
    async create({userId, nickname, sum = 0, win = 0, cards = []}) {
        try {
            // 获取用户id
            const resUserId = await this.User.findOne().where({_id: userId}).select('_id').exec();
            console.log(resUserId);
            if (resUserId) {

                // 创建属于该用户的游戏账号数据
                const player = new this.Player({
                    userId,
                    nickname,
                    sum,
                    win,
                    cards,
                });

                // 保存玩家数据
                return await player.save().then((newPlayer) => {
                    if (newPlayer) {
                        // this.ctx.body = {
                        //     code: 0,
                        //     data: newPlayer,
                        //     message: 'create player successfully',
                        // };
                        return newPlayer;
                    } else return false;
                }).catch((e) => {
                    // TODO 标准的错误处理
                    // this.ctx.body = {code: -1, message: e};
                    throw e;
                });
            }
        } catch (e) {
            // TODO 标准的错误处理
            console.error(e);
            // this.ctx.body = {
            //     code: -1,
            //     message: e.message,
            // };
            throw e;
        }
    }

    /**
     * 给指定id的用户添加指定id的卡牌
     * @param userId
     * @param cardId
     */
    async addCard(userId, cardId) {
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
             * TODO 这里需要搞清楚如何捕获错误
             */
                // conditions, updateObject
            const player = await this.Player
                // .select(ArticleReturnString)
                    .findOne(userId);
            console.log(player);
            // if (player) {
            //     const {__v, ...rest} = article._doc;
            //     that.ctx.body = {
            //         code: 0,
            //         data: {...rest},
            //         message: 'update player successfully',
            //     };
            // } else {
            //     this.ctx.body = {
            //         code: -1,
            //         message: 'no player',
            //     };
            // }
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
     * 更新游戏账户数据
     * @param {string} userId
     * @param {object} params
     */
    /*async update(userId, params) {
        const that = this;
        try {
            /!**
             * 筛选出需要更新的字段
             *!/
            const updateObject = {};
            _.map(params, (value, key) => {
                updateObject[key] = value;
            });

            /!**
             * TODO 这里需要搞清楚如何捕获错误
             *!/
                // conditions, updateObject
            const player = await this.Article
                // .select(ArticleReturnString)
                    .findByIdAndUpdate(userId, updateObject, {new: true});

            if (player) {
                const {__v, ...rest} = article._doc;
                that.ctx.body = {
                    code: 0,
                    data: {...rest},
                    message: 'update player successfully',
                };
            } else {
                this.ctx.body = {
                    code: -1,
                    message: 'no player',
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
    }*/
}