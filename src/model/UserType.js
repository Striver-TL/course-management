/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 21:08:18
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-19 00:03:27
 * @FilePath: \student-performance\src\model\UserType.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
class UserType {
    // 管理员标识符
    static ADMIN = Symbol("admin_key");
    // 教师标识符
    static TEACHER = Symbol("teacher_key");
    // 学生标识符
    static STUDENT = Symbol("student_key");

    // 标识符与数据库用户类型映射
    static USER_TYPES = {
        "0": this.ADMIN,
        "1": this.TEACHER,
        "2": this.STUDENT
    }

}

export default UserType
