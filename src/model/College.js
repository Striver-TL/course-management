/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 18:54:41
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-04 19:05:21
 * @FilePath: \student-performance-server\model\College.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Validator from "./Validator"

class College extends Validator {
    constructor(option) {
        super()
        this.college_code = option.college_code
        this.college_name = option.college_name
    }
}

export default College
