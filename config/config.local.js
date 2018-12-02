/* global require, module */
'use strict';
const path = require('path');

const timeZone = 8;
const timeZoneIncrement = timeZone * 60 * 60 * 1000;
const jwtMaxAge = timeZoneIncrement + 24 * 60 * 60 * 1000

module.exports = appInfo => {
    const config = {
        webpack: {
            browser: './',
            //match: /^\/public\//,
            //proxyMapping: {
            //    js: 'text/javascript;',
            //},
            //webpackConfigFile: '../webpack.config.development.js',
            webpackConfigList: [require('../webpack.config.development.js')],
        },
    };
    return config;
};
