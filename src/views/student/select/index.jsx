/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 17:02:34
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 11:00:39
 * @FilePath: \student-performance\src\pages\home\course-select\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
// import { Empty } from 'antd'
import { Row, Col, Select, Button, Collapse, Space, Tag, List, Modal, Drawer, Empty, Spin, message } from 'antd'
import { ClockCircleOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
// Component
import InfoCard from '@/components/InfoCard'
// Model
import Course from '@/model/Course'
import CoursePlan from "@/model/CoursePlan"
import studentApi from '../../../apis/student'
// CSS
import "./index.scss"
// import Arrangement from '@/model/Arrangement'
const { Option } = Select
const { Panel } = Collapse

// 过滤用的唯一标识
const filterKeys = {
    FILTER_BY_TYPE: Symbol("课程类型"),
    FILTER_BY_REQUIRED: Symbol("课程性质"),
    FILTER_BY_DAY: Symbol("上课时间"),
    FILTER_COURSE_DATA: Symbol("筛选数据")
}
class CourseSelectScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            // 是否正在加载课表
            loadingSechedule: false,
            // 是否正在刷新数据
            loadingFlashing: false,
            // 是否完成数据刷新
            isFlashing: false,
            // 是否正在加载已选
            loadingChecked: false,
            // 已选课程的数据
            checkedData: [],
            // 是否正在查看已选课程
            isLookingChecked: false,
            // 
            loadingFilter: true,
            // 是否正在选课
            loadingSelect: false
        }
        // 为方法绑定this
        this.toLookChecked = this.toLookChecked.bind(this)
        this.closeLookChecked = this.closeLookChecked.bind(this)
        this.toLookSchedule = this.toLookSchedule.bind(this)
    }

    componentDidMount() {
        PubSub.subscribe("select-checked", this.setCheckedData)
    }

    componentWillUnmount() {
        PubSub.unsubscribe("select-checked")
    }

    selectCancel(aid) {
        PubSub.publish("select-cancel", { aid })
    }

    setCheckedData = (_, { checkedData }) => {
        this.setState({
            checkedData: checkedData.map(item => <Space size="small" key={item.id.toString()}>
                <span>{item.name}</span>
                <Tag color="blue">{item.week_start}-{item.week_end}周</Tag>
                <Space direction='vertical' size="small">
                    {item.courseplans.map(item => <Space size="small" key={item.id.toString()}>
                        <Tag color="red">{CoursePlan.week[item.day]}</Tag>
                        <Tag color="orange">{item.building_name} {`${item.layer}${item.code}`}</Tag>
                        <Tag color="green">{item.building_name} {`${item.start_section}-${item.end_section}`}节</Tag>
                    </Space>)}
                </Space>
                <Button type="primary" danger onClick={() => this.selectCancel(item.id)}>退选</Button>
            </Space>)
        })
    }

    // 查看已选课程方法
    toLookChecked() {
        this.setState({
            loadingChecked: true,
            isLookingChecked: true
        })
    }

    // 查看课表方法
    toLookSchedule() {
        this.setState({
            loadingSechedule: true
        })

        import("@/components/MySchedule").then(module => {
            const MySchedule = module.default
            Modal.success({
                title: "",
                width: "800px",
                icon: <></>,
                content: <MySchedule queryHandle={studentApi.timetableHandle} />
            })
        }).finally(() => this.setState({
            loadingSechedule: false
        }))
    }

    // 取消查看已选方法
    closeLookChecked() {
        this.setState({
            loadingChecked: false,
            isLookingChecked: false,
        })
    }

    // 筛选选择框值改变时触发
    createOnChange(selectKey) {
        return value => {
            this.setState({
                loadingFilter: true
            })
            PubSub.publish(filterKeys.FILTER_COURSE_DATA, {
                values: {
                    [selectKey]: value
                },
                callback: () => {
                    this.setState({
                        loadingFilter: false
                    })
                }
            })
        }
    }

    // 筛选框的选项VDOM
    filterVDOM = {
        // 课程类别
        [filterKeys.FILTER_BY_TYPE]: Course.getType().map((type, index) => <Option key={index} value={index.toString()}>{type}</Option>),
        // 上课时间
        [filterKeys.FILTER_BY_DAY]: CoursePlan.week.map((day, index) => <Option key={index} value={index.toString()}>{day}</Option>),
        // 课程性质
        [filterKeys.FILTER_BY_REQUIRED]: Course.getRequired().map((val, index) => <Option key={index} value={index.toString()}>{val}</Option>)
    }

    filterItems = [{
        title: "课程类别",
        key: filterKeys.FILTER_BY_TYPE
    }, {
        title: "课程性质",
        key: filterKeys.FILTER_BY_REQUIRED
    }, {
        title: "上课时间",
        key: filterKeys.FILTER_BY_DAY
    }].map(item => {
        const options = this.filterVDOM[item.key]
        return <Col key={item.key.toString()}>
            <span>{item.title}：</span>
            <Select onChange={this.createOnChange(item.key)} key={item.key.toString()} defaultValue="all">
                <Option value="all">全部</Option>
                {options}
            </Select>
        </Col>
    })

    render() {
        return (<>
            <Row justify="space-between">
                <Col flex="0 0 450px">
                    <Row justify='space-between'>
                        {this.filterItems}
                    </Row>
                </Col>
                <Col flex="0 0 350px">
                    <Row justify='space-between'>
                        <Col>
                            <Button type="primary" loading={this.state.loadingSechedule} onClick={this.toLookSchedule}>查看课表</Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={() => PubSub.publish("select-flash")} danger>刷新数据</Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={this.toLookChecked} loading={this.state.loadingChecked}>查看已选</Button>
                            <Drawer title="已选课程" placement="right" width="auto" onClose={this.closeLookChecked} visible={this.state.isLookingChecked}>
                                <Space direction="vertical" size="large" align="end">
                                    {this.state.checkedData}
                                </Space>
                            </Drawer>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>)
    }
}

class CourseSelectContent extends Component {
    constructor(props) {
        super(props)
        // 课程原数据（不展示在试图上）
        this.courseData = []
        // 课程信息原数据（不展示在试图上）
        this.courseInfos = []
        this.state = {
            showCourseData: [],
            showCourseInfos: [],
            selectedCourses: [],
            isLoading: true,
            loadingSelect: false
        }
    }

    componentDidMount() {
        this.flashCourseData()
        PubSub.subscribe("select-flash", this.flashCourseData.bind(this))
        // 订阅数据筛选
        PubSub.subscribe(filterKeys.FILTER_COURSE_DATA, this.filterCourseInfo.bind(this))
        PubSub.subscribe("select-cancel", (_, { aid }) => this.selectCancel(aid))
    }

    componentWillUnmount() {
        PubSub.unsubscribe("select-flash")
        PubSub.unsubscribe(filterKeys.FILTER_COURSE_DATA)
        PubSub.unsubscribe("select-cancel")
    }

    // 数据刷新方法
    flashCourseData = () => {
        !this.state.isLoading && this.setState({
            isLoading: true
        })
        studentApi.selectQueryHandle().then(({ data }) => {
            if (!data.success) return message.error(data.message)
            const result = data.result
            const { courses, selected } = result;
            this.courseInfos = []
            this.courseData = []
            this.selected = selected
            courses.forEach(({ course, arrangement }) => {
                course.key = course.id
                arrangement.key = arrangement.id
                arrangement.courseplans.forEach(item => item.key = item.id)
                !(this.courseData.filter(item => item.id === course.id).length) && this.courseData.push(course)
                this.courseInfos.push(arrangement)
            })
            PubSub.publish("select-checked", {
                checkedData: this.courseInfos.filter(item => this.selected.filter(select => select.aid === item.id).length)
            })
        }).finally(() => {
            this.setState({
                showCourseData: this.courseData.map(course => new Course(course)),
                showCourseInfos: this.courseInfos.concat(),
                selectedCourses: this.selected,
                isLoading: false,
                loadingSelect: false
            })
        })
        // const requestAll = Promise.all([])
    }

    // 筛选课程数据的方法
    // 将筛选数据预存起来，根据预存的筛选数据进行数据筛选
    filterCourseInfo = (() => {
        // 存储数据筛选数据
        const filterValues = {
            [filterKeys.FILTER_BY_TYPE]: "all",
            [filterKeys.FILTER_BY_REQUIRED]: "all",
            [filterKeys.FILTER_BY_DAY]: "all"
        }
        return (_, data) => {
            // 替换传入的筛选数据
            const values = data.values || {}
            const { FILTER_BY_DAY, FILTER_BY_TYPE, FILTER_BY_REQUIRED } = filterKeys
            values[FILTER_BY_DAY] !== undefined && (filterValues[FILTER_BY_DAY] = values[FILTER_BY_DAY])
            values[FILTER_BY_TYPE] !== undefined && (filterValues[FILTER_BY_TYPE] = values[FILTER_BY_TYPE])
            values[FILTER_BY_REQUIRED] !== undefined && (filterValues[FILTER_BY_REQUIRED] = values[FILTER_BY_REQUIRED])
            let filterCourseInfo = this.courseInfos
            // 根据日期过滤数据
            filterValues[FILTER_BY_DAY] !== "all" && (filterCourseInfo = filterCourseInfo.filter(courseInfo => courseInfo.courseplans.some(item => item.day === filterValues[FILTER_BY_DAY])))
            // 获取所有课程数据并且根据日期过滤
            let filterCourseData = this.courseData.filter(item => filterCourseInfo.filter(courseInfo => courseInfo.cno === item.cno).length)
            // 根据课程类型过滤数据
            filterValues[FILTER_BY_TYPE] !== "all" && (filterCourseData = filterCourseData.filter(
                item => item.type === filterValues[FILTER_BY_TYPE]
            ))
            // 根据课程性质过滤数据
            filterValues[FILTER_BY_REQUIRED] !== "all" && (filterCourseData = filterCourseData.filter(
                item => item.required === filterValues[FILTER_BY_REQUIRED]
            ))
            data.callback()
            this.setState({
                showCourseData: filterCourseData.map(course => new Course(course)),
                showCourseInfos: filterCourseInfo.concat()
            })
        }
    })()

    // 选课方法
    selectCourse = (aid) => {
        this.setState({
            loadingSelect: true
        })
        studentApi.selectInsertHandle(aid).then(({ data }) => {
            if (!data.success) return message.error(data.message)
            message.success("选课成功")
        }).catch(() => message.error("选课失败"))
            .finally(() => this.flashCourseData())
    }

    selectCancel = (aid) => {
        this.setState({
            loadingSelect: true
        })
        studentApi.selectDeleteHandle(aid).then(({ data }) => {
            if (!data.success) return message.error(data.message)
            message.success("退选成功")
        }).catch(() => message.error("退选失败"))
            .finally(() => this.flashCourseData())
    }

    showTeacherInfo(aid) {
        Modal.success({
            title: "教师信息",
            content: <InfoCard />,
            closable: true,
            okText: "确定",
            icon: null
        })
    }

    listItemFunc = info => (
        <List.Item key={info.id}>
            <Row justify='space-around' align="middle" style={{
                width: "100%"
            }}>
                {/* 课程名字 */}
                <Col flex="0 0 20em">{info.name}</Col>
                {/* 课程教师 */}
                <Col>
                    {/* 教师图标 */}
                    <UserOutlined />
                    {/* 显示和查看教师信息的按钮 */}
                    {/* 点击名字弹出教师信息框 */}
                    <Button key={info.tno} type="link" onClick={() => { this.showTeacherInfo(info.tno) }}>{info.tname}</Button>
                </Col>
                {/* 课程起始周与结束周 */}
                <Col>
                    <ClockCircleOutlined /><span>{info.week_start}-{info.week_end}周</span>
                </Col>
                {/* 课程安排时间与地点 */}
                <Col>
                    <Row align='middle'>
                        <Col>
                            {/* 地点图标 */}
                            <EnvironmentOutlined />
                        </Col>
                        <Col>
                            <ul style={{
                                margin: "0 0.5em"
                            }}>
                                {
                                    // 根据数据生成VDOM
                                    info.courseplans.map(item => (
                                        <li key={item.id}>
                                            {/* 周几 */}
                                            <span>{CoursePlan.week[item.day]}</span>
                                            {/* 第几节课 */}
                                            <span>{item.start_section}-{item.end_section}节</span>
                                            {/* 上课地点 */}
                                            <Tag color="gold">{item.building_name} {item.layer}{item.code}</Tag>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <span>已选：{info.count}/{info.count_max}</span>
                    {info.count >= info.maxCount ? <Tag color="red">已满</Tag> : <Tag color="cyan">未满</Tag>}</Col>
                <Col>
                    {
                        this.selected.filter(item => item.aid === info.id).length ?
                            <Button type="ghost" danger disabled={this.state.loadingSelect} loading={this.state.loadingSelect} onClick={() => this.selectCancel(info.id)}>退选</Button>
                            :
                            <Button type="ghost" disabled={this.state.loadingSelect} onClick={() => this.selectCourse(info.id)} loading={this.state.loadingSelect}>选课</Button>
                    }
                </Col>
            </Row>
        </List.Item>
    )

    render() {
        if (this.state.isLoading) return <div
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            }}
        ><Space size="small" direction='vertical'>
                <Spin size='large'></Spin>
                <span>加载中...</span>
            </Space>
        </div>
        const { showCourseData } = this.state
        if (!this.courseData.length) return <Empty description="暂无选课数据" />
        const panels = showCourseData.length ? <Collapse>{showCourseData.map(
            (course) => {
                const { name, credit, required, type, id } = course
                return <Panel key={id} header={
                    (
                        <Space size="small" direction="horizontal">
                            <span>{name}</span>
                            <Tag color="lime">{type === "0" ? "专业" : "公共"}</Tag>
                            <Tag color="green">{credit.toFixed(1)}分</Tag>
                            {required === "1" ? <Tag color="red">必修</Tag> : <Tag color="blue">选修</Tag>}
                        </Space>
                    )
                }>
                    <List>
                        {
                            // 通过过滤获取该课程的所有上课安排
                            this.state.showCourseInfos.filter(
                                info => info.cid === course.id
                            )
                                // 为数据添加课程名
                                .map(
                                    info => {
                                        info.key = info.id
                                        return info
                                    }
                                )
                                // 生成VDOM
                                .map(
                                    this.listItemFunc
                                )
                        }
                    </List>
                </Panel>
            }
        )}</Collapse> : <Empty style={{
            margin: "50px"
        }} description="没有找到符合筛选条件的课程" />
        return (<>
            {panels}
        </>)
    }
}

export default function CourseSelect() {
    return (
        <div className="course-select">
            {/* <Empty description={<h3>当前暂未开放选课</h3>} imageStyle={{
        width: "200px",
        height: "200px",
        margin: "50px auto 20px"
      }}/> */}

            <h3 className="title">在线选课</h3>
            <div className='select-screen'>
                <CourseSelectScreen />
            </div>
            <div className="select-content" style={{
                position: "relative"
            }}>
                <CourseSelectContent />
            </div>
        </div>
    )
}
