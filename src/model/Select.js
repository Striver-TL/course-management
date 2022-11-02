/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 19:16:47
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 08:05:25
 * @FilePath: \student-performance-server\model\Select.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator"

const validator = {
    sno(sno) {
        return /^\d{10}$/g.test(sno)
    },
    aid(id) {
        return typeof id === "number" && id >= 0
    }
}

class Select extends Validator {
    constructor(option) {
        super(validator)
        this.sno = option.sno
        this.aid = option.aid 
    }
}

export default Select