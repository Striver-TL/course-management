/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-18 13:48:13
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-14 18:05:39
 * @FilePath: \student-performance\src\pages\home\admin\arrangement\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'
import { Button, Tag, Space, Modal } from "antd"

import PageComponent from "@/components/PageComponent";
import MyTable from "@/components/MyTable";
import tableKeys from "@/utils/http/config/tableKeys";
import createApi from '@/apis/admin/data';
import AddTeacherButton from './components/AddTeacherButton';
import InfoCard from "@/components/InfoCard"
import api from "@/apis/admin/arrangement"
import Arrangement from "@/model/Arrangement"

import "./style.scss"
import ClearPlaceButton from './components/ClearPlaceButton';
import AddPlaceButton from './components/AddPlaceButton';
// 表格列信息
let tableColumns = [{
    key: "cname",
    dataIndex: "cname",
    title: "课程"
}, {
    key: "tname",
    dataIndex: "tname",
    title: "教师"
}, {
    key: "time",
    dataIndex: "time",
    title: "上课时间"
}, {
    key: "count",
    dataIndex: "count",
    title: "已选人数"
}, {
    key: "count_max",
    dataIndex: "count_max",
    title: "最大人数"
}]

// 数据转为VNode
let toNode = (data) => {
    console.log(data)
    // 课程名替换为可展示课程的按钮
    data.name = <Button type="link" onClick={(
        cid => () =>
            Modal.info({
                // 
                title: "信息查看",
                // 显示关闭按钮
                closable: true,
                // 确认文字
                okText: "确认",
                // 
                icon: <></>,
                // 显示内容
                content: (
                    // 信息卡片
                    <InfoCard
                        // 数据类型
                        type={tableKeys.TABLE_COURSE}
                        // 数据id
                        id={cid}
                    />)

            })
    )(data.cid)
    }>{data.name}</Button>
    // 教师名替换为可展示教师的按钮
    data.tname = data.tname ? <Button type="ghost" onClick={() => {
        Modal.info({
            title: "教师查看",
            closable: true,
            okText: "确认",
            content: (
                <InfoCard type={tableKeys.TABLE_TEACHER} id={data.tid}></InfoCard>
            )
        })
    }}>{data.tname}</Button> : "无"
    // 设置key作为VNode的标识
    data.key = data.id
    // 添加time属性，以标签的形式展示起始-结束周
    let days = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    let sections = data.courseplans.map(({ building_name, code, layer, start_section, end_section, day, id }) => <Tag key={id} color="blue">{`${days[day]} ${building_name} ${layer}${code} ${start_section}-${end_section}节`}</Tag>)
    data.time = <Space direction='horizonial'>
        <Tag color="blue">{data.week_start}-{data.week_end}周</Tag>
        {sections}
    </Space>
    // 当前人数
    data.count = <Tag color="gray">{data.count}</Tag>
    // 最大人数
    data.count_max = <Tag color="gray">{data.count_max}</Tag>
    return data
}

// 验证器
let validator = (data) => {
    let arrangement = new Arrangement(data)
    return arrangement.toValid({
        cno: "课程号格式有误",
        tno: "教工号格式有误",
        week_start: "起始周格式有误",
        week_end: "结束周格式有误",
        count: "选课人数格式有误",
        count_max: "最大选课人数格式有误",
        start_section: "起始节格式有误",
        end_section: "结束节格式有误",
        day: "上课天格式有误"
    })
}

let name = "arrangement table"

// 课程实施组件
let CourseArrangement = () => {
    // 设置周信息状态
    const [weekOption, setWeekOption] = useState([])
    const weekStartOption = []
    // 这里将周编号插入到起始周数组里
    for (let i = 1; i <= 20; i++) weekStartOption.push({ value: i.toString() })
    // 记录最大人数便于输入框校验
    let count_max = 0
    // 输入框配置
    let inputConfig = [
        // 课程号
        {
            key: "cid",
            item: {
                name: "cid",
                label: "课程",
                rules: [
                    {
                        required: true,
                        message: "请选择课程号"
                    }
                ]
            },
            input: {
                type: "modal",
                placeholder: "请选择课程",
                ...(() => {
                    const { countHandle, queryHandle } = createApi(tableKeys.TABLE_COURSE)
                    return {
                        countHandle,
                        queryHandle
                    }
                })(),
                tableColumns: [{
                    key: "cno",
                    dataIndex: "cno",
                    title: "课程号"
                }, {
                    key: "name",
                    dataIndex: "name",
                    title: "课程名"
                }],
                queryColumns: ["id", "cno", "name"],
                toNode: data => {
                    data.key = data.id
                    return data
                }
            }
        },
        // // 教师
        // {
        //     key: "tno",
        //     item: {
        //         name: "tno",
        //         label: "教师"
        //     },
        //     input: {
        //         type: "select",
        //         placeholder: "选择教师",
        //         options: []
        //     }
        // },

        {
            key: "count",
            item: {
                name: "count",
                label: "人数",
                rules: [{
                    required: true,
                    message: "请输入人数"
                }, {
                    validator: (rule, value, callback) => {
                        let number = parseInt(value)
                        if (isNaN(number) || number > count_max || number < 0) {
                            callback(`人数的有效范围为0-${count_max}`)
                        } else return Promise.resolve()
                    }
                }]
            },
            input: {
                placeholder: "请输入人数"
            }
        },
        // 最大人数
        {
            key: "count_max",
            item: {
                name: "count_max",
                label: "最大人数",
                rules: [{
                    required: true,
                    message: "请输入最大人数"
                }, {
                    validator: (rule, value, callback) => {
                        let number = parseInt(value)
                        if (isNaN(number) || number < 1 || number > 99999) {
                            callback("最大人数必须为1-99999的整数")
                        } else {
                            count_max = number
                            return Promise.resolve()
                        }
                    }
                }]
            },
            input: {
                placeholder: "请输入最大人数"
            }
        }, {
            key: "week_start",
            item: {
                name: "week_start",
                label: "起始周",
                rules: [{
                    required: true,
                    message: "请选择起始周"
                }]
            },
            input: {
                type: "select",
                options: weekStartOption,
                onChange(value) {
                    setWeekOption(weekStartOption.slice(value, weekStartOption.length))
                }
            }
        }, {
            key: "week_end",
            item: {
                name: "week_end",
                label: "结束周",
                rules: [{
                    required: true,
                    message: "请选择结束周"
                }]
            },
            input: {
                type: "select",
                options: weekOption
            }
        }
    ]
    return <PageComponent title="课程安排">
        < Space direction='vertical' size="middle" style={{ width: "100%" }}>
            <MyTable.TableControl
                inputConfig={inputConfig}
                tableColumns={tableColumns}
                validator={validator}
                name={name}
                insertHandle={(...args) => {
                    const api = createApi(tableKeys.TABLE_ARRANGEMENT)
                    return api.insertHandle(...args)
                }}
                updateHandle={api.updateHandle}
            >
                <AddTeacherButton tableName={name} />
                <AddPlaceButton tableName={name} />
                <ClearPlaceButton tableName={name} />
            </MyTable.TableControl>

            <MyTable
                className="table-select"
                name={name}
                tableColumns={tableColumns}
                toNode={toNode}
                queryHandle={api.queryHandle}
                countHandle={api.countHandle}
            />
        </Space >
    </PageComponent >
}

export default CourseArrangement