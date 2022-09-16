/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 16:02:49
 * @FilePath: \classroom-performance\src\pages\home\admin\classroom\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag, message } from 'antd';

import PubSub from 'pubsub-js';

import Classroom from '@/model/Classroom'
import QueryTable from '@/request/utils/QueryTable';
// 教室表格组件
// 用于展示和操作教室信息
const ClassroomTable = (() => {
    // 教室表格列信息
    const columns = [{
        key: "building_name",
        dataIndex: "building_name",
        title: "教学楼"
    }, {
        key: "layer_code",
        dataIndex: "layer_code",
        title: "教室号"
    }, {
        key: "capacity",
        dataIndex: "capacity",
        title: "容纳人数"
    }, {
        key: "control",
        dataIndex: "control",
        title: "操作"
    }]

    // 针对教室类的数据验证函数胡
    const validator = data => {
        // 创建教室类
        const classroom = new Classroom(data)
        // 返回验证结果
        return classroom.toValid()
    }

    // ClassroomTable组件
    return () => {
        const [buildingOptions, setBuildingOptions] = useState([])
        const [canLoading, setCanLoading] = useState(false)
        const name = "page:classroom_management"
        const inputConfig = [
            {
                key: "building_code",
                item: {
                    name: "building_code",
                    label: "教学楼",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    type: "select",
                    placeholder: "请选择教学楼",
                    options: buildingOptions
                }
            },
            {
                key: "layer",
                item: {
                    name: "layer",
                    label: "楼层",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入楼层"
                }
            },
            {
                key: "code",
                item: {
                    name: "code",
                    label: "教室号",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入教室号"
                }
            },
            {
                key: "capacity",
                item: {
                    name: "capacity",
                    label: "容纳人数",
                    rules: [{
                        required: true
                    }]
                },
                input: {
                    placeholder: "请输入容纳人数"
                }
            }
        ]

        useEffect(() => {
            !canLoading && new QueryTable(QueryTable.tableKeys.building).getData()
                .then(({ data }) => {
                    const { result, success } = data;
                    if (success) {
                        setBuildingOptions(
                            result.map(
                                ({ building_code, building_name }) => ({
                                    value: building_code,
                                    label: building_name
                                })
                            )
                        )
                    } else {
                        message.error(data.message)
                    }
                })
                .finally(() => setCanLoading(true))
            canLoading && PubSub.publish("update: updateClassroom", inputConfig)
        })

        // 根据获取的数据转为相应节点
        const toNode = ({ id, building_code, layer, code, capacity }) => {
            // 创建教室类
            const classroom = new Classroom({
                building_code,
                layer,
                code,
                capacity
            })
            classroom.key = id
            // 
            classroom.layer_code = <Tag color="blue">{`${classroom.layer}${classroom.code}`}</Tag>
            classroom.building_name = buildingOptions.filter(item => item.value === classroom.building_code)[0].label
            // 操作列的内容
            classroom.control = (
                <Space size="small">
                    {/* 查看教室信息按钮 */}
                    <MyTable.SeeInfoButton
                        type={QueryTable.tableKeys.classroom}
                        id={id}
                    />
                    {/* 更新教室信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateClassroom"
                        type={QueryTable.tableKeys.classroom}
                        id={id}
                        inputConfig={inputConfig}
                        validator={validator}
                    />
                    {/* 删除教室信息按钮 */}
                    <MyTable.DeleteButton
                        tableName={name}
                        type={QueryTable.tableKeys.classroom}
                        id={id}
                        errorNode={<>确定删除教室？</>}
                    />
                </Space>
            )
            return classroom
        }
        // JSX
        return (
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.classroom}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                />
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.classroom}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "building_code", "layer", "code", "capacity"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        )
    }
})()

// 教室管理页的组件
const ClassroomManagement = () => {
    return (
        <div>
            {/* 标题 */}
            <h3 className="title">教室管理</h3>
            <br />
            {/* 操作数据的表格 */}
            <ClassroomTable />
        </div>
    );
}

export default ClassroomManagement;
