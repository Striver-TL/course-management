/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 16:47:33
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 01:09:57
 * @FilePath: \student-performance\src\router\routes\student.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Index from "../../pages/home/index/index"
import CourseSelect from "../../pages/home/course/select"
import MyHomework from "../../pages/home/homework/myhomework"
import RoutePath from "../../model/RoutePath"
import MyCourse from "../../pages/home/course/mycourse"
import ResultQuery from "../../pages/home/result/query"

const studentRoutes = [{
    // 主页
    path: RoutePath.HOME,
    element: <Index />
}, {
    // 在线选课
    path: RoutePath.COURSE_SELECT,
    element: <CourseSelect />
}, {
    // 我的课程
    path: RoutePath.COURSE_MINE,
    element: <MyCourse />
}, {
    // 我的作业
    path: RoutePath.HOMEWORK_MINE,
    element: <MyHomework />
}, {
    // 成绩查询
    path: RoutePath.RESULT_QUERY,
    element: <ResultQuery />
}]

export default studentRoutes