/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-05 17:59:08
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 14:32:35
 * @FilePath: \student-performance\src\router\config\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import RoutePath from "../../model/RoutePath"
import UserType from "../../model/UserType"

const config = {
    [UserType.ADMIN]: {
        [RoutePath.HOME]: () => import("@/pages/home/index/index.jsx"),
        [RoutePath.TEACHER_MANAGEMENT]: () => import("@/pages/home/admin/teacher"),
        [RoutePath.STUDENT_MANAGEMENT]: () => import("@/pages/home/admin/student"),
        [RoutePath.CLASSROOM_MANAGEMENT]: () => import("@/pages/home/admin/classroom"),
        [RoutePath.COURSE_MANAGEMENT]: () => import("@/pages/home/admin/course"),
        [RoutePath.COLLEGE_MANAGEMENT]: () => import("@/pages/home/admin/college"),
        [RoutePath.DEPARTMENT_MANAGEMENT]: () => import("@/pages/home/admin/department"),
        [RoutePath.SPECIAL_MANAGEMENT]: () => import("@/pages/home/admin/special"),
        [RoutePath.BUILDING_MANAGEMENT]: () => import("@/pages/home/admin/building")
    },
    [UserType.TEACHER]: {
        [RoutePath.HOME]: () => import("@/pages/home/index/index"),
        [RoutePath.COURSE_MANAGEMENT]: () => import("@/pages/home/course/management"),
        [RoutePath.COURSE_MINE]: () => import("@/pages/home/course/mycourse"),
        [RoutePath.RESULT_MANAGEMENT]: () => import("@/pages/home/result/management")
    },
    [UserType.STUDENT]: {
        [RoutePath.HOME]: () => import("@/pages/home/index/index"),
        [RoutePath.COURSE_SELECT]: () => import("@/pages/home/course/select"),
        [RoutePath.COURSE_MINE]: () => import("@/pages/home/course/mycourse"),
        [RoutePath.RESULT_QUERY]: () => import("@/pages/home/result/query")
    }
}

export default config