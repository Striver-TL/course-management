/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:44:06
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-18 15:09:16
 * @FilePath: \student-performance\src\pages\home\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Routes, Route } from 'react-router-dom'
import { Layout, Row, Col, Avatar, Dropdown, Button, Space, Menu, Modal, Alert, Drawer } from 'antd'
import { UserOutlined, DownOutlined } from '@ant-design/icons'
import MyMenu from '@/components/MyMenu'
import RouteComponent from "@/router/routes"
import './index.scss'
import browerType from '@/utils/browserType'

const { Header, Sider, Content } = Layout

function QuitLogin() {
  const [isModalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()
  const handleOk = () => {
    import("../../request/utils/login").then(RequestLogin => {
      return RequestLogin.default.cancelLogin()
    }).then(({ data }) => {
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
      const showDrawer = () => {
        setOpen(true)
      }
      const hideDrawer = () => {
        setOpen(false)
      }
      return (
        <>
          <Button onClick={showDrawer}>导航</Button>
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
      { MenuComponent && <MenuComponent /> }
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
          <Content className='home-content'>
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
