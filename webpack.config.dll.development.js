/**
 * Author: Ruo
 * Create: 2018-03-14
 * Description:
 */
const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const {dllPath} = require('./webpack.config.basic');
const {config} = require('./webpack.config.dll.basic');
config.entry.bundle = [
    // 'lodash', // 使用babel-lodash-plugin
    'history', //
    'mobx-react-router', //
    'react-router', //
    'react',  // 使用cdn
    'react-dom', // 使用cdn
    'mobx', // 使用cdn
    'mobx-react', // 使用cdn
    'styled-components', // 使用cdn
    'draft-js', // 使用cdn
    'jquery', // 使用cdn
    'react-draft-wysiwyg',
];
config.output.filename = '[name].dll.dev.js';
config.output.library = '[name]_library_dev';
config.plugins.push(
    // 清理编译目录
    new CleanWebpackPlugin([dllPath], {
        verbose: false,
        exclude: ['bundle.dll.js'],
    }),
    new webpack.DllPlugin({
        path: path.resolve(dllPath, '[name]-manifest-dev.json'),
        name: '[name]_library_dev',
    }),
)
config.mode = 'development';
module.exports = config;
