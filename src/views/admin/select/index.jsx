/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-17 08:14:33
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-20 22:36:21
 * @FilePath: \student-performance\src\pages\home\admin\select\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from "react";
import { Button, message, Space, Modal, Tag } from 'antd';

import PageComponent from "@/components/PageComponent"
import alertInput, { alertInputTypes } from "@/components/alertInput"
import SelectPlan from "@/model/SelectPlan"
import createDate from "@/utils/base/createDate";
import api from "../../../apis/admin/select";
import "./index.scss"
import MyTable from "@/components/MyTable";
import tableKeys from "../../../utils/http/config/tableKeys";
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
                api.selectplan.insertHandle(selectPlan)
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
                let validator = data => {
                    let selectplan = new SelectPlan(data)
                    let validResult = selectplan.toValid()
                    data.end_time = selectplan.end_time
                    data.start_time = selectplan.start_time
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
                                validator={validator}
                                insertHandle={api.selectplan.insertHandle}
                            >
                                <MyTable.UpdateButton
                                    name="updateSelectplan"
                                    tableName="selectplan"
                                    inputConfig={inputConfig}
                                    validator={validator}
                                    updateHandle={api.selectplan.updateHandle}
                                    queryHandle={api.selectplan.queryHandle}
                                />

                                <MyTable.DeleteButton
                                    tableName="selectplan"
                                    deleteHandle={api.selectplan.deleteHandle}
                                />
                            </MyTable.TableControl>
                            <MyTable
                                className="select-table"
                                name="selectplan"
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
                                queryHandle={api.selectplan.queryHandle}
                                countHandle={api.selectplan.countHandle}
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

// 添加选课课程按钮
let AddSelectCourse = () => {
    // 加载状态
    let [isLoading, setIsLoading] = useState(false);
    // 按钮点击事件处理函数
    let clickHandle = async () => {
        // 按钮加载中
        setIsLoading(true);

        // 获取选课计划
        let { data } = await api.selectplan.queryHandle();
        if (!data.success) {
            message.error("获取选课计划失败");
            setIsLoading(false);
            return;
        }
        let coursePlans = data.result;

        // 获取选课课程
        let arrangementApi = await import("../../../apis/admin/arrangement/index").then(module => module.default);
        let { data: arrangementData } = await arrangementApi.queryHandle();
        if (!arrangementData.success) {
            message.error("获取选课课程失败");
            setIsLoading(false);
            return;
        }
        let arrangements = arrangementData.result;

        // 获取学院数据
        let createApi = await import("../../../apis/admin/data").then(module => module.default),
            // 获取学院数据接口数据
            { data: collegeData } = await createApi(tableKeys.TABLE_COLLEGE).queryHandle({
                columns: ["college_name", "id"]
            }),
            // 学院数据
            colleges = collegeData.result || [],
            // 专业数据
            specials = [];

        // 学院change事件处理函数
        let onCollegeChange = async (value) => {
            // 获取专业数据接口数据
            let { data: specialData } = await createApi(tableKeys.TABLE_SPECIAL).queryHandle({
                // 获取专业名字和专业id
                columns: ["special_name", "specials.id id"],
                // 多表查询
                joins: {
                    departments: ["department_code", "department_code"],
                },
                // 条件
                condition: {
                    college_code: value
                }
            });
            // 成功获取到专业数据
            if (specialData.success) {
                // 重置专业选项数据
                specials.splice(0, specials.length, ...specialData.result.map(item => ({
                    value: item.id,
                    label: item.special_name
                })));
                // 更新
                alertInput(alertInputTypes.update, {
                    name: "addSlectCourse",
                    inputConfig: getInputConfig()
                });
            }
        }
        let getInputConfig = () => [{
            key: "选课计划",
            item: {
                name: "sid",
                label: "选课计划",
                rules: [{
                    required: true,
                    message: "必须选择选课计划"
                }],
            },
            input: {
                type: "select",
                placeholder: "请选择选课计划",
                options: coursePlans.map(item => ({
                    value: item.id,
                    label: item.name
                }))
            }
        }, {
            key: "选课课程",
            item: {
                name: "aid",
                label: "选课课程",
                rules: [{
                    required: true,
                    message: "必须选择选课课程"
                }]
            },
            input: {
                type: "select",
                placeholder: "请选择选课课程",
                options: arrangements.map(item => ({
                    value: item.id,
                    label: `${item.cname}(${item.tname}); ${item.week_start}-${item.week_end}周; ${item.courseplans.map(item => (`${item.building_name} 周${['日', '一', '二', '三', '四', '五', '六'][item.day]} ${item.start_section}-${item.end_section}节`)).join("; ")}`
                }))
            }
        }, {
            key: "指定学院",
            item: {
                name: "cid",
                label: "指定学院",
                rules: [{
                    required: false
                }]
            },
            input: {
                type: "select",
                placeholder: "请选择学院",
                onChange: onCollegeChange,
                options: colleges.map(item => ({
                    value: item.id,
                    label: item.college_name
                }))
            }
        }, {
            key: "指定专业",
            item: {
                name: "pid",
                label: "指定专业",
                rules: [{
                    required: false
                }]
            },
            input: {
                type: "select",
                placeholder: "请选择专业",
                options: specials.concat()
            }
        }];
        alertInput(alertInputTypes.create, {
            title: "添加选课课程",
            name: "addSlectCourse",
            async finish(data, setLoading, modal) {
                setLoading(true);
                setIsLoading(true);
                try {
                    let { data: insertData } = await api.selectcourse.insertHandle(data)
                    if (!insertData.success) message.error(insertData.message)
                    else {
                        message.success("添加选课课程成功")
                        modal.destroy()
                    }
                } catch (e) {
                    message.error("添加选课课程时失败")
                }
                setLoading(false);
            },
            inputConfig: getInputConfig()
        });
    }
    return <Button type="primary" disabled={isLoading} loading={isLoading} onClick={clickHandle}>添加选课课程</Button>
}

// 选课管理组件  
let SelectManagement = () => {
    let tableName = "selectcourse"
    let tableColumns = [{
        key: "name",
        dataIndex: "name",
        title: "选课计划"
    }, {
        key: "cname",
        dataIndex: "cname",
        title: "课程名"
    }, {
        key: "tname",
        dataIndex: "tname",
        title: "教师"
    }, {
        key: "count",
        dataIndex: "count",
        title: "选课人数"
    }, {
        key: "college_name",
        dataIndex: "college_name",
        title: "限制学院"
    }, {
        key: "special_name",
        dataIndex: "special_name",
        title: "限制专业"
    }]

    let toNode = data => {
        data.key = data.id
        data.count = `${data.count}/${data.count_max}`
        return data
    }

    return (
        <PageComponent title="选课管理">
            <Space size="small" style={{
                padding: "0 0 30px"
            }}>
                <AddSelectPlan />
                <SeeSelectPlan />
            </Space>
            <h3>选课课程管理</h3>
            <Space size="small" direction="vertical" style={{
                padding: "0 0 30px",
                width: "100%"
            }}>
                <Space size="small" direction="horizontal">
                    <AddSelectCourse></AddSelectCourse>
                    <MyTable.DeleteButton
                        tableName={tableName}
                        deleteHandle={api.selectcourse.deleteHandle}
                    ></MyTable.DeleteButton>
                </Space>
                <MyTable
                    name={tableName}
                    tableColumns={tableColumns}
                    queryHandle={api.selectcourse.queryHandle}
                    countHandle={api.selectcourse.countHandle}
                    toNode={toNode}
                >
                </MyTable>
            </Space>
        </PageComponent>
    );
}

export default SelectManagement
