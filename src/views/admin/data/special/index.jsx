/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-23 08:49:29
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space } from 'antd';

import PubSub from 'pubsub-js';

import Special from '@/model/Special'
import { store } from '@/redux/store';
import { useState, useEffect } from 'react';
import PageComponent from '@/components/PageComponent';
import createApi from '@/apis/admin/data';
import tableKeys from '@/utils/http/config/tableKeys';

const request = createApi(tableKeys.TABLE_SPECIAL);

// 教师表格组件
// 用于展示和操作教师信息
let SpecialTable = (() => {
    // 教师表格列信息
    let columns = [{
        key: "special_code",
        dataIndex: "special_code",
        title: "专业代码"
    }, {
        key: "special_name",
        dataIndex: "special_name",
        title: "专业名字"
    }, {
        key: "department_name",
        dataIndex: "department_name",
        title: "所属院系"
    }]

    let collegeNames = store.getState().collegeNames

    // 针对专业类的数据验证函数
    let validator = data => {
        // 创建教师类
        let special = new Special(data)
        // 返回验证结果
        return special.toValid({
            special_code: "专业代码格式有误",
            special_name: "专业名称格式有误",
            department_code: "院系代码格式有误"
        })
    }

    // TeacherTable组件
    return () => {
        let [departmentData, setDepartmentData] = useState([])
        let inputConfig = [
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
                notSql: true,
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
                        console.log(key, departmentNames)
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

        let departmentNames = store.getState().departmentNames
        departmentNames = Object.getOwnPropertyNames(departmentNames).reduce((obj, name) => {
            for (let key in departmentNames[name]) obj[key] = departmentNames[name][key]
            return obj
        }, {})
        // 根据获取的数据转为相应节点
        let toNode = ({ id, special_code, special_name, department_code }) => {
            // 创建专业类
            let special = new Special({
                special_code,
                special_name,
                department_code
            })
            special.key = id
            special.department_name = departmentNames[department_code]
            return special
        }

        let name = "page:special_management"
        // JSX
        return (
            <PageComponent title="专业管理">
                <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                    <MyTable.TableControl
                        inputConfig={inputConfig}
                        tableColumns={columns}
                        validator={validator}
                        name={name}
                        insertHandle={request.insertHandle}
                    >
                        {/* 更新专业信息按钮 */}
                        <MyTable.UpdateButton
                            name="updateSpecial"
                            tableName={name}
                            inputConfig={inputConfig}
                            validator={validator}
                            usePubSub={true}
                            updateHandle={request.updateHandle}
                            queryHandle={request.queryHandle}
                        />
                        {/* 删除专业信息按钮 */}
                        <MyTable.DeleteButton
                            tableName={name}
                            deleteHandle={request.deleteHandle}
                        />
                    </MyTable.TableControl>
                    <MyTable
                        // 表格类信息
                        tableColumns={columns}
                        // 查询的字段
                        queryColumns={["id", "special_code", "special_name", "department_code"]}
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

export default SpecialTable
