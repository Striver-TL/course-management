/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-10-26 08:23:33
 * @FilePath: \classroom-performance\src\pages\home\admin\classroom\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag, message } from 'antd';

import PubSub from 'pubsub-js';

import Classroom from '@/model/Classroom'
import QueryTable from '@/request/utils/QueryTable';
import PageComponent from '../../../../components/PageComponent';
// 教室表格组件
// 用于展示和操作教室信息
let ClassroomTable = (() => {
    // 教室表格列信息
    let columns = [{
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
    }]

    // 针对教室类的数据验证函数胡
    let validator = data => {
        // 创建教室类
        let classroom = new Classroom(data)
        // 返回验证结果
        return classroom.toValid()
    }

    // ClassroomTable组件
    return () => {
        let [buildingOptions, setBuildingOptions] = useState([])
        let [canLoading, setCanLoading] = useState(false)
        let name = "page:classroom_management"
        let inputConfig = [
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
            !canLoading && new QueryTable(QueryTable.tableKeys.TABLE_BUILDING).getData()
                .then(({ data }) => {
                    let { result, success } = data;
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
        let toNode = ({ id, building_code, layer, code, capacity }) => {
            // 创建教室类
            let classroom = new Classroom({
                building_code,
                layer,
                code,
                capacity
            })
            classroom.key = id
            // 
            classroom.layer_code = <Tag color="blue">{`${classroom.layer}${classroom.code}`}</Tag>
            classroom.building_name = buildingOptions.filter(item => item.value === classroom.building_code)[0].label
            return classroom
        }
        // JSX
        return (
            <PageComponent title='教室管理'>

                <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                    <MyTable.TableControl
                        inputConfig={inputConfig}
                        type={QueryTable.tableKeys.TABLE_CLASSROOM}
                        tableColumns={columns}
                        validator={validator}
                        name={name}
                    >
                        {/* 查看教室信息按钮 */}
                        <MyTable.SeeInfoButton
                            tableName={name}
                            type={QueryTable.tableKeys.TABLE_CLASSROOM}
                        />
                        {/* 更新教室信息按钮 */}
                        <MyTable.UpdateButton
                            name="updateClassroom"
                            tableName={name}
                            type={QueryTable.tableKeys.TABLE_CLASSROOM}
                            inputConfig={inputConfig}
                            validator={validator}
                            usePubSub={true}
                        />
                        {/* 删除教室信息按钮 */}
                        <MyTable.DeleteButton
                            tableName={name}
                            type={QueryTable.tableKeys.TABLE_CLASSROOM}
                        />
                    </MyTable.TableControl>
                    <MyTable
                        // 数据类型
                        type={QueryTable.tableKeys.TABLE_CLASSROOM}
                        // 表格类信息
                        tableColumns={columns}
                        // 查询的字段
                        queryColumns={["id", "building_code", "layer", "code", "capacity"]}
                        toNode={toNode}
                        name={name}
                    />
                </Space>
            </PageComponent>
        )
    }
})()

export default ClassroomTable
