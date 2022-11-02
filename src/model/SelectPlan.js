/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-21 08:36:17
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-28 14:57:10
 * @FilePath: \student-performance\src\model\SelectPlan.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
*/
import createDate from "../utils/createDate"
import Validator from "./Validator"

const validator = {
    start_time(format) {
        let date = createDate(format)
        return !!date
    },
    end_time(format) {
        let date = createDate(format)
        return !!date
    },
    name(name) {
        return /^[\u4e00-\u9fa5()\w-]{1,50}$/.test(name)
    }
}

class SelectPlan extends Validator {
    constructor({name, start_time, end_time}) {
        super(validator)
        this.name = name
        start_time && (this.start_time = start_time)
        end_time && (this.end_time = end_time)
    }
}

export default SelectPlan
