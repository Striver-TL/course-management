/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-03 16:18:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-25 10:02:12
 * @FilePath: \student-performance\src\model\Classroom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const validator = {
    layer(layer) {
        return layer > 0
    },
    bid(bid) {
        return this.layer(bid)
    },
    code(code) {
        return code > 0
    },
    capacity(num) {
        return num > 0
    }
}

class Classroom extends Validator {
    constructor(option) {
        super(validator)
        this.layer = +option.layer
        this.code = +option.code
        this.bid = +option.bid
        this.capacity = +option.capacity
    }
}

export default Classroom