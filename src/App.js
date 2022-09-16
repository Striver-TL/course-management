/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 17:47:20
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-02 16:44:31
 * @FilePath: \student-performance\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Suspense, useState } from 'react'
import { Route, useLocation } from 'react-router'
import { Navigate } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { Spin } from 'antd'

import loadableComponent from './components/loadableComponent';

import { actionTypes, store } from './redux/store';
import './App.scss';

const pageComponent = {}
/**
 * 编程式路由组件，用于动态处理路由
 * @author Striver-TL
 * @returns {VNode} 虚拟DOM
 */
const RouteComponent = () => {
  // 获取路由location对象
  const location = useLocation()
  const [loading, setLoading] = useState(true)
  if (loading) {
    // 先判断是否已经登录
    // 导入有关请求登录的对象
    import("@/request/utils/login.js")
      // 成功导入模块就向后台发送获取登录用户信息的请求
      .then(module => module.default.getLoginUser())
      // 处理后台返回的数据
      .then(({ data }) => {
        // success为用户是否登录
        // result为登录的用户信息
        const { success, result } = data
        // 登录成功并且有用户信息则进行登录后的路由跳转
        // 否则加载登录页面
        if (success && result) {
          store.dispatch({
            type: actionTypes.LOGIN_USER,
            data: result
          })
        }
      }).finally(() => setLoading(false))
  }
  if (loading) return <Spin tip="页面加载中..." />
  // 根据分割url获取本次路由的pathname
  // 例：localhost:3000/home (获取到home)
  const pathname = location.pathname.split("/")[1] || "home"
  // 根据不同路径加载不同页面
  switch (pathname) {
    case "home":
      if (!store.getState().loginUser) return <Navigate to="/login" element={loadableComponent(() => import("@/pages/login"))} />
      !pageComponent[pathname] && (pageComponent[pathname] = React.lazy(() => import("@/pages/home")))
      break;
    case "login":
      !pageComponent[pathname] && (pageComponent[pathname] = React.lazy(() => import("@/pages/login")))
      break;
    default:
      !pageComponent[pathname] && (pageComponent[pathname] = React.lazy(() => import("@/pages/404")))
  }
  const Component = pageComponent[pathname]
  console.log("RouteComponent ", pathname)
  return <Suspense fallback={<Spin tip="页面加载中..." />}>
    <Component />
  </Suspense>
}

function App() {
  return (
    <div id="root">
      <Routes>
        <Route path="*" element={<RouteComponent />} />
      </Routes>
    </div>
  );
}

export default App;
