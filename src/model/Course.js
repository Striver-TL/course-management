/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-16 14:53:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 16:52:18
 * @FilePath: \student-performance\src\model\Course.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "@/model/Validator"

// 
const required = ["必修", "选修"]
const type = ["专业", "公共"]

// 课程类，里面存储者课程相关信息
class Course extends Validator {
    constructor(option) {
        super()
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