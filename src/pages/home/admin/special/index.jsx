/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 09:01:44
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';

import PubSub from 'pubsub-js';

import Special from '@/model/Special'
import QueryTable from '@/request/utils/QueryTable';
import { store } from '../../../../redux/store';
import { useState, useEffect } from 'react';

// 教师表格组件
// 用于展示和操作教师信息
const SpecialTable = (() => {
    // 教师表格列信息
    const columns = [{
        key: "special_code",
        dataIndex: "special_code",
        title: "专业代码"
    }, {
        key: "special_name",
        dataIndex: "special_name",
        title: "专业名字"
    }, {
        key: "college_name",
        dataIndex: "college_name",
        title: "所属学院"
    }, {
        key: "department_name",
        dataIndex: "department_name",
        title: "所属院系"
    }, {
        key: "control",
        dataIndex: "control",
        title: "操作"
    }]

    const collegeNames = store.getState().collegeNames

    // 针对专业类的数据验证函数
    const validator = data => {
        // 创建教师类
        const special = new Special(data)
        // 返回验证结果
        return special.toValid()
    }

    // TeacherTable组件
    return () => {
        const [departmentData, setDepartmentData] = useState([])
        const inputConfig = [
            {
                key: "special_code",
                item: {
                    name: "special_code",
                    label: "专业代码",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入专业代码"
                }
            },
            {
                key: "special_name",
                item: {
                    name: "special_name",
                    label: "专业名字",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入专业名字"
                }
            },
            {
                key: "college_code",
                item: {
                    name: "college_code",
                    label: "所属学院",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    type: "select",
                    placeholder: "请选择学院",
                    onChange: key => {
                        let departmentNames = store.getState().departmentNames[key] || {};
                        setDepartmentData(Reflect.ownKeys(departmentNames).map(name => ({
                            label: departmentNames[name],
                            value: name
                        })))
                    },
                    options: Reflect.ownKeys(collegeNames).map(name => ({
                        value: name,
                        label: collegeNames[name]
                    }))
                }
            },
            {
                key: "department_code",
                item: {
                    name: "department_code",
                    label: "所属院系",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    type: "select",
                    placeholder: "请选择院系",
                    options: departmentData
                }
            }
        ]

        useEffect(() => {
            PubSub.publish("update: updateSpecial", inputConfig)
        })

        // 根据获取的数据转为相应节点
        const toNode = ({ id, special_code, special_name, college_code }) => {
            // 创建专业类
            const special = new Special({
                special_code,
                special_name,
                college_code
            })
            special.key = id
            special.college_name = collegeNames[college_code]
            // 操作列的内容
            special.control = (
                <Space size="small">
                    {/* 更新专业信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateSpecial"
                        type={QueryTable.tableKeys.special}
                        id={id}
                        inputConfig={inputConfig}
                        validator={validator}
                    />
                    {/* 删除专业信息按钮 */}
                    <MyTable.DeleteButton
                        name="deleteTeacher"
                        type={QueryTable.tableKeys.special}
                        id={id}
                        errorNode={<>确定删除专业代码为<Tag color="red">{special_code}</Tag>的专业数据？</>}
                    />
                </Space>
            )
            return special
        }

        const name = "page:special_management"
        // JSX
        return (
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.special}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                />
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.special}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "special_code", "special_name", "college_code"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        )
    }
})()

// 教师管理页的组件
const SpecialManagement = () => {
    return (
        <div>
            {/* 标题 */}
            <h3 className="title">专业管理</h3>
            <br />
            {/* 操作数据的表格 */}
            <SpecialTable />
        </div>
    );
}

export default SpecialManagement;
