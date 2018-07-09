'use strict';

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const JWT = Symbol('Application#jwt');

const PlayerManagerSign = Symbol('Application#PlayerMananger');
const CardManagerSign = Symbol('Application#CardManager');
const BattleList = Symbol('Application#battleList');
const Gayme = Symbol('Application#Gayme');

const PlayerManager = require('./gayme/PlayerManager');
const CardManager = require('./gayme/CardManager');

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
    get PlayerManager() {
        if (!this[PlayerManagerSign]) {
            this[PlayerManagerSign] = new PlayerManager();
        }
        return this[PlayerManagerSign];
    },
    get CardManager() {
        if (!this[CardManagerSign]) {
            this[CardManagerSign] = new CardManager();
        }
        return this[CardManagerSign];
    },
};

module.exports = extendObject;
