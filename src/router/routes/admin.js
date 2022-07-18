/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:16:28
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 01:08:53
 * @FilePath: \student-performance\src\router\routes\admin.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import RoutePath from '../../model/RoutePath'
import Home from "../../pages/home/index/index"
import TeacherManagement from '../../pages/home/admin/teacher'
import StudentManagement from '../../pages/home/admin/student'
import ClassroomManagement from '../../pages/home/admin/classroom'
import CourseManagement from '../../pages/home/admin/course'

const adminRoutes =  [{
    // 管理员主页
    path: RoutePath.HOME,
    element: <Home />
}, {
    // 教师管理
    path: RoutePath.TEACHER_MANAGEMENT,
    element: <TeacherManagement />
}, {
    // 学生管理
    path: RoutePath.STUDENT_MANAGEMENT,
    element: <StudentManagement />
}, {
    // 教室管理
    path: RoutePath.CLASSROOM_MANAGEMENT,
    element: <ClassroomManagement />
}, {
    // 课程管理
    path: RoutePath.COURSE_MANAGEMENT,
    element: <CourseManagement />
}]

export default adminRoutes
