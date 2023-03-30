/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 17:12:10
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 17:58:29
 * @FilePath: \student-performance\src\pages\home\course\mycourse\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'
import { Space, Row, Col, Spin, message } from 'antd'

import MyForm from '../../../components/MyForm'
import studentApi from '../../../apis/student'
import Student from '../../../model/Student'

export default function MyCourse() {
  const [isLoading, setIsLoading] = useState(true)
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    studentApi.userinfoQueryHandle().then(({ data }) => {
      if (!data.success) return message.error(data.message)
      const student = new Student(data.result)
      student.birthday = new Date(student.birthday)
      setInitialValues(student)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  const inputConfig = [{
    key: "sname",
    item: {
      name: "sname",
      label: "姓    名：",
      rules: [{
        required: true,
        message: "请输入学生姓名"
      }]
    },
    input: {
      type: "input",
      placeholder: "请输入学生姓名",

      readOnly: true
    }
  }, {
    key: "sno",
    item: {
      name: "sno",
      label: "学    号：",
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
    const student = new Student(data)
    const valid = student.toValid({
      sno: "学号有误",
      sname: "姓名有误",
      gender: "性别有误",
      birthday: "出生年月有误",
      phone: "手机号码有误",
      email: "邮箱有误"
    })
    if (valid.err) {
      setLoading(false)
      return message.error(valid.message)
    }

    const { data: updateRes } = await studentApi.userinfoUpdateHandle(student)
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
              <MyForm name="student_user_info" items={inputConfig} finish={finishHandle} initialValues={initialValues}></MyForm>
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
