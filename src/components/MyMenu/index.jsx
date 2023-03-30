/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 21:03:47
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 12:06:13
 * @FilePath: \student-performance\src\components\MyMenu\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Menu } from 'antd'
import { ReconciliationOutlined, InsertRowAboveOutlined, DatabaseOutlined, BarChartOutlined, ScheduleOutlined, LoadingOutlined, HomeOutlined, SelectOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router'

import './index.scss'
import RoutePath from '../../model/RoutePath'
import { store } from "@/redux/store"
import { useState } from 'react'
/**
 * 用于生成菜单项数据对象
 * @param { String } key 菜单项的唯一key 
 * @param { String } label 菜单项的标记文字 
 * @param { Component } icon 图表组件  
 * @param { Array<Object> } children 子菜单 
 * @returns 
 */
function setItem(key, label, icon, children) {
  return { key, label, icon, children }
}

const menuItems = {
  [RoutePath.HOME]: setItem(RoutePath.HOME, "主页", <HomeOutlined />),
  [RoutePath.USER_MANAGEMENT]: setItem(RoutePath.USER_MANAGEMENT, "用户管理", <UserOutlined />),
  admin_management: setItem("admin_management", "数据管理", <DatabaseOutlined />, [
    setItem(RoutePath.TEACHER_MANAGEMENT, "教师管理"),
    setItem(RoutePath.STUDENT_MANAGEMENT, "学生管理"),
    setItem(RoutePath.CLASSROOM_MANAGEMENT, "教室管理"),
    setItem(RoutePath.COURSE_MANAGEMENT, "课程管理"),
    setItem(RoutePath.COLLEGE_MANAGEMENT, "学院管理"),
    setItem(RoutePath.DEPARTMENT_MANAGEMENT, "院系管理"),
    setItem(RoutePath.SPECIAL_MANAGEMENT, "专业管理"),
    setItem(RoutePath.BUILDING_MANAGEMENT, "教学楼管理")
  ]),
  [RoutePath.SELECT_MANAGEMENT]: setItem(RoutePath.SELECT_MANAGEMENT, "选课管理", <SelectOutlined />),
  [RoutePath.COURSE_ARRANGEMENT]: setItem(RoutePath.COURSE_ARRANGEMENT, "课程安排", <InsertRowAboveOutlined />),
  [RoutePath.COURSE_SELECT]: setItem(RoutePath.COURSE_SELECT, "在线选课", <SelectOutlined />),
  [RoutePath.USER_INFOMATION]: setItem(RoutePath.USER_INFOMATION, "我的信息", <ReconciliationOutlined />),
  [RoutePath.RESULT_MANAGEMENT]: setItem(RoutePath.RESULT_MANAGEMENT, "成绩管理", <ScheduleOutlined />),
  [RoutePath.RESULT_QUERY]: setItem(RoutePath.RESULT_QUERY, "成绩查询", <BarChartOutlined />)
}

// 默认选择的菜单选项
const selectArr = []
let items = []
let itemUser = null

export default function MyMenu() {
  // 这里获取当前显示的路由路径
  const selectedKeys = useLocation().pathname.split("/").splice(-1, 1)
  // 获取路由跳转函数
  const navigate = useNavigate()
  // state
  const userType = store.getState().loginUser.type
  const [loading, setLoading] = useState(true)
  // 如果现在登录的用户发生了变化则重新加载菜单
  itemUser !== userType && (!loading ? !setLoading(true) : true) && import("@/router/config").then(routes => {
    return routes.default[userType]
  }).then(routes => {
    // 清空之前的数据
    items.splice(0, items.length)
    // 根据路由筛选菜单选项
    Object.keys(menuItems).forEach(path => {
      // 如果路由路径配置中有该配置
      // 从路由函数中找到对应的函数添加到items中
      if (RoutePath.hasKey(path)) {
        Object.keys(routes).forEach(routePath => {
          routePath === path && items.push(menuItems[path])
        })
        // 如果没有该配置则可能是二级菜单
      } else {
        const item = menuItems[path]
        const children = item.children
        const routeKeys = Reflect.ownKeys(routes)
        const result = children.filter(
          ({ key }) => routeKeys.indexOf(key) !== -1
        )
        result.length && items.push(setItem(item.key, item.label, item.icon, result))
      }
    })
    setLoading(false)
    itemUser = userType
  })

  return (
    !loading ?
      <Menu
        className="menu"
        selectedKeys={selectedKeys}
        theme="light"
        mode="inline"
        items={items.concat()}
        onSelect={item => {
          navigate(`/home/${item.key}`)
        }}
        defaultSelectedKeys={selectArr}
      />
      : (<div className="menu-loading">
        <LoadingOutlined className="menu-icon" />
      </div>)
  )
}
