/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-19 17:12:58
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-18 18:42:58
 * @FilePath: \student-performance-server\utils\validator.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const type = {
    number: "[object Number]",
    string: "[object String]",
    date: "[object Date]"
}

const toString = Object.prototype.toString

const validator = {
    // 验证学号
    sno(sno) {
        return toString.call(sno) === type.string && /^\d{10}$/.test(sno)
    },
    // 验证教工号
    tno(tno) {
        return this.sno(tno)
    },
    // 验证课程号
    cno(cno) {
        return this.sno(cno)
    },
    // 专业代码
    special_code(code) {
        return this.sno(code)
    },
    // 学院代码
    college_code(code) {
        return this.sno(code)
    },
    // 系代码
    department_code(code) {
        return this.sno(code)
    },
    // 建筑代码
    building_code(code) {
        return this.sno(code)
    },
    classroom_code(code) {
        return this.sno(code)
    },
    // 系名字
    department_name(name) {
        return toString.call(name) === type.string && /^[\u4e00-\u9fa5()a-zA-z]{1,50}$/.test(name)
    },
    // 教学楼名字
    building_name(name) {
        return this.department_name(name);
    },
    // 专业名字
    special_name(name) {
        return this.department_name(name)
    },
    college_name(name) {
        return this.department_name(name)
    },
    // 验证姓名
    name(cname) {
        return this.department_name(cname)
    },
    // 验证姓名
    tname(cname) {
        return toString.call(cname) === type.string && /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z.\s]{1,20})$/g.test(cname)
    },
    sname(sname) {
        return this.tname(sname)
    },
    // 验证年龄
    age(age) {
        return toString.call(age) === type.number && age > 0 && age < 180
    },
    // 验证学分
    credit(credit) {
        return toString.call(credit) === type.number && credit > 0
    },
    // 验证性别
    gender(gender) {
        return toString.call(gender) === type.string && (gender === "0" || gender === "1")
    },
    // 验证性别标识
    genderLabel(label) {
        return toString.call(label) === type.string
    },
    // 验证手机号
    phone(phone) {
        return toString.call(phone) === type.string && /^1[3456789]\d{9}$/g.test(phone)
    },
    // 验证邮箱
    email(email) {
        return toString.call(email) === type.string && /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g.test(email)
    },
    // 验证生日
    birthday(format) {
        const now = new Date()
        let date = null
        let nowFormat = `${now.getFullYear() - 150}-${now.getMonth() + 1}-${now.getDate()}`
        try {
            if((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
                format = format.replace(/-/g, "/")
                nowFormat = nowFormat.replace(/-/g, "/")
            }
            date = new Date(format)
        } catch(e) {
            return false
        }

        return toString.call(date) === type.date && date.getTime() < now.getTime() && new Date(nowFormat) < date.getTime()
    },
    // 验证课程性质
    required(required) {
        return toString.call(required) === type.string && ["0", "1"].includes(required)
    },
    // 验证课程类别
    type(t) {
        return toString.call(t) === type.string && ["0", "1", "2", "3"].includes(t) 
    },
    // 是否删除
    is_delete(is_delete) {
        return toString.call(is_delete) === type.string && ["0", "1"].includes(is_delete)
    },
    // 人数
    count(count) {
        return toString.call(count) === type.number && count > 0
    },
    // 教室号
    code(code) {
        return this.count(code)
    },
    // 教室楼层
    layer(layer) {
        return this.count(layer)
    },
    // 最大人数
    count_max(count) {
        return this.count(count)
    },
    week_start(num) {
        return this.count(num)
    },
    week_end(num) {
        return this.week_end(num)
    },
    // 教室容纳人数
    capacity(capacity) {
        return toString.call(capacity) === type.number && capacity > 0
    },
    pid(pid) {
        return this.count(pid)
    },
    aid(aid) {
        return this.aid(aid)
    },
    section(section) {
        return toString.call(section) === type.string && /^(1-2|3-4|1-4|5-6|7-8|5-8|9-10)$/g.test(section)
    },
    day(day) {
        return toString.call(day) === type.number && day >= 0 && day < 7
    },
    max_count(count) {
        return this.count(count)
    } 
}

export default validator