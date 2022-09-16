/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 20:54:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-19 10:34:48
 * @FilePath: \student-performance\src\pages\login\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Form, Input, Button, Menu, Space, Alert } from 'antd'
import { useNavigate } from 'react-router'

import UserType from '../../model/UserType';
import { actionTypes, store } from '../../redux/store';

import './index.scss'
const userKeys = Object.keys(UserType.USER_TYPES).reverse()
// 定义切换用户类型按钮数据
const items = [{
    key: userKeys[0],
    label: "学生",
}, {
    key: userKeys[1],
    label: "教师"
}, {
    key: userKeys[2],
    label: "管理员"
}]

const Login = () => {
    // 路由跳转函数
    const navigate = useNavigate()

    // 创建账号状态
    const [username, setUsername] = useState("")
    // 创建密码状态
    const [password, setPassword] = useState("")
    // 正在登录状态
    const [isLogging, setLogging] = useState(false)
    // 登录异常状态
    const [isError, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    // 用户名修改的事件处理函数
    const changeHandler = (callback) => (e) => callback(e.target.value)
    // 每类用户的不同文本框
    const inputs = {
        [userKeys[0]]: (
            <Form.Item label="学号" name="sno" rules={[{ required: true, message: "请输入学号" }]}>
                <Input name="sno" value={username} onChange={changeHandler(setUsername)} placeholder='请输入学号' />
            </Form.Item>
        ),
        [userKeys[1]]: (
            <Form.Item label="教工号" name="tcode" rules={[{ required: true, message: "请输入您的教工号" }]}>
                <Input name="tcode" value={username} onChange={changeHandler(setUsername)} placeholder='请输入教工号' />
            </Form.Item>
        ),
        [userKeys[2]]: (
            <Form.Item label="管理员账号" value={username} name="admin" rules={[{ required: true, message: "请输入管理员账号" }]}>
                <Input name="admin" value={username} onChange={changeHandler(setUsername)} placeholder='请输入管理员账号'></Input>
            </Form.Item>
        )
    }

    // 选择的用户类型
    const [selectType, setSelectType] = useState(userKeys[0])

    // 当菜单选项被激活时，设置选择的用户类型
    const menuSelect = data => {
        setSelectType(data.key)
        setError(false)
        setUsername("")
        setPassword("")
    }

    // 表单提交事件处理函数
    const toSubmit = () => {
        import("../../request/utils/login").then(RequestLogin => {
            setLogging(true)
            // 发送登录请求
            RequestLogin.default.login({
                username,
                password,
                type: selectType
            }).then(({ data }) => {
                // 处理返回的结果
                setLogging(false)
                const { success } = data
                if (success) {
                    const user = {
                        username,
                        type: selectType
                    }
                    store.dispatch({
                        type: actionTypes.LOGIN_USER,
                        data: user
                    })
                    navigate(`/home`, {
                        replace: true
                    })
                }
                else {
                    setError(true)
                    setErrorMessage(data.message)
                }
            })

        })
    }


    return (
        <div className="login">
            <h2 className="title">课程管理系统</h2>
            <Menu theme="dark" defaultSelectedKeys={[selectType]} onSelect={menuSelect} items={items} mode="horizontal"></Menu>
            <Space className="content" direction='vertical' size="middle" style={
                {
                    width: "100%"
                }
            }>
                {
                    isError ? <Alert style={{
                        fontSize: "12px"
                    }} message={errorMessage} type="error" banner />
                        : <Alert style={{
                            fontSize: "12px"
                        }} message="请输入输入账号密码进行登录" type="info" banner />
                }
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    className="form"
                >
                    {
                        inputs[selectType]
                    }

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入你的密码' }]}
                        onChange={changeHandler(setPassword)}
                        value={password}
                    >
                        <Input.Password placeholder='请输入你的密码' value={password} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button loading={isLogging} disabled={isLogging} type="primary" htmlType="submit" onClick={toSubmit}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Space>
        </div>
    );
}

export default Login;

