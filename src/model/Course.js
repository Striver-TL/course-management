/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-16 14:53:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-01 15:04:07
 * @FilePath: \student-performance\src\model\Course.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "@/model/Validator"

// 课程的字段名（与数据库对应）
const courseKeys = {
    cno: "cno",      // 课程号
    cname: "cname",     // 课程名
    credit: "credit",   // 学分
    required: "required", // 是否必修
    type: "type"      // 课程类型（专业/公共）
}

// 
const required = ["必修", "选修"]
const type = ["专业", "公共"]

// 课程类，里面存储者课程相关信息
class Course extends Validator {
    static required = required
    static type = type
    constructor(option) {
        super()
        for (let key in courseKeys) this[key] = option[courseKeys[key]]
        this.required = required[this.required]
        this.type = type[this.type]
    }
}

export default Course