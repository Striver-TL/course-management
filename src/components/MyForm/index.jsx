/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-08 16:38:25
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-19 15:40:51
 * @FilePath: \student-performance\src\components\MyForm\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
import propTypes from 'prop-types'
import moment from 'moment'

import { Form, Input, Button, Select, DatePicker } from 'antd'

import "./index.scss"
import { useRef, useEffect } from 'react'

const noSelect = {
    value: "",
    label: "不选择"
}

/**
 * 表单组件
 * @param { Object } props 组件的props
 * @returns { VNode } 虚拟DOM 
 */
function MyForm(props) {
    // 获取props
    const {
        // 表单标识
        name,
        // 表单控件配置
        items,
        // 表单提交时执行的函数
        finish,
        // 表单初始值
        initialValues
    } = props
    // 提交中状态
    const [isLoading, setLoading] = useState(false)
    // 存储表单组件
    const form = useRef()
    // 创建effect
    useEffect(
        () => {
            if (!form.current) return
            // values里面存储要更新的表单控件数据
            // 主要是用于在外部更新了select类型控件的数据后使form更新这些数据
            const values = (
                items
                    // 过滤出来select类型的配置
                    .filter(
                        ({ input }) => input.type === "select"
                    )
                    // 返回处理后的数据
                    .map(
                        // 返回的是每个select的属性
                        ({ input, key }) => ({
                            // 标识
                            key,
                            // 每个select的option配置
                            input: {
                                options: input.options.map(option => option.value)
                            }
                        })
                    )
                    // 归并
                    .reduce(
                        (
                            // 上一次迭代的结果
                            prevent,
                            // 获取本次迭代对象的input和key属性值
                            { input, key }
                        ) => {
                            // 获取表单现在的数据
                            const value = form.current.getFieldValue(key)
                            // 如果表单现在的值在新传入options配置中没有，说明此选项无效，则清除掉该select的选择
                            value !== undefined && input.options.indexOf(value) === -1 && (prevent[key] = undefined)
                            return prevent
                        },
                        // 初始对象
                        {}
                    )
            )
            // 为表单设置新的数据
            form.current.setFieldsValue(values)
        }
    );
    // 表单控件VNode
    // 将自定义的配置转化为对应VNode
    const itemsNode = items.map(
        // 迭代函数
        ({ key, item, input }) => {
            // 用于存储表单控件
            let inputNode = null
            // 针对不同input类型来创建对应的VNode
            switch (input.type) {
                // 选择框
                case "select":
                    // 判断该控件里是否已存在不选择的选项
                    // 如果不存在说明该控件为第一次加载反之则为更新
                    input.options.indexOf(noSelect) === -1
                        &&
                        // 判断出该选择框是否可以不选择
                        (
                            // 没有rules则肯定没有必选配置则可以不选择
                            !input.rules
                            ||
                            // 有配置则所有rules的配置中不能包含required为true
                            input.rules.every(item => !item.required)
                        )
                        &&
                        // 通过验证添加不选择的控件
                        input.options.unshift(noSelect)
                    // 保存该表单控件
                    inputNode = <Select {...input} />
                    break;
                // 日期
                case "date":
                    inputNode = <DatePicker
                        {...input.picker}
                        name={item.name}
                    />
                    // 是否设置了初始值
                    // 因为设置的初始值可能与该控件需要的值格式不符
                    // 所以在这里处理一下
                    initialValues
                        &&
                        // 是否对该控件设置了初始值
                        initialValues[key]
                        &&
                        (
                            // 将对应的值转为规定的值格式
                            initialValues[key] = moment(initialValues[key])
                        )
                    break;
                default:
                    inputNode = <Input {...input} />
            }
            // 返回VNode
            return (
                <Form.Item
                    key={key}
                    {...item}
                    value
                >
                    {inputNode}
                </Form.Item>
            )
        }
    )

    return (
        <Form
            className="form"
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
