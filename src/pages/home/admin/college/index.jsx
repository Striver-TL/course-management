/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-10-26 08:25:52
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space } from 'antd';

// import PubSub from 'pubsub-js';

import College from '@/model/College'
import QueryTable from '@/request/utils/QueryTable';
import PageComponent from '../../../../components/PageComponent';

// 教师表格组件
// 用于展示和操作教师信息
let CollegeTable = (() => {
    // 教师表格列信息
    let columns = [{
        key: "college_code",
        dataIndex: "college_code",
        title: "学院代码"
    }, {
        key: "college_name",
        dataIndex: "college_name",
        title: "学院名字"
    }]

    let inputConfig = [
        {
            key: "college_code",
            item: {
                name: "college_code",
                label: "学院代码",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入学院代码"
            }
        },
        {
            key: "college_name",
            item: {
                name: "college_name",
                label: "学院名字",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入学院名字"
            }
        }
    ]
    // 针对学院类的数据验证函数
    let validator = data => {
        // 创建教师类
        let college = new College(data)
        // 返回验证结果
        return college.toValid()
    }

    let name = "page:college_management"

    // 根据获取的数据转为相应节点
    let toNode = ({ id, college_code, college_name }) => {
        // 创建学院类
        let college = new College({
            college_code,
            college_name
        })
        college.key = id
        return college
    }
    // TeacherTable组件
    return () => (
        <PageComponent title="学院管理">
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.TABLE_COLLEGE}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                >
                    {/* 更新学院信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateCollege"
                        tableName={name}
                        type={QueryTable.tableKeys.TABLE_COLLEGE}
                        inputConfig={inputConfig}
                        validator={validator}
                    />
                    {/* 删除学院信息按钮 */}
                    <MyTable.DeleteButton
                        tableName={name}
                        type={QueryTable.tableKeys.TABLE_COLLEGE}
                    />
                </MyTable.TableControl>
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.TABLE_COLLEGE}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "college_code", "college_name"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        </PageComponent>
    )
})()

export default CollegeTable;
