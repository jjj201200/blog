/**
 * Author: Ruo
 * Create: 2018-03-03
 * Description:
 */

const Service = require('egg').Service;

module.exports = class BlogService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    /**
     * tag not tags
     * @param [field='author'|'tag']
     * @returns {Promise.<void>}
     */
    async getList(field) {
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {Blog} = model;
        try {
            if (!Blog) throw new Error('no model blog');
            const requestBody = ctx.request.body;
            const searchBlog = await Blog.findOne({[field]: requestBody[field]});
            if (searchBlog) {
                ctx.body = {code: 0, data: searchBlog};
            } else {
                ctx.body = {code: -1, message: 'no blog'};
            }
        } catch (e) {
            console.error(e);
            ctx.body = {code: -1, message: e};
        }
    }
    /**
     * @param [field='title']
     * @returns {Promise.<void>}
     */
    async get(field) {
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {Blog} = model;
        try {
            if (!Blog) throw new Error('no model blog');
            const requestBody = ctx.request.body;
            const searchBlog = await Blog.findOne({[field]: requestBody[field]});
            if (searchBlog) {
                ctx.body = {code: 0, data: searchBlog};
            } else {
                ctx.body = {code: -1, message: 'no blog'};
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
        const {Blog} = model;
        try {
            if (!Blog) throw new Error('no model blog');
            const requestBody = ctx.request.body;
            const searchBlog = await Blog.findOne({title: requestBody['title']});
            if (searchBlog) {
                ctx.body = {code: -1, message: 'has blog'};
            } else {
                const newBlog = new Blog({
                    ...requestBody,
                    publishDate: helper.currentTime,
                    lastUpdateDate: helper.currentTime,
                });
                await newBlog.save().then((newBlog) => {
                    if (newBlog) {
                        ctx.body = {code: 0, message: 'create blog successfully'};
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
        const {Blog} = model;
        try {
            if (!Blog) throw new Error('no model blog');
            const requestBody = ctx.request.body;
            const searchBlog = await Blog.findOne({title: requestBody['title']});
            if (searchBlog) {
                searchBlog.set({
                    ...requestBody,
                    lastUpdateDate: helper.currentTime,
                });
                await searchBlog.save().then((updatedBlog) => {
                    ctx.body = {code: 0, message: 'update blog successfully'};
                });
            } else {
                ctx.body = {code: -1, message: 'no blog'};
            }
        } catch (e) {
            ctx.throw(500, {code: -1, e});
        }
    }

    async delete() {

    }

};