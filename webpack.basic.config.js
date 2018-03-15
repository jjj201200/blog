/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */

const path = require('path');
const webpack = require('webpack');

// paths
const rootPath = process.cwd();
const appPath = path.resolve(rootPath, 'app');
const publicPath = path.resolve(appPath, 'public');
const dllPath = path.resolve(publicPath, 'dll');
const bundlesPath = path.resolve(publicPath, 'bundles');
const webPath = path.resolve(rootPath, 'web');
const webPagesPath = path.resolve(webPath, 'pages');

// 配置入口文件
const entry = {
    home: path.resolve(webPagesPath, 'home.js'),
};
const entriesArray = [];
for (let key in entry) {
    entriesArray.push(entry[key]);
}

// 外部引用映射 - 于全局变量中查找
const externals = {
    jquery: '$',
    react: 'React',
    'react-dom': 'ReactDOM',
    'mobx': 'mobx',
    'mobx-react': 'mobxReact',
    'styled-components': 'styled',
    lodash: '_',
};

/**
 * 编译导出配置 - 注意dev下egg-webpack内存编译，它的path是rootPath根目录
 */

const output = {
    // path: process.env.NODE_ENV === 'production' ? bundlesPath : rootPath,
    publicPath: '/',
    filename: '[name].js',
};

let config = {
    cache: false,
    target: 'web',
    entry,
    output,
    resolve: {
        alias: { // 这里需要个app.js里保持一致
            DFPages: path.resolve(webPath, 'pages'),
            DFLibs: path.resolve(webPath, 'libs'),
            DFUIs: path.resolve(webPath, 'uis'),
            DFComponents: path.resolve(webPath, 'components'),
            DFStyles: path.resolve(webPath, 'styles'),
            DFStores: path.resolve(webPath, 'stores'),
            DFUtils: path.resolve(webPath, 'utils'),
            DFPlugins: path.resolve(webPath, 'plugins'),
            DFModels: path.resolve(webPath, 'models'),
        },
        mainFiles: ['index'],
        extensions: ['.js', '.json', '.jsx', '.css', '.less', '.scss', '.sass'],
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                    path.resolve(__dirname, 'loaders', 'clientEntryLoader.js'),
                ],
                include: entriesArray,
            },
            {
                test: /.(js|jsx)?$/,
                loaders: [
                    'babel-loader',
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.(less)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
        ],
    },
    plugins: [],
};

module.exports = {
    rootPath,
    appPath,
    webPath,
    publicPath,
    bundlesPath,
    dllPath,
    webPagesPath,
    config,
    externals,
};
