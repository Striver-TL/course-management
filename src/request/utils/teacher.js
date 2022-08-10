/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-01 16:05:03
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-04 11:45:09
 * @FilePath: \student-performance\src\request\utils\teacher.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from '../index'

class QueryTeacher {
    // 获取指定区间内教师数据
    static getTeacherData(start, end) {
        return axios(`/getTeacherData?start=${start}&end=${end}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default QueryTeacher
