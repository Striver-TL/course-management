/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 18:12:35
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-06 15:33:54
 * @FilePath: \student-performance\src\model\Teacher.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * 用于创建教师类，教师类里存放教师信息
 * @author Striver-TL
 * 
 */
class Teacher {
    static gender = {
        "0": "男",
        "1": "女"
    }
    /**
     * 
     * @param { Object } option 选项对象，对象中存放着教师信息（键与数据库中键对应）
     */
    constructor(option) {
        this.tno = option.tno
        this.tname = option.tname
        this.gender = Teacher.gender[option.gender]
        this.birthday = option.birthday || null
        this.phone = option.phone || null
        this.email = option.email || null    
    }
}

export default Teacher
