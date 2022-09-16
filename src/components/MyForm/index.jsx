/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-08 16:38:25
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 08:59:16
 * @FilePath: \student-performance\src\components\MyForm\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import moment from 'moment'

import { Form, Input, Button, Select, DatePicker } from 'antd'

import "./index.scss"
import { useRef, useEffect } from 'react'

/**
 * 表单组件
 * @param { Object } props 组件的props
 * @returns { VNode } 虚拟DOM 
 */
function MyForm(props) {
    const { name, items, finish, initialValues } = props
    const [isLoading, setLoading] = useState(false)
    const form = useRef();
    useEffect(() => {
        const values = items.filter(({ input }) => input.type === "select").map(({input, key}) => ({
            key,
            input: {
                options: input.options.map(option => option.value)
            }
        })).reduce((prevent, { input, key }) => {
            const value = form.current.getFieldValue(key)
            value !== undefined && input.options.indexOf(value) === -1 && (prevent[key] = undefined)
            return prevent
        }, {})
        form.current && form.current.setFieldsValue(values)
    });
    const itemsNode = items.map(({ key, item, input }) => {
        let inputNode = null
        switch (input.type) {
            case "select":
                inputNode = <Select { ...input } />
                break;
            case "date":
                inputNode = <DatePicker
                    {...input.picker}
                    name={item.name}
                />
                initialValues && initialValues[key] && (initialValues[key] = moment(initialValues[key]))
                break;
            default:
                inputNode = <Input {...input} />
        }
        return (
            <Form.Item
                key={key}
                {...item}
                value
            >
                { inputNode }
            </Form.Item>
        )
    })

    return (
        <Form
            name={name}
            ref={form}
            onFinish={(data) => {
                setLoading(true)
                finish(data, setLoading)
            }}
            initialValues={initialValues ? initialValues : {}}
        >
            {
                itemsNode
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
