/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 18:54:41
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 08:06:00
 * @FilePath: \student-performance-server\model\College.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const validator = {
    college_code(code) {
        return /^\d{10}$/g.test(code)
    },
    college_name(name) {
        return /^[\u4e00-\u9fa5()a-zA-z]{1,50}$/.test(name)
    }
}

class College extends Validator {
    constructor(option) {
        super(validator)
        this.college_code = option.college_code
        this.college_name = option.college_name
    }
}

export default College
