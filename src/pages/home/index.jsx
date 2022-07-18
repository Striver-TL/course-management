/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:44:06
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-16 12:09:13
 * @FilePath: \student-performance\src\pages\home\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { useRoutes } from 'react-router'
import { Layout, Row, Col } from 'antd'
import MyMenu from '../../components/MyMenu'
import './index.scss'
import routes from '../../router/routes'

export default function Home() {
  const { Header, Sider, Content } = Layout
  const router = useRoutes(routes())
  return (
    <Layout className='home' style={{
      height: "100%"
    }}>
      <Header className="header">
        <Row justify="space-between">
          <Col span={4} className="title"><h1>学生成绩管理系统</h1></Col>
          <Col span={4}>欢迎</Col>
        </Row>
      </Header>
      <Layout style={{
        padding: "20px"
      }}>
        <Sider>
          <MyMenu />
        </Sider>
        <Content className='home-content'>
          <div className="home-content-inner">
            {router}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
