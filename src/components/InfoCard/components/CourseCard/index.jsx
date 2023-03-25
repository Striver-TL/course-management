/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-01 16:06:29
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-14 16:58:18
 * @FilePath: \course-performance\src\components\InfoCard\components\CourseCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-01 16:05:54
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-02 08:54:05
 * @FilePath: \course-performance\src\components\InfoCard\components\courseCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from "react";
import PropTypes from 'prop-types'
import { message, Tag, Row, Col, Alert, Spin, Space } from 'antd'

import Course from "@/model/Course";

class CourseCard extends Component {
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
            // 课程数据
            course: null
        }

        this.getData()
    }

    getData() {
        this.props.queryTable.queryHandle(this.props.url, {
            columns: ["cno", "name", "credit", "required", "type"],
            condition: {
                id: this.props.id
            }
        })
            .then(({ data }) => {
                if (data.success) {
                    this.setState({
                        course: new Course(data.result[0])
                    })
                } else Promise.reject()
            })
            .catch(() => message.error("获取课程数据时出错"))
            .finally(() => this.setState({
                loading: false
            }))
    }

    render() {
        // 获取加载状态
        const { loading } = this.state
        // 正在加载返回加载中
        if (loading) return (
            <Spin tip="课程信息查询中..." />
        )
        // 判断是否获取到教师数据
        if (!this.state.course) return (
            <Alert message="获取课程数据时出错!" type="error" />
        )
        // 获取有效数据
        const courseInfos = this.state.course.getValidValues()

        return (
            <>
                <Space direction='vertical' className="card-space">
                    <Row>
                        <Col span={4}>名称</Col>
                        <Col span={14}>{courseInfos.name}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>编号</Col>
                        <Col span={14}>{courseInfos.cno}</Col>
                    </Row>
                    <Row>
                        <Col span={4}>性质</Col>
                        <Col span={14}><Tag color={courseInfos.reqruied === 0 ? 'red' : 'green'}>{Course.getRequired()[courseInfos.required]}</Tag></Col>
                    </Row>
                    <Row>
                        <Col span={4}>类别</Col>
                        <Col span={14}><Tag color="yellow">{Course.getType()[courseInfos.type]}</Tag></Col>
                    </Row>
                    <Row>
                        <Col span={4}>学分</Col>
                        <Col span={14}><Tag color="blue">{(+courseInfos.credit).toFixed(1)}分</Tag></Col>
                    </Row>
                </Space>
            </>
        )
    }

}

export default CourseCard
