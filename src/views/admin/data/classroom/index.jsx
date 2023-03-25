/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-25 10:37:24
 * @FilePath: \classroom-performance\src\pages\home\admin\classroom\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';


import Classroom from '@/model/Classroom'
import QueryTable from '@/utils/http/utils/QueryTable';
import tableKeys from '@/utils/http/config/tableKeys';
import PageComponent from '@/components/PageComponent';
import createApi from "@/apis/admin/data";

const request = createApi(tableKeys.TABLE_CLASSROOM);
const buildingApi = createApi(tableKeys.TABLE_BUILDING)

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
        let name = "page:classroom_management"
        let inputConfig = [
            {
                key: "bid",
                item: {
                    name: "bid",
                    label: "教学楼",
                    rules: [{
                        required: true,
                        message: "请选择教学楼"
                    }]
                },
                input: {
                    type: "modal",
                    placeholder: "请选择教学楼",
                    queryHandle: buildingApi.queryHandle,
                    countHandle: buildingApi.countHandle,
                    name,
                    queryColumns: ["id", "building_code", "building_name"],
                    tableColumns: [{
                        key: "building_code",
                        dataIndex: "building_code",
                        title: "教学楼代码"
                    }, {
                        key: "building_name",
                        dataIndex: "building_name",
                        title: "教学楼名字"
                    }],
                    toNode: data => {
                        data.key = data.id
                        return data
                    }
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

        // 根据获取的数据转为相应节点
        let toNode = (classroom) => {
            let { id,layer, code } = classroom
            // 创建教室类
            classroom.key = id
            // 
            classroom.layer_code = <Tag color="blue">{`${layer}${code}`}</Tag>
            return classroom
        }
        // JSX
        return (
            <PageComponent title='教室管理'>

                <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                    <MyTable.TableControl
                        inputConfig={inputConfig}
                        tableColumns={columns}
                        validator={validator}
                        name={name}
                        insertHandle={request.insertHandle}
                    >
                        {/* 查看教室信息按钮 */}
                        <MyTable.SeeInfoButton
                            tableName={name}
                            type={QueryTable.tableKeys.TABLE_CLASSROOM}
                            queryHandle={request.queryHandle}
                        />
                        {/* 更新教室信息按钮 */}
                        <MyTable.UpdateButton
                            name="updateClassroom"
                            tableName={name}
                            inputConfig={inputConfig}
                            validator={validator}
                            usePubSub={true}
                            queryHandle={request.queryHandle}
                            updateHandle={request.updateHandle}
                        />
                        {/* 删除教室信息按钮 */}
                        <MyTable.DeleteButton
                            tableName={name}
                            deleteHandle={request.deleteHandle}
                        />
                    </MyTable.TableControl>
                    <MyTable
                        // 数据类型
                        type={QueryTable.tableKeys.TABLE_CLASSROOM}
                        // 表格类信息
                        tableColumns={columns}
                        // 查询的字段
                        queryColumns={["classrooms.id id", "building_name", "layer", "code", "capacity"]}
                        toNode={toNode}
                        name={name}
                        queryHandle={request.queryHandle}
                        countHandle={request.countHandle}
                        joins={{
                            buildings: ["bid", "id"]
                        }}
                    />
                </Space>
            </PageComponent>
        )
    }
})()

export default ClassroomTable
