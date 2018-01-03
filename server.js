/* global require */
/**
 * Author: Ruo
 * Create: 2017-11-21
 * Description: 本地服务器配置文件
 */
const path = require('path');
const express = require('express');
const logger = require('morgan');

const isDev = process.env.NODE_ENV === 'development';

var app = express();

app.set('views', './server/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({
    transformViews: true,
    babel: {
        "presets": [
            [
                "babel-preset-es2015",
                {
                    "loose": true,
                    "modules": false
                }
            ],
            "babel-preset-react",
            "babel-preset-stage-0"
        ],
        "plugins": [
            "react-hot-loader/babel",
            "babel-plugin-lodash",
            "transform-react-jsx",
            "babel-plugin-transform-decorators-legacy"
        ],
    }
}));

// local variables for all views
app.locals.env = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {
    app.use(logger('dev'));
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        // public path should be the same with webpack config
        publicPath: config.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }));

    app.use(webpackHotMiddleware(compiler));

    app.route('*').get(function (req, res, next) {
        res.sendFile(path.join(__dirname, 'client', 'src', 'index.html'));
    });

    // add "reload" to express, see: https://www.npmjs.com/package/reload
    var reload = require('reload');
    var http = require('http');

    var server = http.createServer(app);
    reload(app);

    server.listen(config.devServer.port, function(){
        console.log('App (dev) is now running on port 3000!');
    });
}

