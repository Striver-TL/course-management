/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 18:35:21
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-23 10:45:02
 * @FilePath: \student-performance\src\model\Arrangement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 18:35:21
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-21 17:34:04
 * @FilePath: \student-performance\src\model\Arragement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator"

const validator = {
    cid(cid) {
        return this.week_start(cid)
    },
    week_start(start) {
        return typeof start === "number" && start > 0
    },
    week_end(end) {
        return this.week_start(end)
    },
    count_max(count) {
        return this.week_start(count)
    },
    count(count) {
        return this.week_start(count) || count === 0
    },
    tno(tno) {
        return this.cno(tno)
    }
}

class Arrangement extends Validator {
    constructor(option) {
        super(validator)
        this.cid = +option.cid
        this.week_start = +option.week_start
        this.week_end = +option.week_end
        this.count_max = +option.count_max
        option.count && (this.count = +option.count)
        option.tid && (this.tid = option.tid)
    }
}

export default Arrangement
