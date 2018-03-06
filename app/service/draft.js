/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

const Service = require('egg').Service;

module.exports = class DraftService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    /**
     * @param [field='title']
     * @returns {Promise.<void>}
     */
    async get(field) {
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {Draft} = model;
        try {
            if (!Draft) throw new Error('no model draft');
            const requestBody = ctx.request.body;
            const searchDraft = await Draft.findOne({[field]: requestBody[field]});
            if (searchDraft) {
                ctx.body = {code: 0, data: searchDraft};
            } else {
                ctx.body = {code: -1, message: 'no draft'};
            }
        } catch (e) {
            console.error(e);
            ctx.body = {code: -1, message: e};
        }
    }
    /**
     * @requireParam title
     * @requireParam tags
     * @requireParam content
     * @returns {Promise.<void>}
     */
    async create() {
        const that = this;
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {Draft} = model;
        try {
            if (!Draft) throw new Error('no model draft');
            const requestBody = ctx.request.body;
            const searchDraft = await Draft.findOne({title: requestBody['title']});
            if (searchDraft) { // existed, update it
                searchDraft.set({
                    ...requestBody,
                    author: service.jwt.currentJwtData.username,
                    lastUpdateDate: helper.currentTime,
                });
                await searchDraft.save().then((updatedDraft) => {
                    ctx.body = {code: 0, message: 'update draft successfully'};
                });
            } else { // not exist, create one
                const newDraft = new Draft({
                    ...requestBody,
                    author: service.jwt.currentJwtData.username,
                    saveDate: helper.currentTime,
                    lastUpdateDate: helper.currentTime,
                });
                await newDraft.save().then((newDraft) => {
                    if (newDraft) {
                        ctx.body = {code: 0, message: 'create draft successfully'};
                    }
                }).catch((e) => {
                    ctx.body = {code: -1, message: e};
                });
            }
        } catch (e) {
            console.error(e);
            ctx.body = {code: -1, message: e};
        }
    }

    /**
     * @requireParam title
     * @requireParam tags
     * @requireParam content
     * @returns {Promise.<void>}
     */
    async update() {
        const that = this;
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {Draft} = model;
        try {
            if (!Draft) throw new Error('no model draft');
            const requestBody = ctx.request.body;
            const searchDraft = await Draft.findOne({title: requestBody['title']});
            if (searchDraft) {
                searchDraft.set({
                    ...requestBody,
                    author: service.jwt.currentJwtData.username,
                    lastUpdateDate: helper.currentTime,
                });
                await searchDraft.save().then((updatedDraft) => {
                    ctx.body = {code: 0, message: 'update draft successfully'};
                });
            } else {
                ctx.body = {code: -1, message: 'no draft'};
            }
        } catch (e) {
            ctx.throw(500, {code: -1, e});
        }
    }

    async delete() {

    }
};
