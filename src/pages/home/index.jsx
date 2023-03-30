/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:44:06
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 21:57:46
 * @FilePath: \student-performance\src\pages\home\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import { Layout, Row, Col, Avatar, Dropdown, Space, Menu, Modal, Alert, Drawer } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import MyMenu from '@/components/MyMenu'
import RouteComponent from "@/router/routes"
import './index.scss'
import browerType from '@/utils/base/browserType'
import loginApi from "@/apis/base/login";

const { Header, Sider, Content } = Layout

function QuitLogin() {
  const [isModalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()
  const handleOk = () => {
    loginApi.cancelHandle().then(({ data }) => {
      if (data.success) {
        navigate("/login", {
          replace: true
        })
      } else {
        alert(data.message)
      }
    })
  }
  const handleClick = () => {
    setModalVisible(true)
  }
  const handleCancel = () => {
    setModalVisible(false)
  }
  return <>
    <span onClick={handleClick}>退出登录</span>
    <Modal okText="确认" cancelText="取消" title="确认" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <p>是否确认退出登录？</p>
    </Modal>
  </>
}

let routeMenu = null
let MenuComponent = null
browerType({
  mobile() {
    MenuComponent = () => {
      const [open, setOpen] = useState(false)
      const [isLoading, setIsLoading] = useState(true)
      useEffect(() => {
        if (isLoading) {
          (() => {
            let time,
              pageX = 0,
              pageY = 0,
              isRight = false
            document.addEventListener("touchstart", e => {
              if (window.scrollX) {
                time = -Infinity
              } else {
                time = e.timeStamp
              }
              pageX = e.touches[0].pageX
              pageY = e.touches[0].pageY
            })
            document.addEventListener("touchmove", e => {
              isRight = e.touches[0].pageX > pageX && Math.abs(e.touches[0].pageY - pageY) < 30
            })
            document.addEventListener("touchend", e => {
              if (isRight && e.timeStamp - time >= 100 && e.timeStamp - time <= 500) {
                setOpen(true)
              }
            })
            setIsLoading(false)
          })()
        }
      })
      const hideDrawer = () => {
        setOpen(false)
      }
      return (
        <>
          <Drawer
            title="导航"
            closable={true}
            visible={open}
            onClose={hideDrawer}
            key="left"
            placement="left"
            width="50vw"
            className='menu-drawer'
          >
            <MyMenu />
          </Drawer>
        </>
      )
    }
  },
  client() {
    routeMenu = <Sider>
      <MyMenu />
    </Sider>
  }
})

// 加载核心内容组件
export default function Home() {
  const [loading, setLoading] = useState(true)
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(0)
  loading && import("@/core")
    .then(module => {
      const { install } = module
      const thenFunc = () => {
        setCount(count + 1)
      }
      install(thenFunc, () => setFlag(false), () => setFlag(true))
    })
    .finally(() => {
      setLoading(false)
    })
  if (!flag) return <>
    <Alert type="error" message="加载核心数据失败" />
  </>
  // 路由处理
  const menu = (
    <Menu items={[{
      key: "0",
      label: <QuitLogin />
    }]} />
  )

  return (
    <>
      {MenuComponent && <MenuComponent />}
      <Layout className='home' style={{
        height: "100%"
      }}>
        <Header className="header">
          <Row justify="space-between">
            <Col className="title"><h1>课程管理系统</h1></Col>
            <Col>
              <Avatar size="middle" className="avatar" icon={<UserOutlined />} />
              <Dropdown overlay={menu} trigger={['click']}>
                <Space>
                  <span className="self-link">个人中心</span>
                  <DownOutlined />
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </Header>
        <Layout className="layout">
          {routeMenu}
          <Content className='home-content' style={{ position: "relative" }}>
            <div className="home-content-inner">
              <Routes>
                <Route path="*" element={<RouteComponent />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
