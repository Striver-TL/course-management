/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 15:55:28
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable'
import { Space, Tag } from 'antd';

import Department from '@/model/Department'
import QueryTable from '@/request/utils/QueryTable';
import { store } from '../../../../redux/store';

// 教师表格组件
// 用于展示和操作教师信息
const DepartmentTable = (() => {
    // 教师表格列信息
    const columns = [{
        key: "department_code",
        dataIndex: "department_code",
        title: "院系代码"
    }, {
        key: "department_name",
        dataIndex: "department_name",
        title: "院系名字"
    }, {
        key: "college_name",
        dataIndex: "college_name",
        title: "所属学院"
    }, {
        key: "control",
        dataIndex: "control",
        title: "操作"
    }]

    const collegeNames = store.getState().collegeNames

    const inputConfig = [
        {
            key: "department_code",
            item: {
                name: "department_code",
                label: "院系代码",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入院系代码"
            }
        },
        {
            key: "department_name",
            item: {
                name: "department_name",
                label: "院系名字",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入院系名字"
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
                options: Reflect.ownKeys(collegeNames).map(name => ({
                    value: name,
                    label: collegeNames[name]
                }))
            }
        }
    ]
    // 针对院系类的数据验证函数
    const validator = data => {
        // 创建教师类
        const department = new Department(data)
        // 返回验证结果
        return department.toValid()
    }
    
    const name = "page:department_management"

    // 根据获取的数据转为相应节点
    const toNode = ({ id, department_code, department_name, college_code }) => {
        // 创建院系类
        const department = new Department({
            department_code,
            department_name,
            college_code
        })
        department.key = id
        department.college_name = collegeNames[college_code]
        // 操作列的内容
        department.control = (
            <Space size="small">
                {/* 更新院系信息按钮 */}
                <MyTable.UpdateButton
                    name="updateDepartment"
                    type={QueryTable.tableKeys.department}
                    id={id}
                    inputConfig={inputConfig}
                    validator={validator}
                />
                {/* 删除院系信息按钮 */}
                <MyTable.DeleteButton
                    tableName={name}
                    type={QueryTable.tableKeys.department}
                    id={id}
                    errorNode={<>确定删除院系代码为<Tag color="red">{department_code}</Tag>的院系数据？</>}
                />
            </Space>
        )
        return department
    }
    // TeacherTable组件
    return () => {
        // JSX
        return (
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    type={QueryTable.tableKeys.department}
                    tableColumns={columns}
                    validator={validator}
                    name={name}
                />
                <MyTable
                    // 数据类型
                    type={QueryTable.tableKeys.department}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "department_code", "department_name", "college_code"]}
                    toNode={toNode}
                    name={name}
                />
            </Space>
        )
    }
})()

// 教师管理页的组件
const DepartmentManagement = () => {
    return (
        <div>
            {/* 标题 */}
            <h3 className="title">院系管理</h3>
            <br />
            {/* 操作数据的表格 */}
            <DepartmentTable />
        </div>
    );
}

export default DepartmentManagement;
