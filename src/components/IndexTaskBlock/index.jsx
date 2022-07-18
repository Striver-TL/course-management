/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 17:11:20
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-16 09:43:35
 * @FilePath: \student-performance\src\components\IndexTaskBlock\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Row, Col } from 'antd'
import RingPie from '../RingPie'

import './index.scss'
export default function IndexTaskBlock() {
    return (
        <div className="taskblock">
            <h3 className='title'>我的进度</h3>
            {/* <Row align="middle">
                <Col span={8}>
                    <RingPie className="task-pie" title="作业完成" color={["green", "gray"]} source={[["类别", "数值"], ["已完成", 10], ["未完成", 100]]} />
                </Col>
                <Col span={8} justify="space-around">
                    <RingPie className="task-pie" title="课程进度" color={["orange", "gray"]} source={[["类别", "数值"], ["已完成", 10], ["未完成", 100]]} />
                </Col>
                <Col span={8}>
                    <RingPie style="task-pie" title="课程成绩" color={["blue", "gray"]} source={[["类别", "数值"], ["已完成", 0], ["未完成", 10]]} />
                </Col>
            </Row> */}
            <Row align="middle">
                <Col span={8}>
                    <RingPie className="task-pie" title="作业批阅" color={["green", "gray"]} source={[["类别", "数值"], ["已完成", 10], ["未完成", 100]]} />
                </Col>
                <Col span={8} justify="space-around">
                    <RingPie className="task-pie" title="课程进度" color={["orange", "gray"]} source={[["类别", "数值"], ["已完成", 10], ["未完成", 100]]} />
                </Col>
                <Col span={8}>
                    <RingPie className="task-pie" title="成绩录入" color={["blue", "gray"]} source={[["类别", "数值"], ["已完成", 0], ["未完成", 10]]} />
                </Col>
            </Row>
        </div>
    )
}
