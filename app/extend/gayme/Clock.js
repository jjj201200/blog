/**
 * Author: Ruo
 * Create: 2018-03-28
 * Description: 时钟对象 - 时间轮
 * 我们只用得到秒级别的时间轮，所以暂时不考虑其他情况
 */
/**
 * 属性
 * 时间轴 {array<array>} 长度为60*n - 存储所有定时任务的列表，以执行时候的秒数为键名
 * 周期 {number} - 毫秒，指定每多少时间检查一次时间轴
 */
/**
 * 方法
 * 注册定时任务 [second, callback]
 * 注销定时任务 [second, index]
 * 检查时间轮秒轴
 */

class Clock {
    constructor () {
        this.length = 60;
        this.s = [];
        this.t = 1000;
    }

    /**
     * 注册定时任务
     */
    register() {

    }

    /**
     * 注销定时任务
     */
    unRegister() {

    }

    /**
     * 启动时钟
     */
    start() {

    }

    /**
     * 暂停时钟
     */
    pause() {

    }

    /**
     * 停止时钟
     */
    stop() {

    }

    /**
     * 检查当前秒数是否有定时任务需要执行
     */
    check() {

    }

    /**
     * 执行定时任务队列
     */
    do() {

    }
}