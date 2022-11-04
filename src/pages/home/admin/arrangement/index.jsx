/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-18 13:48:13
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-04 09:25:19
 * @FilePath: \student-performance\src\pages\home\admin\arrangement\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'
import { Button, Tag, Space } from "antd"

import PageComponent from "@/components/PageComponent";
import MyTable from "@/components/MyTable";
import tableKeys from "@/request/config/tableKeys";
import QueryTable, { tableType } from "@/request/utils/QueryTable"
import Arrangement from "@/model/Arrangement"
import browserType from "@/utils/browserType"

import "./style.scss"

let tableColumns = [{
    key: "name",
    dataIndex: "name",
    title: "课程"
}, {
    key: "tname",
    dataIndex: "tname",
    title: "教师"
}, {
    key: "week_start_end",
    dataIndex: "week_start_end",
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

browserType({
    client() {
        tableColumns.push({
            key: "create_time",
            dataIndex: "create_time",
            title: "创建时间"
        })
    }
})


let toNode = (data) => {
    data.name = <Button type="link">{data.name}</Button>
    data.tname = data.tname ? <Button type="ghost">{data.tname}</Button> : "无"
    data.key = data.id
    data.week_start_end = <Tag color="blue">{data.week_start}-{data.week_end}周</Tag>
    browserType({
        client() {
            data.create_time = <Tag color="green">{data.create_time}</Tag>
        },
        mobile() {
            delete data.create_time
        }
    })
    data.count = <Tag color="gray">{data.count}</Tag>
    data.count_max = <Tag color="gray">{data.count_max}</Tag>
    return data
}

let validator = (data) => {
    let arrangement = new Arrangement(data)
    return arrangement.toValid({
        cno: "课程号格式有误",
        tno: "教工号格式有误",
        week_start: "起始周格式有误",
        week_end: "结束周格式有误",
        count: "选课人数格式有误",
        count_max: "最大选课人数格式有误"
    })
}

let name = "arrangement table"

let CourseArrangement = () => {
    const [weekOption, setWeekOption] = useState([])
    const weekStartOption = []
    for (var i = 1; i <= 20; i++) weekStartOption.push({value: i.toString()})
    let inputConfig = [{
        key: "cno",
        item: {
            name: "cno",
            label: "课程号",
            rules: [
                {
                    required: true,
                    message: "请输入课程号"
                }
            ]
        },
        input: {
            placholder: "请输入课程号"
        }
    }, {
        key: "tno",
        item: {
            name: "tno",
            label: "教师"
        },
        input: {
            type: "select",
            placholder: "选择教师",
            options: []
        }
    }, {
        key: "max_count"
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
    }]
    return <PageComponent title="课程安排">
        < Space direction='vertical' size="middle" style={{ width: "100%" }}>
            <MyTable.TableControl
                inputConfig={inputConfig}
                type={QueryTable.tableKeys.TABLE_ARRANGEMENT}
                tableColumns={tableColumns}
                validator={validator}
                name={name}
            >
            </MyTable.TableControl>

            <MyTable
                name={name}
                type={tableKeys.TABLE_ARRANGEMENT}
                tableColumns={tableColumns}
                queryColumns={[`${tableType[tableKeys.TABLE_ARRANGEMENT]}.create_time`, "count", "count_max", `${tableType[tableKeys.TABLE_ARRANGEMENT]}.id id`, `${tableType[tableKeys.TABLE_TEACHER]}.id tid`, `${tableType[tableKeys.TABLE_COURSE]}.id cid`, "name", "tname", "week_start", "week_end"]}
                joins={{
                    [tableType[tableKeys.TABLE_TEACHER]]: ["tno", "tno"],
                    [tableType[tableKeys.TABLE_COURSE]]: ["cno", "cno"]
                }}
                toNode={toNode}
            />
        </Space >
    </PageComponent >
}

export default CourseArrangement