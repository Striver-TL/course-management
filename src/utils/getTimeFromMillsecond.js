/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-01 15:18:06
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-01 15:38:15
 * @FilePath: \student-performance-server\sql\utils\getDateString.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const getDateFromMillsecond = millisecond =>{
    let date = new Date(millisecond)
    let reg = /^(?=\d$)/g
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().replace(reg, "0")}-${date.getDate().toString().replace(reg, "0")} ${date.getHours().toString().replace(reg, "0")}:${date.getMinutes().toString().replace(reg, "0")}:${date.getSeconds().toString().replace(reg, "0")}`
}

export default getDateFromMillsecond
