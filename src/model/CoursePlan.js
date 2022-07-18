/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-16 18:31:07
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-18 11:45:01
 * @FilePath: \student-performance\src\model\js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const coursePlanKeys = {
    // 排课编号
    aid: "aid",
    // 课程编号
    cno: "cno",
    // 课程名字
    cname: "cname",
    // 教师编号
    tno: "tno",
    // 教师名字
    tname: "tname",
    // 课程起始周
    weekStart: "week_start",
    // 课程结束周,
    weekEnd: "week_end",
    // 课程安排
    plan: "plan",
    // 已选人数
    count: "count",
    // 最大人数
    maxCount: "count_max"
}

// 上课小节数
// 索引与数据库中的值映射，数组元素为对该值的解释
const section = ["1-2", "3-4", "5-6", "7-8", "9-10", "1-4", "5-8"]
// 上课时间
// 索引与数据库中的值映射，数组元素为对该值的解释
const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

class CoursePlan {
    static section = section
    static week = week

    /**
     * 
     * @param { Object } option 从数据库中获取到的课程安排数据对象
     */
    constructor(option) {
        // 将传入的源数据保存到实例对象中
        for (let key in coursePlanKeys) {
            const data = option[coursePlanKeys[key]]
            if (data) this[key] = data
        }
        const type = Object.prototype.toString.call(this.plan)
        if (type === "[object Array]") {
            this.plan = this.plan.map(item => {
                const obj = {}
                Object.assign(obj, item)
                obj.day = week[item.day]
                obj.section = section[item.section]
                return obj
            })
        }
    }
}

export default CoursePlan