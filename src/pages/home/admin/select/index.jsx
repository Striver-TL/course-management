/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-17 08:14:33
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-10-26 08:27:26
 * @FilePath: \student-performance\src\pages\home\admin\select\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import { Button, message, Space, Modal, Tag } from 'antd';
import * as echarts from 'echarts'

import PageComponent from "../../../../components/PageComponent"
import QueryTable from '@/request/utils/QueryTable'
import tableKeys from "../../../../request/config/tableKeys"
import alertInput, { alertInputTypes } from "@/components/alertInput"
import SelectPlan from "@/model/SelectPlan"
import createDate from "../../../../utils/createDate";
import request from "@/request"
import "./index.scss"

let pieId = "student-select-pie"

// 创建学生选课数据折线图
let createStudentSelectPie = () => {
    // 创建echarts实例
    let echart = echarts.init(document.getElementById(pieId), "light", {
        renderer: "canvas"
    })
    // 调用接口获取数据
    request
        .post("/getSelectCount")
        .then(({ data }) => {
            // 成功获取数据
            if (data.success) {
                // 参与操作
                let arr = [0, 0, 0, 0, 0, 0, 0]
                // 当前时间
                let date = new Date()
                // 折线图的数据
                let result = []
                // 水平坐标数据
                let xAxisData = arr.map(
                    (_, index) => {
                        // 向前退一天
                        if (index !== 0) {
                            date.setDate(date.getDate() - 1)
                        }
                        // 插入数据
                        result.unshift(
                            // 先判断是否获取到数据
                            // 然后过滤出指定时间的数据
                            // 上面的条件不通过都会返回0
                            // 最后将数据插入到数组中
                            (data.result || 0) && ((data.result.filter(
                                ({ time }) => new Date(time).getDate() === date.getDate()
                            )[0] || { count: 0 }).count)
                        )
                        return `${date.getMonth() + 1}.${date.getDate()}`
                    }
                )
                    .reverse()

                let axisLine = {
                    show: true,
                    lineStyle: {
                        color: "#333"
                    }
                }

                echart.setOption({
                    legend: {
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxisData,
                        axisLine
                    },
                    yAxis: {
                        type: 'value',
                        axisLine
                    },
                    series: [
                        {
                            name: "学生每日选课数",
                            data: result,
                            type: 'line',
                            lineStyle: {
                                color: "#f33",
                                width: 1
                            },
                            itemStyle: {
                                color: "#10AC6C",
                            },
                            label: {
                                show: true,
                                textStyle: {
                                    fontSize: 12
                                },
                                formatter: "{c}次"
                            }
                        }
                    ]
                });
            }
        })
}

let inputConfig = [{
    key: "name",
    item: {
        name: "name",
        label: "描述",
        rules: [{
            required: true,
            message: "选课计划描述必须填写"
        }, {
            validator(_, value, fn) {
                let flag = new SelectPlan({
                    name: value
                }).validValue("name", value)
                console.log(flag)
                return !flag ? fn("选课描述必须为5-50位，包含：数字、字母、下划线、中文、括号") : fn()
            }
        }]
    },
    input: {
        placeholder: "请输入选课计划描述"
    }
}, {
    key: "start_time",
    item: {
        name: "start_time",
        label: "开始时间"
    },
    input: {
        type: "date",
        picker: {
            placeholder: "请选择开始时间"
        }
    }
}, {
    key: "end_time",
    item: {
        name: "end_time",
        label: "结束时间"
    },
    input: {
        type: "date",
        picker: {
            placeholder: "请选择结束时间"
        }
    }
}]

let AddSelectPlan = () => {
    let clickHandle = () => {
        alertInput(alertInputTypes.create, {
            inputConfig,
            title: "创建选课计划",
            name: "publishselectplan",
            finish(data, setLoading, model) {
                let selectPlan = new SelectPlan(data)
                let validResult = selectPlan.toValid()
                if (validResult.err) {
                    message.error([validResult.key])
                }
                let queryTable = new QueryTable(tableKeys.TABLE_SELECTPLAN)
                queryTable.insertData(selectPlan)
                    .then(({ data }) => {
                        let { success, key } = data
                        if (success) {
                            message.success("选课计划创建成功")
                            model.destroy()
                        } else {
                            message.error(data.message)
                            if (key) {
                                message.error({
                                    desc: "选课计划描述",
                                    start_time: "选课开始时间",
                                    end_time: "选课结束时间"
                                }[key] + "格式有误")
                            }
                        }
                    })
                    .finally(() => setLoading(false))
            }
        })
    }

    return (
        <Button type="primary" onClick={clickHandle}>发布选课计划</Button>
    )
}

let SeeSelectPlan = () => {
    let [isLoading, setIsLoading] = useState(false);
    let clickHandle = () => {
        setIsLoading(true)
        import("@/components/MyTable")
            .then(module => module.default)
            .then(MyTable => {
                let validator = (selectplan) => {
                    selectplan = new SelectPlan(selectplan)
                    let validResult = selectplan.toValid()
                    return validResult
                }
                Modal.confirm({
                    title: "选课计划",
                    width: document.documentElement.clientWidth <= 767 ? "14rem" : "700px",
                    onOk: () => setIsLoading(false),
                    onCancel: () => setIsLoading(false),
                    okText: "确定",
                    okCancel: false,
                    icon: <></>,
                    closable: true,
                    content: (
                        <Space size="small" direction="vertical" style={{ width: "100%" }}>
                            <MyTable.TableControl
                                name="selectplan"
                                inputConfig={inputConfig}
                                type={tableKeys.TABLE_SELECTPLAN}
                                validator={validator}
                            >
                                <MyTable.UpdateButton
                                    name="updateSelectplan"
                                    tableName="selectplan"
                                    type={tableKeys.TABLE_SELECTPLAN}
                                    inputConfig={inputConfig}
                                    validator={validator}
                                />

                                <MyTable.DeleteButton
                                    tableName="selectplan"
                                    type={tableKeys.TABLE_SELECTPLAN}
                                />
                            </MyTable.TableControl>
                            <MyTable
                                className="select-table"
                                name="selectplan"
                                type={tableKeys.TABLE_SELECTPLAN}
                                queryColumns={["id", "name", "start_time", "end_time"]}
                                tableColumns={
                                    [
                                        {
                                            key: "name",
                                            dataIndex: "name",
                                            title: "描述"
                                        },
                                        {
                                            key: "start_time",
                                            dataIndex: "start_time",
                                            title: "开始时间"
                                        },
                                        {
                                            key: "end_time",
                                            dataIndex: "end_time",
                                            title: "结束时间"
                                        },
                                        {
                                            key: "state",
                                            dataIndex: "state",
                                            title: "状态"
                                        }
                                    ]
                                }
                                toNode={selectplan => {
                                    selectplan.key = selectplan.id
                                    let start = selectplan.start_time && createDate(selectplan.start_time)
                                    let end = createDate(selectplan.end_time)
                                    if (start) {
                                        if (start.getTime() < Date.now() && (!end || Date.now() < end.getTime())) {
                                            selectplan.state = <h4 style={{ color: "green" }}>进行中</h4>
                                        } else {
                                            if (selectplan.end_time) {
                                                if (end.getTime() < Date.now()) {
                                                    selectplan.state = <h4 style={{ color: "red" }}>已结束</h4>
                                                } else {
                                                    selectplan.state = <h4 style={{ color: "#666" }}>未开始</h4>
                                                }
                                            } else {
                                                selectplan.state = <h4 style={{ color: "#666" }}>未开始</h4>
                                            }
                                        }
                                    } else {
                                        selectplan.state = <h4 style={{ color: "#ccc" }}>未设置</h4>
                                    }
                                    selectplan.start_time = !selectplan.start_time ? <Tag color="#ccc">未设置</Tag> : <h5 style={{ color: "green" }}>{selectplan.start_time}</h5>
                                    selectplan.end_time = !selectplan.end_time ? <Tag color="#ccc">未设置</Tag> : <h5 style={{ color: "red" }}>{selectplan.end_time}</h5>
                                    return selectplan
                                }}
                            />
                        </Space>
                    )
                })
            })
            .catch(() => {
                message.error("加载组件时失败")
                setIsLoading(false)
            })
    }
    return <Button type="ghost" disabled={isLoading} loading={isLoading} onClick={clickHandle}>查看选课计划</Button>
}

// 选课管理组件  
let SelectManagement = () => {
    let [loading, setLoading] = useState(true)
    loading && new QueryTable(tableKeys.TABLE_SELECTPLAN).getData()
        .then(({ data }) => {
            let { success } = data
            if (success) {
                message.success("已成功获取选课计划")
            } else {
                message.error("获取选课计划失败")
            }
        })
        .finally(() => {
            createStudentSelectPie()
            setLoading(false)
        })
    return (
        <PageComponent title="选课管理">
            <Space size="small" style={{
                padding: "0 0 30px"
            }}>
                <AddSelectPlan />
                <SeeSelectPlan />
            </Space>
            <h3>学生选课管理</h3>
            <div id={pieId} className="select-count-pie"></div>
        </PageComponent>
    );
}


export default SelectManagement
