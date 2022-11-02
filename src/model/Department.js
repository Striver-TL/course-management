/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 18:57:42
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 08:05:35
 * @FilePath: \student-performance\src\model\Department.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const validator = {
    department_code(code) {
        return typeof code === "string" && /^\d{10}$/.test(code)
    },
    college_code(code) {
        return this.department_code(code)
    },
    department_name(name) {
        return /^[\u4e00-\u9fa5()a-zA-z]{1,50}$/.test(name)
    }
}

class Department extends Validator {
    constructor(option) {
        super(validator)
        this.department_code = option.department_code
        this.department_name = option.department_name
        this.college_code = option.college_code
    }
}

export default Department
