/**
 * Author: Ruo
 * Create: 2018-03-14
 * Description:
 */

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");

const appPath = path.join(process.cwd(), 'app');
const publicPath = path.join(appPath, 'public');
const dllPath = path.join(publicPath, 'dll');
const webPath = path.join(process.cwd(), 'web');
// const webPagesPath = path.join(webPath, 'pages');

module.exports = {
    entry: {
        // 公共模块
        bundle: [
            'lodash',
            'store',
            'react',
            'react-dom',
            'mobx',
            'mobx-react',
            'styled-components',
            'material-ui',
            'draft-js',
            'jquery',
            'react-draft-wysiwyg',
        ],
    },
    output: {
        path: path.join(appPath, 'public', 'dll'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new CleanWebpackPlugin([path.join(publicPath, 'dll')], {
            verbose: false,
            exclude: [],
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllPlugin({
            path: path.join(dllPath, '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new UglifyJsPlugin({
            parallel: true,
        }),
    ]
};