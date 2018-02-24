'use strict';

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const JWT = Symbol('Application#jwt');

const extendObject = {
    get jwt() {
        if (!this[JWT]) {
            this[JWT] = koaJwt(this.config.jwt);
            this[JWT].sign = jwt.sign;
            this[JWT].verify = jwt.verify;
            this[JWT].decode = jwt.decode;
        }
        return this[JWT];
    },
};

module.exports = extendObject;
