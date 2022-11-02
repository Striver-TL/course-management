/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-16 18:31:07
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 08:05:43
 * @FilePath: \student-performance\src\model\js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const coursePlanKeys = {
    // 排课编号
    aid: "aid",
    // 教室编号
    cid: "cid",
    // 上课节
    section: "section",
    // 上课天
    day: "day"
}

// 上课小节数
// 索引与数据库中的值映射，数组元素为对该值的解释
const section = ["1-2", "3-4", "5-6", "7-8", "9-10", "1-4", "5-8"]
// 上课时间
// 索引与数据库中的值映射，数组元素为对该值的解释
const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

const validator = {
    aid(id) {
        return typeof id === "number" && id >= 0
    },
    cid(id) {
        return typeof id === "number" && id >= 0
    },
    section(char) {
        return typeof char === "string" && section[+char]
    },
    day(char) {
        return typeof char === "string" && week[+char]
    }
}

class CoursePlan extends Validator {
    static section = section
    static week = week

    /**
     * 
     * @param { Object } option 从数据库中获取到的课程安排数据对象
     */
    constructor(option) {
        super(validator)
        // 将传入的源数据保存到实例对象中
        for (let key in coursePlanKeys) {
            this[key] = option[coursePlanKeys[key]]
        }
    }
}

export default CoursePlan