/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description:
 */

import $ from 'jquery';
// import {runInAction} from 'mobx';

export const JSON_CONTENT_TYPE = 'application/json'; // 发送数据格式

export function Ajax({
    type = 'get',
    url,
    data,
    success = null,
    fail = null,
    dataType = 'json', // 返回数据格式
    contentType = 'application/x-www-form-urlencoded',
}) {
    return $.ajax({type, url, data, success, dataType, contentType}).fail(fail);
};
