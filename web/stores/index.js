/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: 全局对象Store初始化，导出
 */
import {GBS} from './GBS';
import {GlobalStore} from './GlobalStore';
import {GaymeStore} from './GaymeStore';
import {UserStore} from './UserStore';
import {EditorStore} from './EditorStore';
import {CardsStore} from './CardsStore';
import {BlogStore} from './BlogStore';
// import {RouterStore} from './RouterStore';

export default new GBS([
    GlobalStore,
    UserStore,
    BlogStore,
    CardsStore,
    GaymeStore,
    EditorStore,
]);
