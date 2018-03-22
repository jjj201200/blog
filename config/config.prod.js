'use strict';
const path = require('path');

const timeZone = 8;
const timeZoneIncrement = timeZone * 60 * 60 * 1000;
const jwtMaxAge = timeZoneIncrement + 24 * 60 * 60 * 1000

module.exports = appInfo => {
    const config = {};
    return config;
};
