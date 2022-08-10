/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-08 16:38:25
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-10 16:57:25
 * @FilePath: \student-performance\src\components\MyForm\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState} from 'react'
import propTypes from 'prop-types'

import { Form, Input, Button, Select, DatePicker, } from 'antd'

import "./index.scss"

/**
 * 表单组件
 * @param { Object } props 组件的props
 * @returns { VNode } 虚拟DOM 
 */
function MyForm(props) {
    const { name, items, finish } = props
    const [isLoading, setLoading] = useState(false)
    return (
        <Form
            name={name}
            onFinish={(data) => {
                setLoading(true)
                finish(data, setLoading)
            }}
        >
            {
                items.map(({ key, item, input }) => {
                    let inputNode = null
                    switch (input.type) {
                        case "select":
                            inputNode = (<Select placeholder={input.placeholder} name={input.name}>
                                {input.options.map(({ title, value }) => <Select.Option key={value} value={value}>{title}</Select.Option>)}
                            </Select>)
                            break;
                        case "date":
                            inputNode = <DatePicker
                                {...input.picker}
                                name={item.name}
                            />
                            break;
                        default:
                            inputNode = <Input {...input} />
                    }
                    return (
                        <Form.Item
                            key={key}
                            {...item}
                        >
                            {inputNode}
                        </Form.Item>
                    )
                })
            }
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>提交</Button>
            </Form.Item>
        </Form>
    )
}

// 类型限制
MyForm.propTypes = {
    // 表单项数组必填
    items: propTypes.array.isRequired,
    // 表单提交方法
    finish: propTypes.func.isRequired,
    // 表单名字
    name: propTypes.string.isRequired
}

export default MyForm
