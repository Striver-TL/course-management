/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 17:12:10
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 18:01:30
 * @FilePath: \teacher-performance\src\pages\home\course\mycourse\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Space, Row, Col, Spin, message } from 'antd'

import MyForm from '../../../components/MyForm'
import teacherApi from '../../../apis/teacher'
import Teacher from '../../../model/Teacher'

export default function MyCourse() {
    const [isLoading, setIsLoading] = useState(true)
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        teacherApi.userinfoQueryHandle().then(({ data }) => {
            if (!data.success) return message.error(data.message)
            const teacher = new Teacher(data.result)
            teacher.birthday = new Date(teacher.birthday)
            setInitialValues(teacher)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])

    const inputConfig = [{
        key: "tname",
        item: {
            name: "tname",
            label: "姓    名：",
            rules: [{
                required: true,
                message: "请输入教师姓名"
            }]
        },
        input: {
            type: "input",
            placeholder: "请输入教师姓名",
            readOnly: true
        }
    }, {
        key: "tno",
        item: {
            name: "tno",
            label: "教 工 号：",
            rules: [{
                required: true,
                message: "请输入学号"
            }]
        },
        input: {
            type: "input",
            placeholder: "请输入学号",

            readOnly: true
        }
    }, {
        key: "gender",
        item: {
            name: "gender",
            label: "性    别：",
            rules: [{
                required: true,
                message: "请选择性别"
            }]
        },
        input: {
            type: "select",
            disabled: true,
            options: [{
                value: "0",
                label: "女"
            }, {
                value: "1",
                label: "男"
            }]
        }
    }, {
        key: "birthday",
        item: {
            name: "birthday",
            label: "生    日："
        },
        input: {
            type: "date"
        }
    }, {
        key: "phone",
        item: {
            name: "phone",
            label: "手机号："
        },
        input: {
            type: "input",
            placeholder: "请输入手机号"
        }
    }, {
        key: "email",
        item: {
            name: "email",
            label: "邮    箱："
        },
        input: {
            type: "input",
            placeholder: "请输入邮箱"
        }
    }]

    const finishHandle = async (data, setLoading) => {
        const teacher = new Teacher(data)
        const valid = teacher.toValid({
            tno: "教工号有误",
            tname: "姓名有误",
            gender: "性别有误",
            birthday: "出生年月有误",
            phone: "手机号码有误",
            email: "邮箱有误"
        })
        if (valid.err) {
            setLoading(false)
            return message.error(valid.message)
        }

        const { data: updateRes } = await teacherApi.userinfoUpdateHandle(teacher)
        if (!updateRes.success) message.error(updateRes.message)
        else message.success("更新成功")
        setLoading(false)
    }

    return (
        <Space size="middle" direction="vertical">
            <h3 className="title">个人信息</h3>

            {
                !isLoading ?
                    <Row justify='center'>
                        <Col>
                            <MyForm name="teacher_user_info" items={inputConfig} finish={finishHandle} initialValues={initialValues}></MyForm>
                        </Col>
                    </Row> : <div style={{
                        textAlign: "center",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}>
                        <Spin></Spin>
                        <div>信息查询中...</div>
                    </div>
            }

        </Space>
    )
}
