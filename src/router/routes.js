/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:47:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 01:07:34
 * @FilePath: \student-performance\src\router\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import RoutePath from "../model/RoutePath"
import { Navigate } from "react-router-dom"
import UserType from '../model/UserType'
import adminRoutes from "./routes/admin"
import teacherRoutes from "./routes/teacher"
import studentRoutes from "./routes/student"

import store from '../redux/store'

const routes = () => {
    const userType = store.userType.getState()
    let userRoutes;
    switch (userType) {
        case UserType.ADMIN:
            userRoutes = adminRoutes
            break;
        case UserType.TEACHER:
            userRoutes = teacherRoutes
            break;
        case UserType.STUDENT:
            userRoutes = studentRoutes
            break;
        default:
            userRoutes = []
    }

    return [
        {
            path: "",
            element: <Navigate to={`/home/${RoutePath.HOME}`} />
        },
        ...userRoutes,
        {
            path: "*",
            element: <Navigate to="/404" />
        }
    ]

}
export default routes
