/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 21:03:47
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 01:08:04
 * @FilePath: \student-performance\src\components\MyMenu\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Menu } from 'antd'
import { UserOutlined, ReconciliationOutlined, BankOutlined, BarChartOutlined, FormOutlined, ScheduleOutlined, HomeOutlined, EditOutlined, SelectOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'

import RoutePath from '../../model/RoutePath'
import routes from '../../router/routes'

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
  [RoutePath.TEACHER_MANAGEMENT]: setItem(RoutePath.TEACHER_MANAGEMENT, "教师管理", <UserOutlined />),
  [RoutePath.STUDENT_MANAGEMENT]: setItem(RoutePath.STUDENT_MANAGEMENT, "学生管理", <UserOutlined />),
  [RoutePath.CLASSROOM_MANAGEMENT]: setItem(RoutePath.CLASSROOM_MANAGEMENT, "教室管理", <BankOutlined />),
  [RoutePath.COURSE_MANAGEMENT]: setItem(RoutePath.COURSE_MANAGEMENT, "课程管理", <ReconciliationOutlined />),
  [RoutePath.COURSE_SELECT]: setItem(RoutePath.COURSE_SELECT, "在线选课", <SelectOutlined />),
  [RoutePath.COURSE_MINE]: setItem(RoutePath.COURSE_MINE, "我的课程", <ReconciliationOutlined />),
  [RoutePath.HOMEWORK_MANAGEMENT]: setItem(RoutePath.HOMEWORK_MANAGEMENT, "作业管理", <FormOutlined />),
  [RoutePath.HOMEWORK_MINE]: setItem(RoutePath.HOMEWORK_MINE, "我的作业", <EditOutlined />),
  [RoutePath.RESULT_MANAGEMENT]: setItem(RoutePath.RESULT_MANAGEMENT, "成绩管理", <ScheduleOutlined />),
  [RoutePath.RESULT_QUERY]: setItem(RoutePath.RESULT_QUERY, "成绩查询", <BarChartOutlined />)
}

// 默认选择的菜单选项
const selectArr = []

export default function MyMenu() {

  // 获取路由跳转函数
  const navigate = useNavigate()
  // state
  const items = []

  // 根据路由筛选菜单选项
  Object.keys(menuItems).forEach(path => {
    routes().forEach(route => {
      if (route.path === path) items.push(menuItems[path])
    })
  })

  // 选择菜单某一项触发
  const onSelect = data => {
    // 跳转到指定页面
    navigate(data.key)
  }

  return (
    <Menu theme="light" mode="inline" items={items} style={{
      height: "100%",
      overflowY: "auto",
      overflowX: "hidden"
    }} onSelect={onSelect} defaultSelectedKeys={selectArr}></Menu>
  )
}
