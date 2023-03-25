/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-23 11:25:09
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-23 14:25:34
 * @FilePath: \student-performance\src\utils\createAntishake.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/**
 * 创建一个用于执行防抖的函数（在指定时间内重复执行返回的函数，只会执行最后一次触发）
 * @param { Function } callback 原函数
 * @param { Number } time 函数执行间隔 
 * @param { Object } context 函数的this指向 
 * @returns { Function } 用于执行防抖的函数
 */
const createAnishake = (callback, time, context) => {
    // 验证参数合法性
    if (typeof callback !== "function") throw new Error("createAnishake: 'callback'参数必须接收一个函数类型的实参")
    if (typeof time !== "number" && time >= 0) throw new Error("createAnishake: 'time'参数必须接收一个数字类型且不小于0的实参")
    // 修改this指向
    if (typeof context === "object") callback = callback.bind(context)
    let timer = null
    // 会产生闭包
    return (...args) => {
        // 清除还没触发的定时器
        clearTimeout(timer)
        // 创建新的定时器重新计时
        timer = setTimeout(callback, time, ...args)
    } 
}

export default createAnishake