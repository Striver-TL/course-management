/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-26 10:32:30
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-26 10:34:40
 * @FilePath: \student-performance\src\utils\createDate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const createDate = (format) => {
    let date
    try {
        if ((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
            format = format.replace(/-/g, "/")
        }
        date = new Date(format)
    } catch (e) {
        return null
    }
    return date
}

export default createDate