/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-21 08:30:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-29 16:54:03
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
    cid(id) {
        return !id || this.aid(id)
    },
    pid(id) {
        return !id || this.aid(id)
    }
}

// 选课类（选课计划中的选课项）
class SelectCourse extends Validator {
    constructor({ aid, sid, cid, pid }) {
        super(validator)
        this.aid = aid
        this.sid = sid
        cid && (this.cid = cid)
        pid && (this.pid = pid)
    }

}

export default SelectCourse
