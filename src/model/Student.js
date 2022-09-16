/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-02 08:16:03
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-05 13:56:39
 * @FilePath: \student-performance\src\model\Student.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Validator from "./Validator"

class Student extends Validator {
    static gender = {
        "0": "女",
        "1": "男"
    }

    constructor(option) {
        super()
        this.sno = option.sno
        this.sname = option.sname
        this.gender = option.gender
        this.genderLabel = Student.gender[option.gender]
        option.birthday && (this.birthday = option.birthday)
        option.phone && (this.phone = option.phone)
        option.email && (this.email = option.email)
        option.special_code && (this.special_code = option.special_code)
        option.collage_code && (this.collage_code = option.collage_code)
    }
}

export default Student
