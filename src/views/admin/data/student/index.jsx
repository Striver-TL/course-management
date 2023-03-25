/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-15 21:09:12
 * @FilePath: \student-performance\src\pages\home\admin\student\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';

import PubSub from 'pubsub-js';

import Student from '@/model/Student'
import { store } from '@/redux/store'
import { useState, useEffect } from 'react';
import PageComponent from '@/components/PageComponent';
import createApi from '@/apis/admin/data';
import tableKeys from '@/utils/http/config/tableKeys';

const request = createApi(tableKeys.TABLE_STUDENT);

// 学生表格组件
// 用于展示和操作学生信息
let StudentTable = (() => {
    // 学生表格列信息
    let columns = [{
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
        key: "college_name",
        dataIndex: "college_name",
        title: "学院"
    }, {
        key: "special_name",
        dataIndex: "special_name",
        title: "专业"
    }]

    // 针对学生类的数据验证函数胡
    let validator = data => {
        // 创建学生类
        let student = new Student(data)
        // 返回验证结果
        return student.toValid()
    }

    // StudentTable组件
    return () => {
        let name = "page:student_management"
        let [specialOptions, setSpecialOptions] = useState([])

        let inputConfig = [
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
                        label: "女"
                    }, {
                        value: "1",
                        label: "男"
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
                        let departmentNames = store.getState().departmentNames[value] || {}
                        let specialNames = store.getState().specialNames
                        setSpecialOptions(
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
                    },
                    options: (() => {
                        let collegeNames = store.getState().collegeNames
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
                    options: specialOptions
                }
            }
        ]

        useEffect(() => {
            PubSub.publish("update: updateStudent", inputConfig)
        });

        // 根据获取的数据转为相应节点
        let toNode = ({ id, sno, sname, gender, college_name, special_name }) => {
            // 创建学生类
            let student = new Student({
                sno,
                sname,
                gender
            })
            student.key = id
            // 
            student.gender = <Tag color={gender === "0" ? "pink" : "blue"}>{student.gender === "0" ? "女" : "男"}</Tag>
            student.college_name = college_name
            student.special_name = special_name
            return student
        }

        // JSX
        return (
            <PageComponent title="学生管理">
                <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                    <MyTable.TableControl
                        inputConfig={inputConfig}
                        tableColumns={columns}
                        validator={validator}
                        name={name}
                        insertHandle={request.insertHandle}
                    >
                        {/* 查看学生信息按钮 */}
                        <MyTable.SeeInfoButton
                            tableName={name}
                            type={tableKeys.TABLE_STUDENT}
                            queryHandle={request.queryHandle}
                        />
                        {/* 更新学生信息按钮 */}
                        <MyTable.UpdateButton
                            tableName={name}
                            name="updateStudent"
                            inputConfig={inputConfig}
                            validator={validator}
                            usePubSub={true}
                            queryHandle={request.queryHandle}
                            updateHandle={request.updateHandle}
                        />
                        {/* 删除学生信息按钮 */}
                        <MyTable.DeleteButton
                            tableName={name}
                            deleteHandle={request.deleteHandle}
                        />
                    </MyTable.TableControl>
                    <MyTable
                        // 表格类信息
                        tableColumns={columns}
                        // 查询的字段
                        queryColumns={["students.id id", "sno", "sname", "gender", "specials.id sid", "colleges.id cid", "college_name", "special_name"]}
                        joins={{
                            specials: ["special_code", "special_code"],
                            colleges: ["college_code", "college_code"]
                        }}
                        toNode={toNode}
                        name={name}
                        queryHandle={request.queryHandle}
                        countHandle={request.countHandle}
                    />
                </Space>
            </PageComponent>
        )
    }
})()

export default StudentTable
