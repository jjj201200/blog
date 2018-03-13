/* global require, module */
/**
 * Author: Ruo
 * Create: 2018-01-20
 * Description: 启动文件
 */
const babelRegisterConfig = require('./config/babelRegister.config');

require('babel-polyfill');
require('babel-register')(babelRegisterConfig);

// view engine
module.exports = function(app) {
    app.view.use('reactViewEngine', require('./lib/reactRenderEngine'));
};
