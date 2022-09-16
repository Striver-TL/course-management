/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-03 16:18:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 15:16:12
 * @FilePath: \student-performance\src\model\Classroom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator";

class Classroom extends Validator {
    constructor(option) {
        super()
        this.layer = +option.layer
        this.code = +option.code
        this.capacity = +option.capacity
        this.building_code = option.building_code
    }
}

export default Classroom