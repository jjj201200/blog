'use strict';

const koaJwt = require('koa-jwt');
const jwt = require('jsonwebtoken');
const JWT = Symbol('Application#jwt');

const PlayerList = Symbol('Application#playerList');
const RoomList = Symbol('Application#roomList');
const BattleList = Symbol('Application#battleList');
const Gayme = Symbol('Application#Gayme');

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
    get players() {
        if (!this[PlayerList]) {
            this[PlayerList] = {};
        }
        return this[PlayerList];
    },
    get rooms() {
        if (!this[RoomList]) {
            this[RoomList] = {};
        }
        return this[RoomList];
    },
    get battle() {
        if (!this[BattleList]) {
            this[BattleList] = {};
        }
        return this[BattleList];
    },
    get gayme() {
        if (!this[Gayme]) {
            this[Gayme] = {};
        }
        return this[Gayme];
    }
};

module.exports = extendObject;
