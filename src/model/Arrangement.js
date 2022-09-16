
/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 18:35:21
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-05 10:29:24
 * @FilePath: \student-performance\src\model\Arragement.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator"

class Arrangement extends Validator {
    constructor(option) {
        super()
        this.cno = option.cno
        this.week_start = option.week_start
        this.week_end = option.week_end
        this.count_max = option.count_max
        option.count && (this.count = option.count)
        option.tno && (this.tno = option.tno)
    }
}

export default Arrangement
