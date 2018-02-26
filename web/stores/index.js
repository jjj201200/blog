/**
 * Author: Ruo
 * Create: 2018-01-09
 * Description: 全局对象Store初始化，导出
 */
import GlobalStore from './GlobalStore';
import UserStore from './UserStore';

const GBS = new GlobalStore();
GBS.addStore(UserStore);

export default GBS;
