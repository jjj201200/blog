/* global require, module*/
/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description: 本地开发模式webpack 编译配置文件
 */

const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {config, externals, rootPath, bundlesPath, dllPath} = require('./webpack.config.basic');
const {message} = require('./utils');

const dllFileName = 'bundle.dll.dev.js';

/**
 * 检测dll是否已经先编译
 */
if (!fs.existsSync(path.resolve(dllPath, dllFileName))) {
    message(`没有在 ${dllPath} 找到 ${dllFileName}`, 'red');
    message(`开始编译 ${dllFileName}`);
    shelljs.exec('npm run build:dev:dll');
}

message(`开始编译 webpack.config.development.js`);

config.output.path = rootPath; // 内存编译后固定位置 - *不要改动*
config.devtool = 'source-map';
// config.externals = externals;
config.plugins.push(
    // new CleanWebpackPlugin([bundlesPath], {
    //     verbose: false,
    //     exclude: [],
    // }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new webpack.DllReferencePlugin({
        context: rootPath,
        manifest: require(path.resolve(dllPath, 'bundle-manifest-dev.json')),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
);
config.mode = 'development';
module.exports = config;
