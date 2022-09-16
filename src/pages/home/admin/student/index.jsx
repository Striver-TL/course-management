/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 16:03:55
 * @FilePath: \student-performance\src\pages\home\admin\student\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';

import PubSub from 'pubsub-js';

import Student from '@/model/Student'
import QueryTable from '@/request/utils/QueryTable';
import { store } from '@/redux/store'
import { useState, useEffect } from 'react';

// 学生表格组件
// 用于展示和操作学生信息
const StudentTable = (() => {
    // 学生表格列信息
    const columns = [{
        key: "sno",
        dataIndex: "sno",
        title: "学号"
    }, {
        key: "sname",
        dataIndex: "sname",
        title: "学生姓名"
    }, {
        key: "gender",
        dataIndex: "gender",
        title: "性别"
    }, {
        key: "control",
        dataIndex: "control",
        title: "操作"
    }]

    // 针对学生类的数据验证函数胡
    const validator = data => {
        // 创建学生类
        const student = new Student(data)
        // 返回验证结果
        return student.toValid()
    }

    // StudentTable组件
    return () => {
        const name = "page:student_management"
        const [specialOptions, setSpecialOptions] = useState([])

        const inputConfig = [
            {
                key: "sno",
                item: {
                    name: "sno",
                    label: "学号",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入学号"
                }
            },
            {
                key: "sname",
                item: {
                    name: "sname",
                    label: "学生姓名",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入学生姓名"
                }
            },
            {
                key: "gender",
                item: {
                    name: "gender",
                    label: "性  别",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    type: "select",
                    options: [{
                        value: "0",
                        title: "女"
                    }, {
                        value: "1",
                        title: "男"
                    }]
                }
            },
            {
                key: "birthday",
                item: {
                    name: "birthday",
                    label: "生  日",
                },
                input: {
                    type: "date",
                    picker: {
                        mode: "date",
                        placeholder: "请选择/输入出生日期"
                    }
                }
            },
            {
                key: "phone",
                item: {
                    name: "phone",
                    label: "手机号"
                },
                input: {
                    placeholder: "请输入手机号"
                }
            },
            {
                key: "email",
                item: {
                    name: "email",
                    label: "邮  箱"
                },
                input: {
                    placeholder: "请输入邮箱"
                }
            },
            {
                key: "college_code",
                item: {
                    name: "college_code",
                    label: "学  院"
                },
                input: {
                    type: "select",
                    placeholder: "请选择学院",
                    onChange: value => {
                        const departmentNames = store.getState().departmentNames[value] || {}
                        const specialNames = store.getState().specialNames
                        setSpecialOptions(
                            [{
                                value: "",
                                label: "不选择"
                            }].concat(
                                Reflect
                                    .ownKeys(departmentNames)
                                    .reduce(
                                        (prevent, name) => {
                                            let specials = specialNames[name]
                                            if (specials) {
                                                prevent.push(...Reflect.ownKeys(specials).map(name => ({
                                                    value: name,
                                                    label: specials[name]
                                                })))
                                            }
                                            return prevent
                                        },
                                        []
                                    )
                            )
                        )
                    },
                    options: (() => {
                        const collegeNames = store.getState().collegeNames
                        return Reflect.ownKeys(collegeNames).map(name => ({ label: collegeNames[name], value: name }))
                    })()
                }
            },
            {
                key: "special_code",
                item: {
                    name: "special_code",
                    label: "专  业"
                },
                input: {
                    placeholder: "请选择专业",
                    type: "select",
                    options: [{
                        value: "",
                        label: "不选择"
                    }].concat(specialOptions)
                }
            }
        ]

        useEffect(() => {
            PubSub.publish("update: updateStudent", inputConfig)
        });

        // 根据获取的数据转为相应节点
        const toNode = ({ id, sno, sname, gender }) => {
            // 创建学生类
            const student = new Student({
                sno,
                sname,
                gender
            })
            student.key = id
            // 
            student.gender = <Tag color={gender === "0" ? "pink" : "blue"}>{student.genderLabel}</Tag>
            // 操作列的内容
            student.control = (
                <Space size="small">
                    {/* 查看学生信息按钮 */}
                    <MyTable.SeeInfoButton
                        type={QueryTable.tableKeys.student}
                        id={id}
                    />
                    {/* 更新学生信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateStudent"
                        type={QueryTable.tableKeys.student}
                        id={id}
                        inputConfig={inputConfig}
                        validator={validator}
                    />
                    {/* 删除学生信息按钮 */}
                    <MyTable.DeleteButton
                        tableName={name}
                        type={QueryTable.tableKeys.student}
                        id={id}
                        errorNode={<>确定删除学号为<Tag color="red">{sno}</Tag>的学生数据？</>}
                    />
                </Space>
            )
            return student
        }

        // JSX
        return (
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.student}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                />
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.student}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "sno", "sname", "gender"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        )
    }
})()

// 学生管理页的组件
const StudentManagement = () => {
    return (
        <div>
            {/* 标题 */}
            <h3 className="title">学生管理</h3>
            <br />
            {/* 操作数据的表格 */}
            <StudentTable />
        </div>
    );
}

export default StudentManagement;
