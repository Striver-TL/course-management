/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 21:13:38
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 16:54:09
 * @FilePath: \student-performance\src\pages\home\index\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import React from 'react'

import { Row, Col, Space } from 'antd';
import IndexTaskBlock from '@/components/IndexTaskBlock';
import MySchedule from '@/components/MySchedule';
import { store } from "../../redux/store";
import UserType from "../../model/UserType";
import studentApi from '../../apis/student';
import teacherApi from '../../apis/teacher';
import './index.scss';

export default function Index() {
  const loginUser = store.getState().loginUser;
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
          {
            loginUser.type !== UserType.ADMIN ? (loginUser.type === UserType.STUDENT ? <MySchedule queryHandle={studentApi.timetableHandle} /> : <MySchedule queryHandle={teacherApi.timetableHandle}></MySchedule>) : null}

        </Col>
      </Row>
    </Space>
  )
}
