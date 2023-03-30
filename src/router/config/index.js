/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-05 17:59:08
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 16:28:01
 * @FilePath: \student-performance\src\router\config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import RoutePath from "@/model/RoutePath"
import UserType from "@/model/UserType"

/**
 * 这个配置定义了不同用户对应的引入页面的函数
 * 在路由跳转时会匹配到指定的函数作为异步加载页面的函数
 */
const config = {
    // 管理员配置
    [UserType.ADMIN]: {
        // 主页
        [RoutePath.HOME]: () => import("@/views/base"),
        // 教师管理
        [RoutePath.TEACHER_MANAGEMENT]: () => import("@/views/admin/data/teacher"),
        // 学生管理
        [RoutePath.STUDENT_MANAGEMENT]: () => import("@/views/admin/data/student"),
        // 教室管理
        [RoutePath.CLASSROOM_MANAGEMENT]: () => import("@/views/admin/data/classroom"),
        // 课程管理
        [RoutePath.COURSE_MANAGEMENT]: () => import("@/views/admin/data/course"),
        // 学院管理
        [RoutePath.COLLEGE_MANAGEMENT]: () => import("@/views/admin/data/college"),
        // 院系管理
        [RoutePath.DEPARTMENT_MANAGEMENT]: () => import("@/views/admin/data/department"),
        // 专业管理
        [RoutePath.SPECIAL_MANAGEMENT]: () => import("@/views/admin/data/special"),
        // 教学楼管理
        [RoutePath.BUILDING_MANAGEMENT]: () => import("@/views/admin/data/building"),
        // 选课管理
        [RoutePath.SELECT_MANAGEMENT]: () => import("@/views/admin/select"),
        // 用户管理
        [RoutePath.USER_MANAGEMENT]: () => import("@/views/admin/user"),
        // 课程实施管理
        [RoutePath.COURSE_ARRANGEMENT]: () => import("@/views/admin/arrangement")
    },
    [UserType.TEACHER]: {
        [RoutePath.HOME]: () => import("@/views/base"),
        [RoutePath.USER_INFOMATION]: () => import("@/views/teacher/info"),
        [RoutePath.RESULT_MANAGEMENT]: () => import("@/views/teacher/result")
    },
    [UserType.STUDENT]: {
        [RoutePath.HOME]: () => import("@/views/base"),
        [RoutePath.COURSE_SELECT]: () => import("@/views/student/select"),
        [RoutePath.USER_INFOMATION]: () => import("@/views/student/info"),
        [RoutePath.RESULT_QUERY]: () => import("@/views/student/result")
    }
}

export default config