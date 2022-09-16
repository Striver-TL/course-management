/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-01 08:46:45
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-02 08:54:39
 * @FilePath: \student-performance\src\components\InfoCard\components\TeacherCard.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from "react";
import PropTypes from 'prop-types'
import { message, Tag, Row, Col, Alert, Spin, Divider, Space, Avatar, Card } from 'antd'
import { BankTwoTone, ManOutlined, WomanOutlined, PhoneTwoTone, MailTwoTone } from '@ant-design/icons'

import Teacher from "@/model/Teacher"
const Meta = Card.Meta
class TeacherCard extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        queryTable: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            // 是否正在加载
            loading: true,
            // 教师数据
            teacher: null
        }

        this.getData()
    }

    getData() {
        // 向后台请求数据
        this.props.queryTable.getData({
            // 获取的字段
            columns: ["tno", "tname", "gender", "birthday", "phone", "email"],
            // 匹配条件
            condition: {
                id: this.props.id
            }
        })
            // 成功获取
            .then(({ data }) => {
                // 成功获取到数据
                if (data.success) {
                    // 设置数据
                    this.setState({
                        teacher: new Teacher(data.result[0])
                    })
                    // 未能获取到数据
                } else Promise.reject()
            })
            // 处理失败
            .catch(() => message.error("获取数据时失败"))
            // Promise状态完毕执行
            .finally(() => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        // 获取加载状态
        const { loading } = this.state
        // 正在加载返回加载中
        if (loading) return (
            <Spin tip="教师信息查询中..." />
        )
        // 判断是否获取到教师数据
        if (!this.state.teacher) return (
            <Alert message="获取教师数据时出错!" type="error" />
        )
        // 获取有效数据
        const teacherInfos = this.state.teacher.getValidValues()

        return (
            <>
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={
                        <Space size="small" direction="vertical">
                            <div>
                                {teacherInfos.tname}&nbsp;
                                {
                                    teacherInfos.gender === "0" ?
                                        <Tag color="pink"><WomanOutlined color="white" /></Tag>
                                        :
                                        <Tag color="blue"><ManOutlined color="white" /></Tag>
                                }
                            </div>
                            <div>
                                {
                                    teacherInfos.age
                                        ? <Tag color="lime">{ teacherInfos.age }岁</Tag>
                                        : <Tag color="#ccc">年龄未知</Tag>
                                }

                            </div>
                        </Space>
                    }
                />
                <Divider />
                <Space direction='vertical' className="card-space">
                    <Row>
                        <Col span={2}><BankTwoTone className="card-icons" twoToneColor="#eb2f96" /></Col>
                        <Col span={16}>{teacherInfos.tno}</Col>
                    </Row>
                    <Row>
                        {/* 图标 */}
                        <Col span={2}><PhoneTwoTone className="card-icons" twoToneColor="skyblue" /></Col>
                        {/* 内容 */}
                        <Col span={16}>{teacherInfos.phone || "暂无"}</Col>
                    </Row>
                    <Row>
                        {/* 图标 */}
                        <Col span={2}><MailTwoTone className="card-icons" twoToneColor="gold" /></Col>
                        {/* 内容 */}
                        <Col span={16}>{teacherInfos.email || "暂无"}</Col>
                    </Row>
                </Space>
            </>
        )
    }

}

export default TeacherCard
