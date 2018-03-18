/**
 * Author: Ruo
 * Create: 2018-02-07
 * Description: 这个文件仅仅用来给IDE读取alias用，不用来编译!!
 */

const path = require('path');

// paths
const rootPath = process.cwd();
const webPath = path.resolve(rootPath, 'web');

let config = {
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
    }
};

module.exports = config;