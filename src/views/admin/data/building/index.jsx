/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-16 09:11:09
 * @FilePath: \building-performance\src\pages\home\admin\building\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space } from 'antd';

import Building from '@/model/Building'
import PageComponent from '@/components/PageComponent'
import tableKeys from '@/utils/http/config/tableKeys';
import createApi from "@/apis/admin/data";

const request = createApi(tableKeys.TABLE_BUILDING);

// 教学楼表格组件
// 用于展示和操作教学楼信息
let BuildingTable = (() => {
    // 教学楼表格列信息
    let columns = [{
        key: "building_code",
        dataIndex: "building_code",
        title: "教学楼"
    }, {
        key: "building_name",
        dataIndex: "building_name",
        title: "教学楼名字"
    }]

    // 针对教学楼类的数据验证函数胡
    let validator = data => {
        // 创建教学楼类
        let building = new Building(data)
        console.log(building.toValid())
        // 返回验证结果
        return building.toValid()
    }

    let inputConfig = [
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
    let name = "page:building_management"
    // 根据获取的数据转为相应节点
    let toNode = ({ id, building_code, building_name }) => {
        // 创建教学楼类
        let building = new Building({
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
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                    insertHandle={request.insertHandle}
                >
                    {/* 查看教学楼信息按钮 */}
                    <MyTable.SeeInfoButton
                        tableName={name}
                        queryHandle={request.queryHandle}
                        type={tableKeys.TABLE_BUILDING}
                    />
                    {/* 更新教学楼信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateBuilding"
                        inputConfig={inputConfig}
                        validator={validator}
                        tableName={name}
                        updateHandle={request.updateHandle}
                        queryHandle={request.queryHandle}
                    />
                    {/* 删除教学楼信息按钮 */}
                    <MyTable.DeleteButton
                        tableName={name}
                        deleteHandle={request.deleteHandle}
                    />
                </MyTable.TableControl>
                <MyTable
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "building_code", "building_name"]}
                    toNode={toNode}
                    name={name}
                    queryHandle={request.queryHandle}
                    countHandle={request.countHandle}
                />
            </Space>
        </PageComponent>
    )
})()

export default BuildingTable
