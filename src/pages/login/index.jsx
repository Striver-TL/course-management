/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 20:54:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 01:09:34
 * @FilePath: \student-performance\src\pages\login\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Menu, Space } from 'antd'
import { useNavigate } from 'react-router'

import store from '../../redux/store'

import './index.scss'

const Login = () => {
    const items = [{
        key: "student",
        label: "学生",
    }, {
        key: "teacher",
        label: "教师"
    }, {
        key: "admin",
        label: "管理员"
    }]

    const inputs = {
        student: (
            <Form.Item label="学号" name="sno" rules={[{ required: true, message: "请输入学号" }]}>
                <Input name="sno" placeholder='请输入学号' />
            </Form.Item>
        ),
        teacher: (
            <Form.Item label="教工号" name="tcode" rules={[{ required: true, message: "请输入您的教工号" }]}>
                <Input name="tcode" placeholder='请输入教工号' />
            </Form.Item>
        ),
        admin: (
            <Form.Item label="管理员账号" name="admin" rules={[{ required: true, message: "请输入管理员账号" }]}>
                <Input name="admin" placeholder='请输入管理员账号'></Input>
            </Form.Item>
        )
    }

    // 选择的用户类型
    const [selectType, setSelectType] = useState("student")

    const menuSelect = data => {
        setSelectType(data.key)
    }
    const navigate = useNavigate()
    const toSubmit = (() => {
        const userType = store.userType
        userType.subscribe(() => {
            navigate("/home")
        })
        return () => {
            userType.dispatch({
                type: "string",
                data: "3"
            })
        }
    })()


    return (
        <div className="login">
            <h2>登录</h2>
            <Space className="content" direction='vertical' size="middle" style={
                {
                    width: "100%"
                }
            }>
                <Menu theme="dark" defaultSelectedKeys={[selectType]} onSelect={menuSelect} items={items} mode="horizontal"></Menu>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Input type="hidden" name="type" value={selectType} />

                    {
                        inputs[selectType]
                    }

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码' }]}
                    >
                        <Input.Password placeholder='请输入你的密码' />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 16 }}>
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button type="primary" htmlType="submit" onClick={toSubmit}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </div>
    );
}

export default Login;

