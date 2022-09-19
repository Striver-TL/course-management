/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-18 16:37:46
 * @FilePath: \building-performance\src\pages\home\admin\building\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space } from 'antd';

import Building from '@/model/Building'
import QueryTable from '@/request/utils/QueryTable';
import PageComponent from '@/components/PageComponent'

// 教学楼表格组件
// 用于展示和操作教学楼信息
const BuildingTable = (() => {
    // 教学楼表格列信息
    const columns = [{
        key: "building_code",
        dataIndex: "building_code",
        title: "教学楼"
    }, {
        key: "building_name",
        dataIndex: "building_name",
        title: "教学楼名字"
    }]

    // 针对教学楼类的数据验证函数胡
    const validator = data => {
        // 创建教学楼类
        const building = new Building(data)
        console.log(building.toValid())
        // 返回验证结果
        return building.toValid()
    }

    const inputConfig = [
        {
            key: "building_code",
            item: {
                name: "building_code",
                label: "教学楼编号",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入教学楼编号"
            }
        },
        {
            key: "building_name",
            item: {
                name: "building_name",
                label: "教学楼名字",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入教学楼名字"
            }
        }
    ]
    const name = "page:building_management"
    // 根据获取的数据转为相应节点
    const toNode = ({ id, building_code, building_name }) => {
        // 创建教学楼类
        const building = new Building({
            building_code,
            building_name
        })
        building.key = id
        return building
    }

    // BuildingTable组件
    return () => (
        <PageComponent title="教学楼管理">
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.building}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                >
                    {/* 查看教学楼信息按钮 */}
                    <MyTable.SeeInfoButton
                        tableName={name}
                        type={QueryTable.tableKeys.building}
                    />
                    {/* 更新教学楼信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateBuilding"
                        type={QueryTable.tableKeys.building}
                        inputConfig={inputConfig}
                        validator={validator}
                        tableName={name}
                    />
                    {/* 删除教学楼信息按钮 */}
                    <MyTable.DeleteButton
                        tableName={name}
                        type={QueryTable.tableKeys.building}
                    />
                </MyTable.TableControl>
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.building}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "building_code", "building_name"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        </PageComponent>
    )
})()

export default BuildingTable
