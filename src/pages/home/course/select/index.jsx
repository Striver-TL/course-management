/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 17:02:34
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-18 11:35:35
 * @FilePath: \student-performance\src\pages\home\course-select\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
// import { Empty } from 'antd'
import { Row, Col, Select, Button, Collapse, Space, Tag, List, Modal, Drawer } from 'antd'
import { ClockCircleOutlined, UserOutlined, EnvironmentOutlined } from '@ant-design/icons'
import PubSub from 'pubsub-js'
// Component
import InfoCard from '../../../../components/InfoCard'
// Model
import Course from '../../../../model/Course'
import CoursePlan from '../../../../model/CoursePlan'
// CSS
import "./index.scss"

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
      loadingFilter: true
    }
    // 为方法绑定this
    this.toLookChecked = this.toLookChecked.bind(this)
    this.closeLookChecked = this.closeLookChecked.bind(this)
    this.toLookSchedule = this.toLookSchedule.bind(this)
  }

  // 查看已选课程方法
  toLookChecked() {
    this.setState({
      loadingChecked: true
    })
    setTimeout(() => {
      this.setState({
        isLookingChecked: true,
        loadingChecked: false,
        checkedData: ["1", "2", "3"]
      })
    }, 1000)
  }

  // 查看课表方法
  toLookSchedule() {
    this.setState({
      loadingSechedule: true
    })
    setTimeout(() => {
      this.setState({
        loadingSechedule: false
      })
      import("../../../../components/MySchedule").then(module => {
        const MySchedule = module.default
        Modal.success({
          title: "",
          width: "800px",
          icon: <></>,
          content: <MySchedule />
        })
      })
    }, 1000)
  }

  // 取消查看已选方法
  closeLookChecked() {
    this.setState({
      isLookingChecked: false,
      checkedData: []
    })
  }

  // 筛选选择框值改变时触发
  createOnChange(selectKey) {
    return value => {
      PubSub.publish(filterKeys.FILTER_COURSE_DATA, {
        key: selectKey,
        value
      })
    }
  }

  // 筛选框的选项VDOM
  filterVDOM = {
    // 课程类别
    [filterKeys.FILTER_BY_TYPE]: Course.type.map((type, index) => <Option key={index} value={index}>{type}</Option>),
    // 上课时间
    [filterKeys.FILTER_BY_DAY]: CoursePlan.week.map((day, index) => <Option key={index} value={index}>{day}</Option>),
    // 课程性质
    [filterKeys.FILTER_BY_REQUIRED]: Course.required.map((val, index) => <Option key={index} value={index}>{val}</Option>)
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
        <Col flex="0 0 540px">
          <Row justify='space-between'>
            {this.filterItems}
            <Col>
              <Button type="ghost">恢复默认</Button>
            </Col>
          </Row>
        </Col>
        <Col flex="0 0 350px">
          <Row justify='space-between'>
            <Col>
              <Button type="primary" loading={this.state.loadingSechedule} onClick={this.toLookSchedule}>查看课表</Button>
            </Col>
            <Col>
              <Button type="primary" danger>刷新数据</Button>
            </Col>
            <Col>
              <Button type="primary" onClick={this.toLookChecked} loading={this.state.loadingChecked}>查看已选</Button>
              <Drawer title="Basic Drawer" placement="right" onClose={this.closeLookChecked} visible={this.state.isLookingChecked}>
                {this.state.checkedData.map(item => <p key={item}>{item}</p>)}
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
    this.courseData = [
      {
        cno: "1",
        cname: "形式与政策",
        required: 1,
        credit: 4,
        type: 0
      }, {
        cno: "2",
        cname: "机器学习",
        required: 1,
        credit: 16,
        type: 1
      }
    ]
    this.courseInfos = [
      {
        cno: "1",
        aid: "1",
        tname: "李四",
        tno: "1",
        "week_start": 2,
        "week_end": 9,
        count: 25,
        "count_max": 120,
        plan: [{
          pid: 0,
          section: 0,
          day: 3,
          build: 12,
          number: 408
        }, {
          pid: 1,
          section: 2,
          day: 4,
          build: 12,
          number: 408
        }]
      },
      {
        cno: "2",
        aid: "2",
        tname: "张三",
        tno: "2",
        "week_start": 2,
        "week_end": 9,
        count: 12,
        "count_max": 50,
        plan: [{
          pid: 2,
          section: 1,
          day: 2,
          build: 12,
          number: 410
        }, {
          pid: 3,
          section: 3,
          day: 3,
          build: 12,
          number: 410
        }]
      }
    ]
    this.state = {
      showCourseData: this.courseData.map(course => new Course(course)),
      showCourseInfos: this.courseInfos.map(courseInfo => new CoursePlan(courseInfo))
    }

    PubSub.subscribe(filterKeys.FILTER_COURSE_DATA, this.filterCourseInfo.bind(this))
  }

  filterCourseInfo(_, data) {
    const { FILTER_BY_TYPE, FILTER_BY_DAY, FILTER_BY_REQUIRED } = filterKeys
    switch(data.key) {
      case FILTER_BY_TYPE: 
        this.setState({
          showCourseData: this.courseData.filter(item => item.type === data.value).map(item => new Course(item))
        })
        break;
      case FILTER_BY_REQUIRED:
        this.setState({
          showCourseData: this.courseData.filter(item => item.required = data.value).map(item => new Course(item))
        })
        break;
      case FILTER_BY_DAY:
        this.setState({
          showCourseInfos: this.courseInfos.filter(courseInfo => courseInfo.plan.some(item => item.day === data.value)).map(item => new CoursePlan(item))
        })
    }
  }

  componentDidUpdate() {
    console.log(this.state.showCourseInfos)
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

  render() {
    const listItemFunc = info => (
      <List.Item key={info.aid}>
        <Row justify='space-around' align="middle" style={{
          width: "100%"
        }}>
          {/* 课程名字 */}
          <Col flex="0 0 20em" key={info.cno}>{info.cname}</Col>
          {/* 课程教师 */}
          <Col>
            {/* 教师图标 */}
            <UserOutlined />
            {/* 显示和查看教师信息的按钮 */}
            {/* 点击名字弹出教师信息框 */}
            <Button key={info.tno} type="link" onClick={() => { this.showTeacherInfo(info.tno) }}>{info.tname}</Button>
          </Col>
          {/* 课程起始周与结束周 */}
          <Col key={`${info.weekStart}-${info.weekEnd}`}>
            <ClockCircleOutlined />&nbsp;<span>{info.weekStart}-{info.weekEnd}周</span>
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
                    info.plan.map(item => (
                      <li key={item.pid}>
                        {/* 周几 */}
                        <span key={item.key}>{item.day}</span>
                        {/* 第几节课 */}
                        <span key={item.section}>{item.section}节</span>
                        {/* 上课地点 */}
                        <Tag color="gold" key={`${item.build}-${item.number}`}>{item.build}-{item.number}</Tag>
                      </li>
                    ))
                  }
                </ul>
              </Col>
            </Row>
          </Col>
          <Col key={`${info.count}-${info.maxCount}`}>
            <span>已选：{info.count}/{info.maxCount}</span>
            {info.count >= info.maxCount ? <Tag color="red">已满</Tag> : <Tag color="cyan">未满</Tag>}</Col>
          <Col>
            <Button type="ghost" >选课</Button>
            {/* <Button type="ghost" danger>退选</Button> */}
          </Col>
        </Row>
      </List.Item>
    )
    const panels = this.state.showCourseData.map(
      (course) => {
        const { cno, cname, credit, required, type } = course;
        return <Panel key={cno} header={
          (
            <Space key={cno} size="small" direction="horizontal">
              <span>{cname}</span>
              <Tag color="lime">{type}</Tag>
              <Tag color="green">{credit.toFixed(1)}分</Tag>
              {required === "必修" ? <Tag color="red">必修</Tag> : <Tag color="blue">选修</Tag>}
            </Space>
          )
        }>
          <List>
            {
              // 通过过滤获取该课程的所有上课安排
              this.state.showCourseInfos.filter(
                info => info.cno === course.cno
              )
                // 为数据添加课程名
                .map(
                  info => {
                    info.cname = cname
                    return info
                  }
                )
                // 生成VDOM
                .map(
                  listItemFunc
                )
            }
          </List>
        </Panel>
      }
    )
    return (<>
      <Collapse>
        {panels}
      </Collapse>
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
      <div className="select-content">
        <CourseSelectContent />
      </div>
    </div>
  )
}
