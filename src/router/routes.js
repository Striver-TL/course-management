/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:47:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-05 18:57:56
 * @FilePath: \student-performance\src\router\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router'

import RoutePath from "@/model/RoutePath"
import UserType from '../model/UserType'
import store from '../redux/store'
import routerConfig from './config'
import loadableComponent from '../components/loadableComponent'

const RouteComponent = () => {
    const loginUser = store.loginUser.getState()
    const location = useLocation()
    const pathname = location.pathname.split("/")[2] || ""
    if (loginUser) {
        if (pathname === "") return <Navigate to={`/home/${RoutePath.HOME}`} replace />
        const config = routerConfig[UserType.USER_TYPES[loginUser.type]]
        return config[pathname] ? loadableComponent(config[pathname]) : (<Navigate to="/404" replace />)
    } else {
        return (<Navigate to="/login" replace />)
    }
}

export default RouteComponent
