/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-01 16:05:54
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-15 20:29:53
 * @FilePath: \student-performance\src\components\InfoCard\components\StudentCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from "react";
import PropTypes from 'prop-types'
import { message, Tag, Row, Col, Alert, Spin, Divider, Space, Card } from 'antd'
import { BankTwoTone, ManOutlined, WomanOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons'

import Student from "@/model/Student";

const Meta = Card.Meta

class StudentCard extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        queryTable: PropTypes.object.isRequired,
        id: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            // 是否正在加载
            loading: true,
            // 学生数据
            student: null
        }

        this.getData()
    }

    getData() {
        this.props.queryTable.queryHandle(this.props.url, {
            columns: ["sno", "sname", "gender", "birthday", "phone", "email"],
            condition: {
                id: this.props.id
            }
        })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        student: new Student(data.result[0])
                    })
                } else Promise.reject()
            })
            .catch(() => message.error("获取学生数据时出错"))
            .finally(() => this.setState({
                loading: false
            }))
    }

    render() {
        // 获取加载状态
        const { loading } = this.state
        // 正在加载返回加载中
        if (loading) return (
            <Spin tip="学生信息查询中..." />
        )
        // 判断是否获取到教师数据
        if (!this.state.student) return (
            <Alert message="获取学生数据时出错!" type="error" />
        )
        // 获取有效数据
        const studentInfos = this.state.student.getValidValues()

        return (
            <>
                <Meta
                    title={
                        <Space size="small" direction="vertical">
                            <div>{studentInfos.sname}&nbsp;
                                {
                                    studentInfos.gender === "0" ?
                                        <Tag color="pink"><WomanOutlined color="white" /></Tag>
                                        :
                                        <Tag color="blue"><ManOutlined color="white" /></Tag>
                                }
                            </div>
                            {
                                studentInfos.age
                                    ? <Tag color="lime">{studentInfos.age}岁</Tag>
                                    : <Tag color="#ccc">年龄未知</Tag>
                            }
                        </Space>
                    }
                />
                <Divider />
                <Space direction='vertical' className="card-space">
                    <Row>
                        <Col span={2}><BankTwoTone className="card-icons" twoToneColor="#eb2f96" /></Col>
                        <Col span={16}>{studentInfos.sno}</Col>
                    </Row>
                    <Row>
                        {/* 图标 */}
                        <Col span={2}><PhoneTwoTone className="card-icons" twoToneColor="skyblue" /></Col>
                        {/* 内容 */}
                        <Col span={16}>{studentInfos.phone || "暂无"}</Col>
                    </Row>
                    <Row>
                        {/* 图标 */}
                        <Col span={2}><MailTwoTone className="card-icons" twoToneColor="gold" /></Col>
                        {/* 内容 */}
                        <Col span={2}>{studentInfos.email || "暂无"}</Col>
                    </Row>
                </Space>
            </>
        )
    }

}

export default StudentCard
