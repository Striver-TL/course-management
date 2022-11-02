/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-11 15:56:54
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 08:18:02
 * @FilePath: \student-performance\src\model\RoutePath.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 22:05:48
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-14 17:58:34
 * @FilePath: \student-performance\src\model\MenuItemType.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default class MenuItemKey {
    // 主页
    static HOME = "index";
    // 学生管理
    static STUDENT_MANAGEMENT = "stu_management";
    // 教师管理
    static TEACHER_MANAGEMENT = "teacher_management";
    // 课程管理
    static COURSE_MANAGEMENT = "course_management";
    // 成绩管理 
    static RESULT_MANAGEMENT = "result_management";
    // 成绩查询
    static RESULT_QUERY = "result_query"
    // 作业管理
    static HOMEWORK_MANAGEMENT = "homework_management"
    // 我的作业
    static HOMEWORK_MINE = "homework_mine"
    // 我的课程
    static COURSE_MINE = "course_mine"
    // 教室管理
    static CLASSROOM_MANAGEMENT = "classroom_management"
    // 在线选课
    static COURSE_SELECT = "course_select"
    // 学院管理
    static COLLEGE_MANAGEMENT = "college_management"
    // 院系管理
    static DEPARTMENT_MANAGEMENT = "department_management"
    // 专业管理
    static SPECIAL_MANAGEMENT = "special_management"
    // 教学楼管理
    static BUILDING_MANAGEMENT = "building_management"
    // 选课管理
    static SELECT_MANAGEMENT = "select_management"
    // 用户管理
    static USER_MANAGEMENT = "user_management"

    // 
    static COURSE_ARRANGEMENT = "course_arrangement"

    static hasKey(key) {
        return Object.getOwnPropertyNames(MenuItemKey).map(name => MenuItemKey[name]).indexOf(key) !== -1;
    }
}