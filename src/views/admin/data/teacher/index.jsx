/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-14 16:32:15
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';
import PubSub from 'pubsub-js';
import Teacher from '@/model/Teacher'
import { store } from "@/redux/store"
import { useState, useEffect } from 'react';
import PageComponent from '@/components/PageComponent';
import createApi from '@/apis/admin/data';
import tableKeys from '@/utils/http/config/tableKeys';

const request = createApi(tableKeys.TABLE_TEACHER);

// 教师表格组件
// 用于展示和操作教师信息
let TeacherTable = (() => {
    // 教师表格列信息
    let columns = [{
        key: "tno",
        dataIndex: "tno",
        title: "教师号"
    }, {
        key: "tname",
        dataIndex: "tname",
        title: "教师姓名"
    }, {
        key: "gender",
        dataIndex: "gender",
        title: "性别"
    }]

    // 针对教师类的数据验证函数
    let validator = data => {
        // 创建教师类
        let teacher = new Teacher(data)
        // 返回验证结果
        return teacher.toValid({
            tno: "教工号格式有误",
            tname: "教师名格式有误",
            gender: "性别格式有误",
            birthday: "生日格式有误",
            college_code: "学院代码格式有误",
            department_code: "院系代码格式有误"
        })
    }


    // TeacherTable组件
    return () => {
        let [departmentOptions, setDepartmentOptions] = useState([])
        let name = "page:teacher_management"

        let inputConfig = [
            {
                key: "tno",
                item: {
                    name: "tno",
                    label: "教工号",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入教工号"
                }
            },
            {
                key: "tname",
                item: {
                    name: "tname",
                    label: "教师名",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入教师名"
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
                    placeholder: "请选择性别",
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
                    options: (() => {
                        let collegeNames = store.getState().collegeNames
                        return Reflect.ownKeys(collegeNames)
                            .map(name => ({ value: name, label: collegeNames[name] }))
                    })(),
                    onChange(key) {
                        let departmentNames = store.getState().departmentNames[key]
                        setDepartmentOptions(Reflect.ownKeys(departmentNames || {}).map(name => ({
                            value: name,
                            label: departmentNames[name]
                        }))
                        )
                    }
                }
            },
            {
                key: "department_code",
                item: {
                    name: "department_code",
                    label: "院  系"
                },
                input: {
                    placeholder: "请选择院系",
                    type: "select",
                    options: departmentOptions
                }
            }
        ]

        useEffect(() => {
            PubSub.publish("update: updateTeacher", inputConfig)
        });

        // 根据获取的数据转为相应节点
        let toNode = ({ tno, tname, gender }) => {
            // 创建教师类
            let teacher = new Teacher({
                tno,
                tname,
                gender
            })
            teacher.key = tno
            // 
            teacher.gender = <Tag color={gender === "0" ? "pink" : "blue"}>{gender === "0" ? "女" : "男"}</Tag>
            return teacher
        }

        // JSX
        return (
            <PageComponent title="教师管理">
                <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                    <MyTable.TableControl
                        inputConfig={inputConfig}
                        tableColumns={columns}
                        validator={validator}
                        name={name}
                        insertHandle={request.insertHandle}
                    >
                        {/* 查看教师信息按钮 */}
                        <MyTable.SeeInfoButton
                            type={tableKeys.TABLE_TEACHER}
                            tableName={name}
                            queryHandle={request.queryHandle}
                        />
                        {/* 更新教师信息按钮 */}
                        <MyTable.UpdateButton
                            name="updateTeacher"
                            tableName={name}
                            inputConfig={inputConfig}
                            validator={validator}
                            usePubSub={true}
                            queryHandle={request.queryHandle}
                            updateHandle={request.updateHandle}
                        />
                        {/* 删除教师信息按钮 */}
                        <MyTable.DeleteButton
                            tableName={name}
                            deleteHandle={request.deleteHandle}
                        />
                    </MyTable.TableControl>
                    <MyTable
                        // 表格类信息
                        tableColumns={columns}
                        // 查询的字段
                        queryColumns={["id", "tno", "tname", "gender"]}
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

export default TeacherTable
