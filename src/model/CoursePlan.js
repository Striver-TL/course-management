/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-22 14:19:01
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-29 17:34:49
 * @FilePath: \student-performance\src\model\CoursePlan.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const validator = {
    aid(aid) {
        return !!(typeof aid === "number" && aid >= 0)
    },
    cid(cid) {
        return this.aid(cid)
    },
    day(day) {
        return day >= 0 && day <= 6
    },
    start_section(number) {
        return !!(typeof number === "number" && number >= 1 && number <= 10)
    },
    end_section(number) {
        return this.start_section(number)
    }
}

class CoursePlan extends Validator {
    constructor({ aid, cid, day, start_section, end_section }) {
        super(validator)
        this.aid = +aid
        this.cid = +cid
        this.day = day.toString().replace(/^(?=\d$)/, "0")
        this.start_section = start_section
        this.end_section = end_section > start_section ? end_section : undefined
    }

    static week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
}

export default CoursePlan
