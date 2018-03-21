/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: 全局对象Store初始化，导出
 */
import {GBS} from './GBS';
import {GlobalStore} from './GlobalStore';
// import {RouterStore} from './RouterStore';
import {UserStore} from './UserStore';
import {EditorStore} from './EditorStore';
import {BlogStore} from './BlogStore';

export default new GBS([
    GlobalStore,
    // RouterStore,
    UserStore,
    BlogStore,
    EditorStore,
]);
