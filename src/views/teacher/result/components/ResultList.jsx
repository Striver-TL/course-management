/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2023-03-30 21:48:50
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 22:40:27
 * @FilePath: \student-performance\src\views\teacher\result\components\ResultList.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Empty, List, message, Space, Spin, Tag, Button, Row, Col } from "antd";
import { useState, useEffect } from "react";
import teacherApi from "../../../../apis/teacher";
import CoursePlan from "../../../../model/CoursePlan";

const renderItem = item => {
    const { aid, cname, week_start, week_end } = item
    const courseplans = item.courseplans
    return <List.Item key={aid.toString()}>
        <Row justify="space-between" style={{ width: "100%" }}>
            <Col>
                <Space direction="horizontal" size="small">
                    <span>{cname}</span>
                    <Tag color="blue">{week_start}-{week_end}周</Tag>
                    <Space direction="vertical" size="small">
                        {
                            courseplans.map(item => (<Space direction="horizontal" size="small" key={item.id}>
                                <Tag color="green">{item.building_name} {item.layer}{item.code}</Tag>
                                <Tag color="red">{CoursePlan.week[item.day]}</Tag>
                                <Tag color="orange">{item.start_section}-{item.end_section}节</Tag>
                            </Space>))
                        }
                    </Space>
                </Space>
            </Col>
            <Col>
                <Button type="primary">进入管理</Button>
            </Col>
        </Row>
    </List.Item>
}

function ResultList() {
    const [isLoading, setIsLoading] = useState(true)
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        (async () => {
            const { data: timetableResult } = await teacherApi.timetableHandle()
            if (!timetableResult.success) return message.error(timetableResult.message)
            const result = timetableResult.result
            const dataSource = []
            result.forEach(item => {
                const { id, building_name, start_section, end_section, day, layer, code } = item
                const index = dataSource.map(item => item.aid).indexOf(item.aid)
                const object = { id, building_name, start_section, end_section, day, layer, code }
                if (index < 0) {
                    const { aid, cname, week_start, week_end } = item
                    dataSource.push({
                        aid,
                        cname,
                        week_start,
                        week_end,
                        courseplans: [object]
                    })
                } else dataSource[index].courseplans.push(object)
            })
            setDataSource(dataSource)
            setIsLoading(false)
        })()
    }, [])
    return isLoading ? <Spin className="box-center"></Spin> : (!dataSource.length ? <Empty className="box-center"></Empty> : <List size="large" bordered dataSource={dataSource} renderItem={renderItem}></List>)
}

export default ResultList