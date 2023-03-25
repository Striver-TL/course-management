/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-21 08:30:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-22 15:59:36
 * @FilePath: \student-performance\src\model\SelectCourse.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const validator = {
    aid(id) {
        return !!(typeof id === "number" && id >= 0)
    },
    sid(id) {
        return this.aid(id)
    },
    college_code(code) {
        return /^\d{10}$/g.test(code)
    },
    special_code(code) {
        return this.college_code(code)
    }
}

// 选课类（选课计划中的选课项）
class SelectCourse extends Validator {
    constructor({ aid, sid, college_code, special_code }) {
        super(validator)
        this.aid = aid
        this.sid = sid
        college_code && (this.college_code = college_code)
        special_code && (this.special_code = special_code)
    }

}

export default SelectCourse
