/* global require, module */
/**
 * Author: Ruo
 * Create: 2018-01-20
 * Description: 启动文件
 */
const http = require('http');
const path = require('path');
const babelRegisterConfig = require('./config/babelRegister.config');

require('babel-polyfill');
require('babel-register')(babelRegisterConfig);

// view engine
module.exports = function (app) {
    app.view.use('reactViewEngine', require('./lib/reactRenderEngine'));

    // 扩展schema目录
    const schemaPaths = app.loader.getLoadUnits().map(unit => path.join(unit.path, 'app/schema'));
    app.loader.loadToContext(schemaPaths, 'schema', {
        // 设置 call 在加载时会调用函数返回 UserService
        call: true,
        // 将文件加载到 app.Schema
        fieldClass: 'Schema',
    });
}
