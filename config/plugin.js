'use strict';

// add you build-in plugin here, example:
// exports.nunjucks = {
//   enable: true,
//   package: 'egg-view-nunjucks',
// };

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.validate = { // 用于对请求参数进行校验
    enable: true,
    package: 'egg-validate',
};
exports.io = { // websocket
    enable: true,
    package: 'egg-socket.io',
};
