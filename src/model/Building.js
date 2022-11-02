/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 19:16:47
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 08:06:14
 * @FilePath: \student-performance-server\model\Building.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

const validator = {
    building_code(code) {
        return /^\d{10}$/g.test(code)
    },
    building_name(name) {
        return /^[\u4e00-\u9fa5()a-zA-z]{1,50}$/.test(name)
    }
}

class Building extends Validator {
    constructor(option) {
        super(validator)
        this.building_code = option.building_code
        this.building_name = option.building_name
    }
}

export default Building
