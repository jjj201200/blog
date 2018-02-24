/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description:
 */

import $ from 'jquery';
import {runInAction} from 'mobx';

export const Ajax = ({
    type = 'get',
    url,
    data = {},
    success = null,
    fail = null,
}) => {
    return $.ajax({type, url, data, success}).fail(fail);
};
