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

    async getList() {

    }

    async get() {

    }

    async create() {
        const that = this;
        const {ctx} = this;
        const {service, model, helper} = ctx;
        const {Blog} = model;
        try {
            if (!Blog) throw new Error('no model blog');
            const requestBody = ctx.request.bogy;
            const searchBlog = await Blog.findOne({title: requestBody['title']});
            if (searchBlog) {
                ctx.body = {code: -1, message: 'has blog'};
            } else {
                const newBlog = new Blog({
                    ...requestBody,
                    publishDate: helper.currentTime,
                    lastUpdateDate: helper.currentTime,
                })
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

    async update() {

    }

    async delete() {

    }

};