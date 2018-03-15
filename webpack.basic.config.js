/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description:
 */
const path = require('path');
const webpack = require('webpack');

const appPath = path.join(process.cwd(), 'app');
const publicPath = path.join(appPath, 'public');
const dllPath = path.join(publicPath, 'dll');
const bundlesPath = path.join(publicPath, 'bundles');
const webPath = path.join(process.cwd(), 'web');
const webPagesPath = path.join(webPath, 'pages');

// 配置入口文件
const entries = {
    home: path.join(webPagesPath, 'home.js'),
};
const entriesArray = [];
for (let key in entries) {
    entriesArray.push(entries[key]);
}

let config = {
    target: 'web',
    entry: entries,
    output: {
        path: bundlesPath,
        publicPath: '/',
        filename: '[name].js',
    },
    externals: {
        jquery: '$',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    resolve: {
        alias: { // 这里需要个app.js里保持一致
            DFPages: path.join(webPath, 'pages'),
            DFLibs: path.join(webPath, 'libs'),
            DFUIs: path.join(webPath, 'uis'),
            DFComponents: path.join(webPath, 'components'),
            DFStyles: path.join(webPath, 'styles'),
            DFStores: path.join(webPath, 'stores'),
            DFUtils: path.join(webPath, 'utils'),
            DFPlugins: path.join(webPath, 'plugins'),
            DFModels: path.join(webPath, 'models'),
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
                    path.join(__dirname, 'loaders', 'clientEntryLoader.js'),
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(dllPath, 'bundle-manifest.json')),
        }),
    ],
};

module.exports = {
    appPath,
    webPath,
    publicPath,
    bundlesPath,
    dllPath,
    webPagesPath,
    config
};
