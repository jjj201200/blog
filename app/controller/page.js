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
                title: 'Home',
                location: ctx.request.url,
                componentName: 'Home',
            };
            await ctx.render('serverRenderTemplate.js', props);
        }

        async gayme() {
            const {ctx} = this;
            const props = {
                title: 'Gayme',
                location: ctx.request.url,
                componentName: 'Gayme',
            };
            await ctx.render('serverRenderTemplate.js', props);
        }
    };
};