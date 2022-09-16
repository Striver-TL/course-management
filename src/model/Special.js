/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 19:09:11
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-04 19:14:47
 * @FilePath: \student-performance\src\model\Special.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator";

class Special extends Validator {
    constructor(option) {
        super()
        this.special_code = option.special_code
        this.special_name = option.special_name
        this.department_code = option.department_code
    }
}

export default Special
