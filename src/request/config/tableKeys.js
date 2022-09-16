/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-31 16:31:52
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-04 19:38:48
 * @FilePath: \student-performance\src\request\config\tableKeys.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const tableKeys = {
    teacher: Symbol("teacher"),
    student: Symbol("student"),
    course: Symbol("course"),
    select: Symbol("select"),
    classroom: Symbol("classroom"),
    classplan: Symbol("classplan"),
    arrangement: Symbol("arrangement"),
    building: Symbol("building"),
    special: Symbol("special"),
    department: Symbol("department"),
    college: Symbol("college")
}

export default tableKeys

// 用于验证tableKeys中是否包含指定的key
export const isTableKeys = key => {
    // 遍历tableKeys判断是否存在与key全等的值
    for (let tableKey of Reflect.ownKeys(tableKeys)) {
        // 存在返回真
        if (key === tableKeys[tableKey]) return true
    }
    // 不存在返回假
    return false
}

// 用于获取tableKeys中指定值的键值对
export const tableValues = (() => {
    const tableValues = {}
    // 遍历tableKeys将key和value进行反转存储
    for (let tableKey of Reflect.ownKeys(tableKeys)) {
        tableValues[tableKeys[tableKey]] = tableKey
    }
    return tableValues
})()
