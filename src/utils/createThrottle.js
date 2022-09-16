/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-23 14:26:00
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-03 14:20:43
 * @FilePath: \student-performance\src\utils\createThrottle.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 作用是创建一个限流函数（在一定时间内只能执行一次原函数）
 * @param { Function } callback 原函数
 * @param { Number } time 限流时长 
 * @param { Object } context 原函数this指向 
 * @param { Function } finish 限流结束时执行的函数
 * @returns { Function } 对原函数进行限流的函数
 */
const createThrottle = (callback, time, context, finish) => {
    // 验证参数合法性
    if (typeof callback !== "function") throw new Error("createAnishake: 'callback'参数必须接收一个函数类型的实参")
    if (typeof time !== "number" && time >= 0) throw new Error("createAnishake: 'time'参数必须接收一个数字类型且不小于0的实参")
    // 修改this指向
    if (typeof context === "object") callback = callback.bind(context)
    let timer = null
    return (...args) => {
        // 如果距离上一次执行时间还没到就返回
        if (timer) return
        callback(...args)
        // 延迟执行
        timer = setTimeout(() => {
            timer = null
            typeof finish === "function" && finish()
        }, time)
    }
}

export default createThrottle