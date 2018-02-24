/* global require, module */
/**
 * Author: Ruo
 * Create: 2018-01-08
 * Description: 数据库
 */
import mongoose from 'mongoose';
const [host, post, dbName] = ['0.0.0.0', 27017, 'test'];

const DB_URL = `mongodb://${host}:${post}/${dbName}`;
export const initDatabase = (callback) => {
    mongoose.connect(DB_URL, (error, db) => {
        if (error) {
            console.log('数据库连接失败\n\r'.red);
        } else {
            console.log('数据库连接成功\n\r'.green);
            if (callback instanceof Function) callback(db);
        }
    });

    mongoose.connection.on('connected', function () {
        console.log(`Mongoose connection open to  ${DB_URL}\n\r`.green);
    });
    mongoose.connection.on('error', function (err) {
        console.log(`Mongoose connection error: ${err}\n\r`.red);
    });
    mongoose.connection.on('disconnected', function () {
        console.log(`Mongoose connection disconnected\n\r`.blue);
    });
};
