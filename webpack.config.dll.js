/**
 * Author: Ruo
 * Create: 2018-03-14
 * Description:
 */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {dllPath} = require('./webpack.config.basic');
const {config} = require('./webpack.config.dll.basic');

config.output.filename = '[name].dll.js';
config.plugins.push(
    // 清理编译目录
    new CleanWebpackPlugin([dllPath], {
        verbose: false,
        exclude: ['bundle.dll.dev.js'],
    }),
    new webpack.DllPlugin({
        path: path.resolve(dllPath, '[name]-manifest.json'),
        name: '[name]_library',
    }),
)
module.exports = config;