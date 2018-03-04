/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: 全局对象Store初始化，导出
 */
import GlobalStore from './GlobalStore';
import UserStore from './UserStore';
import EditorStore from './EditorStore';
import BlogStore from './BlogStore';

const GBS = new GlobalStore();
GBS.addStore(UserStore);
GBS.addStore(BlogStore);
GBS.addStore(EditorStore);

export default GBS;
