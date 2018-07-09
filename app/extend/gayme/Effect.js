/**
 * Author: Ruo
 * Create: 2018-03-28
 * Description: 卡牌效果
 * 打星号的暂时不实现
 */

/**
 * 属性
 * name {string} - 效果名称
 * power {number} - effect power，影响数值
 * effectId - 用于在具体计算时在队列中检索的编号，应该能够在统一查询和不统一查询的情况下都能正常工作
 * life {number} 效果生命期长度
 * target {userId} 作用目标
 * paramStr {string}
 *      效果影响的对象玩家的某个效果的持续时间，改属性值应类似“effectId.paramName”
 *      玩家的生命值“life”

 * *前置效果 [effectId]
 * *后置效果 [effectId]
 */
/**
 * *before - 前置效果执行函数
 * main - 效果发动时调用的函数
 * *after - 后置效果执行函数
 * addTarget [userId] - 绑定目标为作用对象，即设定该效果作用于哪个玩家对象的战斗参数列表
 */
module.exports = class Effect {
    constructor({name, life, paramStr, power}) {
        this.name = name; // 效果英文名称
        this.power = power; // 效果的影响，可以是正数负数或者字符串
        this.id = `${name}-${power}`; // 效果id
        this.life = life; // 效果的生命周期
        this.targetType = 0; // 卡牌作用类型，即能够作用在哪一方的
        this.range = 0; // 作用范围，即单体还是全体
        this.paramStr = paramStr; // 效果影响的对象的参数引用字符串
    }

    /**
     * 效果发动时调用的函数
     */
    main() { // 执行效果的接口
        return;
    }

    /**
     * 绑定目标为作用对象，即设定该效果作用于哪个玩家对象的战斗参数列表
     * @param userId
     */
    addTarget(userId) {
        this.targets.push(userId);
    }
}