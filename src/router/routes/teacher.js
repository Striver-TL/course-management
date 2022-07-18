/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 22:49:41
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 00:33:53
 * @FilePath: \student-performance\src\router\routes\teacher.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import RoutePath from '../../model/RoutePath'
import Home from '../../pages/home/index/index'
import CourseManagement from '../../pages/home/course/management'
import HomeworkManagement from '../../pages/home/homework/management'
import ResultManagement from '../../pages/home/result/management'

const teacherRoutes = [
    // 主页
    {
        path: RoutePath.HOME,
        element: <Home />
    },
    // 课程管理
    {
        path: RoutePath.COURSE_MANAGEMENT,
        element: <CourseManagement />
    },
    // 作业管理
    {
        path: RoutePath.HOMEWORK_MANAGEMENT,
        element: <HomeworkManagement />
    },
    // 成绩管理
    {
        path: RoutePath.RESULT_MANAGEMENT,
        element: <ResultManagement />
    }
]

export default teacherRoutes