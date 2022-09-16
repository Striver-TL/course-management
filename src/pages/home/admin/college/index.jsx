/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 15:55:01
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';

// import PubSub from 'pubsub-js';

import College from '@/model/College'
import QueryTable from '@/request/utils/QueryTable';

// 教师表格组件
// 用于展示和操作教师信息
const CollegeTable = (() => {
    // 教师表格列信息
    const columns = [{
        key: "college_code",
        dataIndex: "college_code",
        title: "学院代码"
    }, {
        key: "college_name",
        dataIndex: "college_name",
        title: "学院名字"
    }, {
        key: "control",
        dataIndex: "control",
        title: "操作"
    }]

    const inputConfig = [
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
    const validator = data => {
        // 创建教师类
        const college = new College(data)
        // 返回验证结果
        return college.toValid()
    }

    const name = "page:college_management"

    // 根据获取的数据转为相应节点
    const toNode = ({ id, college_code, college_name }) => {
        // 创建学院类
        const college = new College({
            college_code,
            college_name
        })
        college.key = id
        // 操作列的内容
        college.control = (
            <Space size="small">
                {/* 更新学院信息按钮 */}
                <MyTable.UpdateButton
                    name="updateCollege"
                    type={QueryTable.tableKeys.college}
                    id={id}
                    inputConfig={inputConfig}
                    validator={validator}
                />
                {/* 删除学院信息按钮 */}
                <MyTable.DeleteButton
                    tableName={name}
                    type={QueryTable.tableKeys.college}
                    id={id}
                    errorNode={<>确定删除学院代码为<Tag color="red">{college_code}</Tag>的学院数据？</>}
                />
            </Space>
        )
        return college
    }
    // TeacherTable组件
    return () => {
        // JSX
        return (
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.college}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                />
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.college}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "college_code", "college_name"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        )
    }
})()

// 教师管理页的组件
const CollegeManagement = () => {
    return (
        <div>
            {/* 标题 */}
            <h3 className="title">学院管理</h3>
            <br />
            {/* 操作数据的表格 */}
            <CollegeTable />
        </div>
    );
}

export default CollegeManagement;
