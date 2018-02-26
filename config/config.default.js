'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = {
        consoleLevel: 'DEBUG',
        keys: 'drowsy flesh',
        // middleware: [ 'jwt' ],
        security: { // 关闭csrf校验，使用jwt
            csrf: {
                enable: false,
                // useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
                // cookieName: 'csrfToken',
                // sessionName: 'csrfToken',
            },
        },
        jwt: {
            secret: 'Jiangxin0037.',
            enable: true,
            match: '/api/',
        },
        development: {
            watchDirs: [
                path.join(process.cwd(), 'app'),
            ],
        },
        webpack: {
            proxyMapping: {
                js: 'text/javascript;',
            },
            webpackConfigList: [require('../webpack.config.js')],
        },
        view: {
            defaultViewEngine: 'reactViewEngine', // 默认模板渲染引擎
            defaultExtension: '.js', // 默认模板扩展名
            mapping: { // 多扩展名对应对渲染引擎
                '.js': 'reactViewEngine',
                '.jsx': 'reactViewEngine',
            },
            root: [ // 模板根目录配置
                path.join(appInfo.baseDir, 'app/view'),
            ].join(','),
        },
        mongoose: { //db
            url: 'mongodb://127.0.0.1/blog_test',
            options: {},
        },
    };
    return config;
};
