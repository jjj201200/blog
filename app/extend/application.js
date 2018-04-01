'use strict';

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const JWT = Symbol('Application#jwt');

const PlayerManangerSign = Symbol('Application#PlayerMananger');
const RoomList = Symbol('Application#roomList');
const BattleList = Symbol('Application#battleList');
const Gayme = Symbol('Application#Gayme');

const PlayerMananger = require('./gayme/PlayerManager');

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
    get PlayerMananger() {
        if (!this[PlayerManangerSign]) {
            this[PlayerManangerSign] = new PlayerMananger();
        }
        return this[PlayerManangerSign];
    },
};

module.exports = extendObject;
