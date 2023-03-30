/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-02 08:16:03
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 22:50:44
 * @FilePath: \student-performance\src\model\Student.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator"
import { store } from "@/redux/store.js"

const validator = {
    sno(sno) {
        return /^\d{10}$/g.test(sno)
    },
    sname(name) {
        return /^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$|^[a-zA-Z0-9]+\s?[.·\-()a-zA-Z]*[a-zA-Z]+$/.test(name)
    },
    gender(char) {
        return !!(typeof char === "string" && (char === "0" || char === "1"))
    },
    gid(id) {
        return +id >= 0
    },
    birthday(format) {
        let date
        try {
            if ((/Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent))) {
                format = format.replace(/-/g, "/")
            }
            date = new Date(format)
        } catch (e) {
            return false
        }
        console.log(date.getTime())
        return !!date.getTime()
    },
    phone(phone) {
        return typeof phone === "string" && /^1[3-9]\d{9}$/g.test(phone)
    },
    email(email) {
        return typeof email === "string" && /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/g.test(email)
    },
    special_code(code) {
        return this.sno(code);
    },
    college_code(code) {
        return this.sno(code);
    }
}

class Student extends Validator {
    constructor(option) {
        super(validator)
        this.sno = option.sno
        this.sname = option.sname
        this.gender = option.gender
        this.gid = option.gid
        if (option.birthday) {
            const date = new Date(option.birthday)
            this.birthday = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        }
        option.phone && (this.phone = option.phone)
        option.email && (this.email = option.email)
        option.special_code && (this.special_code = option.special_code)
        option.college_code && (this.college_code = option.college_code)
    }
}

export default Student
