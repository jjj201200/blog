/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */

const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const {message} = require('./utils');

const {config, externals, publicPath, bundlesPath, dllPath} = require('./webpack.config.basic');

const dllFileName = 'bundle.dll.js';

/**
 * 检测dll是否已经先编译
 */
if (!fs.existsSync(path.resolve(dllPath, dllFileName))) {
    message(`没有在 ${dllPath} 找到 ${dllFileName}`, 'red');
    message(`开始编译 ${dllFileName}`);
    shelljs.exec('npm run build:dll');
}

config.output.path = bundlesPath;
config.externals = externals;
config.devtool = 'false';
config.plugins.push(
    // 清理编译目录
    new CleanWebpackPlugin([bundlesPath], {
        verbose: false,
        exclude: [],
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require(path.join(dllPath, 'bundle-manifest.json')),
    }),
    new MinifyPlugin({
        keepFnName: true,
        removeConsole: true,
        removeDebugger: true,
    }, {}),
    new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: 'production.analysis.json',
    }),
    new ManifestPlugin({
        publicPath: '/public/bundles/',
        basePath: '/public/bundles/',
    }),
);
config.mode = 'production';
module.exports = config;
