/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-16 15:52:57
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-01 14:39:23
 * @FilePath: \student-performance\src\request\utils\queryTable.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from '../index'
import tableKeys from '../config/tableKeys'

// 数据库表名键值对：键->表名
const tableTypes = {
    // 教师表
    [tableKeys.TABLE_TEACHER]: "teachers",
    // 学生表
    [tableKeys.TABLE_STUDENT]: "students",
    // 课程表
    [tableKeys.TABLE_COURSE]: "courses",
    // 选课表
    [tableKeys.TABLE_SELECT]: "selects",
    // 教室表
    [tableKeys.TABLE_CLASSROOM]: "classrooms",
    // 教室安排表
    [tableKeys.TABLE_CLASSPLAN]: "classplans",
    // 课程实施表
    [tableKeys.TABLE_ARRANGEMENT]: "arrangements",
    // 教学楼表
    [tableKeys.TABLE_BUILDING]: "buildings",
    // 专业表
    [tableKeys.TABLE_SPECIAL]: "specials",
    // 院系表
    [tableKeys.TABLE_DEPARTMENT]: "departments",
    // 学院表
    [tableKeys.TABLE_COLLEGE]: "colleges",
    // 选课计划表
    [tableKeys.TABLE_SELECTPLAN]: "selectplans",
    // 选课课程表
    [tableKeys.TABLE_SELECTCOURSE]: "selectcourses",
    // 用户表
    [tableKeys.TABLE_USER]: "users"
}

class QueryTable {
    /**
     * @param { Symbol } tableKey 表的密钥 
     */
    constructor(tableKey) {
        if (!tableTypes[tableKey]) throw new Error("QueryTable: 找不到指定的'tableKey'")
        this.table = tableKey
    }

    static tableKeys = tableKeys

    options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }

    /**
     * 用于向后台获取表信息
     * @param { Object } option 
     * @returns { Promise } 用于处理查询结果的Promise对象
     */
    getData(option) {
        if (!tableTypes[this.table]) throw new Error("QueryTable: 找不到指定的'tableKey'")
        option = {
            ...option,
            table: tableTypes[this.table]
        }
        return axios(`/getTableData?${this.toQueryParam(option)}`, this.options)
    }

    /**
     * 用于向后台获取信息数量
     * @param { Object } option 
     * @returns { Promise } 用于处理查询结果的Promise对象
     */
    getCount(option) {
        if (!tableTypes[this.table]) throw new Error("QueryTable: 找不到指定的'tableKey'")
        option = {
            ...option,
            table: tableTypes[this.table]
        }
        return axios(`/getTableCount?${this.toQueryParam(option)}`, this.options)
    }

    /**
     * 用于向后台添加数据
     * @param { Object } data 数据对象 
     */
    insertData(data) {
        if (!tableTypes[this.table]) throw new Error("QueryTable: 找不到指定的'tableKey'")
        return axios(`/insertTableData?table=${tableTypes[this.table]}`, {
            data,
            ...this.options
        })
    }

    /**
     * 用于发送删除表信息的请求
     * @param { Object } option
     * @returns { Promise } 用于处理删除结果的Promise对象
     */
    deleteData(option) {
        if (!tableTypes[this.table]) throw new Error("QueryTable: 找不到指定的'tableKey'")
        option = {
            ...option,
            table: tableTypes[this.table]
        }
        return axios(`/deleteTableData?${this.toQueryParam(option)}`, this.options)
    }

    /**
     * 用于发送更新表信息的请求
     * @param { Object } option
     * @param { Object } data 
     * @returns { Promise } 用于处理更新结果的Promise对象
     */
    updateData(option, data) {
        if (!tableTypes[this.table]) throw new Error("QueryTable: 找不到指定的'tableKey'")
        option = {
            ...option,
            table: tableTypes[this.table]
        }
        return axios(`/updateTableData?${this.toQueryParam(option)}`, {
            data,
            ...this.options
        })
    }

    /**
     * 将对象形式的数据转为query参数字符串
     * @param { Object } object 被转换对象
     * @returns { String } 转换后的query参数字符串
     */
    toQueryParam(object) {
        return Reflect.ownKeys(object).map(key => {
            const item = object[key]
            if (typeof item === "object" && item !== null) return `${key}=${JSON.stringify(object[key])}`
            else return `${key}=${object[key]}`
        }).join("&")
    }
}

export default QueryTable

export const tableType = tableTypes
