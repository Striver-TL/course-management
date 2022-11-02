/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:47:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-10-26 08:42:54
 * @FilePath: \student-performance\src\router\routes.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Navigate, useLocation } from 'react-router'

import RoutePath from "@/model/RoutePath"
import { store } from '../redux/store'
import routerConfig from './config'
import loadableComponent from '../components/loadableComponent'

// 路由根组件
const RouteComponent = () => {
    // 从redux中获取登录的用户
    const loginUser = store.getState().loginUser
    // 获取location对象
    const location = useLocation()
    // 获取到二级pathname
    const pathname = location.pathname.split("/")[2] || ""
    // 获取到了登录的用户表明已经登录
    if (loginUser) {
        // 如果是默认的路径 重定向到主页
        if (pathname === "") return <Navigate to={`/home/${RoutePath.HOME}`} replace />
        // 获取到用户的所有函数
        const config = routerConfig[loginUser.type]
        // 如果存在指定pathname的函数，则返回异步加载组件，否则返回404页面
        return config[pathname] ? loadableComponent(config[pathname]) : (<Navigate to="/404" replace />)
    // 没有登录跳转到登录页面
    } else {
        return (<Navigate to="/login" replace />)
    }
}

export default RouteComponent
