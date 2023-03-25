/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 18:12:35
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-22 15:58:39
 * @FilePath: \student-performance\src\model\Teacher.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator"
import { store } from "@/redux/store.js"

const validator = {
    tno(tno) {
        return typeof tno === "string" && /^\d{10}$/.test(tno)
    },
    tname(name) {
        return !!(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/.test(name) || /^[\u4E00-\u9FA5]{2,20}$/.test(name))
    },
    gender(char) {
        return !!(typeof char === "string" && (char === "0" || char === "1"))
    },
    birthday(format) {
        let date
        try {
            if((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
                format = format.replace(/-/g, "/")
            }
            date = new Date(format)
        } catch(e) {
            return false
        }
        return !!date.getTime()
    },
    phone(phone) {
        return typeof phone === "string" && /^1[3-9]\d{9}$/g.test(phone)
    },
    email(email) {
        return typeof email === "string" && /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g.test(email)
    },
    department_code(code) {
        const departments = store.getState().departmentNames[this.college_code]
        return !!(departments && Reflect.ownKeys(departments).indexOf(code) !== -1)
    },
    college_code(code) {
        const colleges = store.getState().collegeNames
        return Reflect.ownKeys(colleges).indexOf(code) !== -1
    }
}

/**
 * 用于创建教师类，教师类里存放教师信息
 * @author Striver-TL
 *
 */
class Teacher extends Validator {
    /**
     * 
     * @param { Object } option 选项对象，对象中存放着教师信息（键与数据库中键对应）
     */
    constructor(option) {
        super(validator)
        this.tno = option.tno
        this.tname = option.tname
        this.gender = option.gender
        if (option.birthday) {
            const date = new Date(option.birthday)
            this.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
        if (option.phone) this.phone = option.phone
        if (option.email) this.email = option.email
        if (option.college_code) this.college_code = option.college_code
        if (option.department_code) this.department_code = option.department_code
    }
}

export default Teacher