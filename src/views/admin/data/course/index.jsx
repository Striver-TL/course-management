/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-22 15:47:38
 * @FilePath: \course-performance\src\pages\home\admin\course\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';

import MyTable from '@/components/MyTable';
import { Space, Tag } from 'antd';

import Course from '@/model/Course';
import PageComponent from '@/components/PageComponent';
import createApi from "@/apis/admin/data";
import tableKeys from '@/utils/http/config/tableKeys';

const request = createApi(tableKeys.TABLE_COURSE);

// 课程表格组件
// 用于展示和操作课程信息
let CourseTable = (() => {
    // 课程表格列信息
    let columns = [{
        key: "cno",
        dataIndex: "cno",
        title: "课程号"
    }, {
        key: "name",
        dataIndex: "name",
        title: "课程名"
    }, {
        key: "credit",
        dataIndex: "credit",
        title: "学分"
    }, {
        key: "required",
        dataIndex: "required",
        title: "课程性质"
    }, {
        key: "type",
        dataIndex: "type",
        title: "课程类别"
    }]

    // 针对课程类的数据验证函数胡
    let validator = data => {
        // 创建课程类
        let course = new Course(data)
        // 返回验证结果
        return course.toValid()
    }

    let tableName = "page:course_management"

    let inputConfig = [
        {
            key: "cno",
            item: {
                name: "cno",
                label: "课程号",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入课程号"
            }
        },
        {
            key: "name",
            item: {
                name: "name",
                label: "课程名",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入课程名"
            }
        },
        {
            key: "credit",
            item: {
                name: "credit",
                label: "学  分",
                rules: [{
                    required: true
                }]
            },
            input: {
                placeholder: "请输入学分"
            }
        },
        {
            key: "required",
            item: {
                name: "required",
                label: "课程性质",
            },
            input: {
                type: "select",
                placeholder: "请选择课程性质",
                options: Course.getRequired().map((item, index) => ({
                    value: `${index}`,
                    label: item
                }))
            }
        },
        {
            key: "type",
            item: {
                name: "type",
                label: "课程类别"
            },
            input: {
                type: "select",
                placeholder: "请选择课程类别",
                options: Course.getType().map((item, index) => ({
                    value: `${index}`,
                    label: item
                }))
            }
        }
    ]

    let requireds = Course.getRequired()
    let types = Course.getType()
    // 根据获取的数据转为相应节点
    let toNode = ({ id, cno, name, credit, required, type }) => {
        // 创建课程类
        let course = new Course({
            cno,
            name,
            credit,
            required,
            type
        })
        course.key = id
        // 
        course.credit = <Tag color="green">{course.credit.toFixed(1)}分</Tag>

        course.required = <Tag color={course.required === "0" ? "red" : "cyan"}>{requireds[course.required]}</Tag>

        course.type = types[course.type]

        return course
    }

    // CourseTable组件
    return () => (
        <PageComponent title="课程管理">
            <Space direction='vertical' size="middle" style={{ width: "100%" }}>
                <MyTable.TableControl
                    inputConfig={inputConfig}
                    tableColumns={columns}
                    validator={validator}
                    name={tableName}
                    insertHandle={request.insertHandle}
                >
                    {/* 查看课程信息按钮 */}
                    <MyTable.SeeInfoButton
                        tableName={tableName}
                        type={tableKeys.TABLE_COURSE}
                        queryHandle={request.queryHandle}
                    />
                    {/* 更新课程信息按钮 */}
                    <MyTable.UpdateButton
                        name="updateCourse"
                        tableName={tableName}
                        inputConfig={inputConfig}
                        validator={validator}
                        updateHandle={request.updateHandle}
                        queryHandle={request.queryHandle}
                    />
                    {/* 删除课程信息按钮 */}
                    <MyTable.DeleteButton
                        tableName={tableName}
                        deleteHandle={request.deleteHandle}
                    />
                </MyTable.TableControl>
                <MyTable
                    // 数据类型
                    type={tableKeys.TABLE_COURSE}
                    // 表格类信息
                    tableColumns={columns}
                    // 查询的字段
                    queryColumns={["id", "cno", "name", "credit", "required", "type"]}
                    toNode={toNode}
                    name={tableName}
                    queryHandle={request.queryHandle}
                    countHandle={request.countHandle}
                />
            </Space>
        </PageComponent>

    )
})()

export default CourseTable