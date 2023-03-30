/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-16 14:53:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-29 16:24:30
 * @FilePath: \student-performance\src\model\Course.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

// 
const required = ["必修", "选修"]
const type = ["专业", "公共"]

const validator = {
    cno(cno) {
        return /^\d{10}$/g.test(cno)
    },
    name(name) {
        return /^[\u4e00-\u9fa5()a-zA-z]{1,50}$/.test(name)
    },
    credit(credit) {
        return (typeof credit === "number" && credit > 0)
    },
    required(char) {
        return (typeof char === "string" && required[+char])
    },
    type(char) {
        return (typeof char === "string" && type[+char])
    }
}

// 课程类，里面存储者课程相关信息
class Course extends Validator {
    constructor(option) {
        super(validator)
        this.id = option.id
        this.cno = option.cno
        this.name = option.name
        this.credit = +option.credit
        if (option.required) {
            this.required = option.required
        }
        if (option.type) {
            this.type = option.type
        }
    }

    static getRequired() {
        return required.concat()
    }

    static getType() {
        return type.concat()
    }
}

export default Course