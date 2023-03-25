/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 21:13:38
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-14 14:13:47
 * @FilePath: \student-performance\src\pages\home\index\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import React from 'react'

import { Row, Col, Space } from 'antd';
import IndexTaskBlock from '@/components/IndexTaskBlock';
import MySchedule from '@/components/MySchedule';
import './index.scss';
export default function Index() {
  return (
    <Space direction='vertical' size="middle" style={{
      width: "100%",
      background: "#fff"
    }}>
      <Row justify='space-between'>
        <Col span={15}>
          <IndexTaskBlock />
        </Col>
      </Row>
      <Row justify='space-between'>
        <Col span={24}>
          <MySchedule />
        </Col>
      </Row>
    </Space>
  )
}
