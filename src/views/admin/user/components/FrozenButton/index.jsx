/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-04 09:12:27
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-21 14:11:31
 * @FilePath: \student-performance\src\pages\home\admin\user\components\FrozenButton\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react"
import { Button, message } from "antd"
import PropTypes from "prop-types"
import PubSub from "pubsub-js"

import frozenApi from '@/apis/admin/user'
import alertInput, { alertInputTypes } from "@/components/alertInput"

/**
 * @param { String } tableName 表格名字
 * @param { Number } id 用户数据的id 
 */
const frozenUserForId = (tableName, id) => {
    // 弹出操作框
    alertInput(alertInputTypes.create, {
        name: "frozen_form",
        // 表单控件配置
        inputConfig: [{
            // 冻结时间
            key: "frozen_day",
            item: {
                name: "frozen_day",
                label: "冻结时间",
                rules: [{
                    required: true,
                    message: "请选择冻结天数"
                }]
            },
            // 选择框
            input: {
                type: "select",
                options: [{
                    value: 0,
                    label: "解除冻结"
                }, {
                    value: 1 / 24,
                    label: "1小时"
                }, {
                    value: 1 / 8,
                    label: "3小时"
                }, {
                    value: 0.5,
                    label: "半天"
                }, {
                    value: 1,
                    label: "1天"
                }, {
                    value: 3,
                    label: "3天"
                }, {
                    value: 7,
                    label: "7天"
                }, {
                    value: 15,
                    label: "15天"
                }]
            }
        }],
        // 表单提交触发的函数
        finish({ frozen_day }, setLoading, modal) {
            // 将天数转换为毫秒数
            let timestamp = frozen_day * 24 * 60 * 60 * 1000
            // 发送请求
            frozenApi.frozenHandle(id, timestamp)
                // 处理响应
                .then(({ data }) => {
                    // 成功冻结
                    if (data.success) {
                        // 成功提示
                        message.success(data.message)
                        // 关闭模态框
                        modal.destroy()
                        // 刷新表格
                        PubSub.publish(`${tableName}:reflash`)

                    } else {
                        message.error(data.message)
                    }
                })
                // 错误处理
                .catch(() => {
                    message.error("冻结用户失败")
                })
                .finally(() => setLoading(false))

        }
    })
}

// 冻结按钮组件
const FrozenButton = props => {
    // 禁用状态
    const [isDisabled, setIsDisabled] = useState(true)
    // 数据id状态
    const [id, setId] = useState(-1)
    // 表格名状态
    const [tableName] = useState(props.tableName)

    useEffect(() => {
        // 当组件被挂载或tableName状态改变时订阅对应tableName
        PubSub.subscribe(`${tableName}:id`, (_, id) => {
            setId(id)
            setIsDisabled(id === -1)
        })
        // 当组件被卸载时取消订阅
        return () => {
            PubSub.unsubscribe(`${tableName}:id`)
        }
    },
        // 执行依赖于tableName
        [tableName]
    )

    return <Button disabled={isDisabled} onClick={() => frozenUserForId(tableName, id)}>冻结</Button>
}

FrozenButton.propTypes = {
    tableName: PropTypes.string.isRequired,
    type: PropTypes.symbol.isRequired
}

export default FrozenButton
