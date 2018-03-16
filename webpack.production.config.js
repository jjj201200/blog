/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require("babel-minify-webpack-plugin");
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const {config, externals, publicPath, bundlesPath, dllPath} = require('./webpack.basic.config');

config.output.path = bundlesPath;
config.externals = externals;
config.devtool = 'false';
config.plugins.push(
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    }),
    // 清理编译目录
    new CleanWebpackPlugin([bundlesPath], {
        verbose: false,
        exclude: [],
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

module.exports = config;
