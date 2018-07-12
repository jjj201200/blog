/**
 * Author: Ruo
 * Create: 2018-03-16
 * Description: 发布脚本
 */
'use strict'
// const fs = require('fs');
// const Path = require('path');
const colors = require('colors');
// const moment = require('moment');
const shelljs = require('shelljs');
// const program = require('commander');
const inquirer = require('inquirer');

// const USER_HOME_DIR = process.env.HOME || process.env.USERPROFILE || '/root';

let stepNum = 1;
const message = (msg) => {
    console.log(`\n${stepNum}. ${msg}`.green);
    stepNum += 1;
};

const getCurrentGitCommitHash = () => {
    return shelljs.exec(`git rev-parse HEAD`).stdout.trim();
};

const rsyncFolders = (from, to) => {
    shelljs.exec(`rsync -e ssh --exclude-from './rsync-exclude' "${from}" "${to}" --checksum --recursive --delete --progress`);
};

const serverList = [{
    key: 'aliyun:hongkong',
    name: 'aliyun - hongkong',
    short: 'aliyun - hongkong',
    value: {
        srcDir: './',
        branch: 'master',
        host: 'root@47.91.213.174',
        path: 'blog/',
        webpack: require.resolve('./webpack.config.production'),
        web: 'http://www.drowsyflesh.com',
    }
}];

inquirer.prompt([
    {
        name: 'server',
        type: 'list',
        choices: serverList,
        message: 'Please select the server you want publish to.'
    },
    {
        name: 'sure',
        type: 'confirm',
        default: false,
        message: answers => {
            const {host, branch} = answers.server;
            console.log(`【注意： 请确保已经将代码推送到 github ！！！！】`.red);
            console.log(`【注意： 请确保已经将代码推送到 github ！！！！】`.red);
            console.log(`【注意： 请确保已经将代码推送到 github ！！！！】`.red);
            console.log(`【本地所有内容将git reset，请注意保存未提交代码】`.yellow);
            console.log(`【请确保有 ${host.green.bold} 的ssh权限】`.yellow);
            console.log('=====================================');
            console.log(`准备发布 ${branch.green.bold} 分支到 ${host.green.bold} 服务器`);
            return `请输入 ${'y'.green.bold} 继续，否则退出`;
        },
    },
]).then(answers => {
    const {host, branch} = answers.server;
    if (!answers.sure) {
        console.log(`未输入 y ，退出发布脚本`.red);
        return;
    } else {
        console.log(`开始发布 ${branch.green.bold} 分支到 ${answers.server.host.green.bold} 服务器`.yellow);
    }
    message('清空仓库并拉取最新代码');
    shelljs.exec('git reset --hard'); // 清空所有未提交修改
    shelljs.exec(`git checkout ${branch}`); // 切换到目标分支
    shelljs.exec('git remote prune origin'); // 删除清理所有远程已经删除的本地分支
    shelljs.exec(`git pull origin ${branch}`); // 拉取目标分支
    shelljs.exec('git status');

    const lastCommitHash = getCurrentGitCommitHash();
    message(`开始执行webpack编译过程 - hash:${lastCommitHash}`);
    shelljs.exec(`npm run build:dll`);
    shelljs.exec(`npm run build`);

    message('开始上传文件到目标服务器');
    console.log(`将 ${answers.server.srcDir} 传输到 ${answers.server.host}:${answers.server.path} 目录下`.yellow);
    rsyncFolders(`${answers.server.srcDir}`, `${answers.server.host}:${answers.server.path}`);
    // shelljs.exec('yarn');
});