/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const React = require('react');
// const path = require('path');

// const appPath = path.join(process.cwd(), 'app');
// const webPath = path.join(appPath, 'web');

module.exports = app => {
    const {Controller} = app;
    return class HomeController extends Controller {
        async index() {
            const {ctx} = this;
            const props = {
                location: ctx.request.url,
            };
            await ctx.render('home.js', props);
        }
    };
};