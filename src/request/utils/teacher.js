/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-01 16:05:03
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-11 18:38:12
 * @FilePath: \student-performance\src\request\utils\teacher.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from '../index'

class QueryTeacher {
    /**
     * 用于向后台获取指定位置区间内的教师数据
     * @param { Number } start 起始位置 
     * @param { Number } end 结束位置 
     * @returns { Promise } 用于处理查询结果的Promise对象
     */
    static getTeacherData(start, end) {
        return axios(`/getTeacherData?start=${start}&end=${end}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
    /**
     * 用于向后台添加教师数据
     * @param { Teacher } teacher teacher实例对象 
     */
    static insertTeacher(teacher) {
        let params = []
        Reflect.ownKeys(teacher).forEach(key => teacher[key] !== undefined && params.push(`${key}=${teacher[key]}`))
        return axios(`/insertTeacher?${params.join("&")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static deleteTeacher(tno) {
        return axios(`/deleteTeacher?tno=${tno}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static updateTeacher(teacher) {
        let params = []
        Reflect.ownKeys(teacher).forEach(key => params.push(`${key}=${teacher[key]}`))
        return axios(`/updateTeacher?${params.join("&")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}

export default QueryTeacher
