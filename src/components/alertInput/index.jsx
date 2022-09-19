/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-11 19:32:25
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 21:36:06
 * @FilePath: \student-performance\src\components\alertInput\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Modal } from "antd"
import { useState } from "react"
import MyForm from "../MyForm"

const componentStack = {}

const createMyFormComponent = (modal) => {
    return (props) => {
        const [inputConfig, setInputConfig] = useState(props.inputConfig)
        const { name, initialValues } = props
        if (!componentStack[name]) {
            componentStack[name] = setInputConfig
        }
        return <MyForm
            items={inputConfig}
            name={name}
            initialValues={initialValues}
            // 当Form表单被提交时触发的函数
            finish={(...args) => {
                props.finish(...args, modal())
            }}
        />
    }
}

const alertInputType = {
    update: Symbol("update alertInput"),
    create: Symbol("create alertInput")
}

const alertInput = (type, config) => {
    const { name, title, inputConfig } = config
    if (type === alertInputType.create) {
        // 导入MyForm组件为局部
        if (!componentStack[name]) {
            const Component = createMyFormComponent(() => modal)
            // 通过模态框弹出添加教师的表单
            const modal = Modal.info({
                // 标题
                title,
                // 目的是隐藏掉模态框默认图标
                icon: <></>,
                // 目的是隐藏掉确认按钮
                okButtonProps: {
                    hidden: true
                },
                afterClose() {
                    delete componentStack[name]
                    typeof config.afterClose === "function" && config.afterClose()
                },
                // 右上角显示close按钮
                closable: true,
                // 清除自动获取事件焦点的按钮（可以防止模态框意外关闭）
                autoFocusButton: null,
                // 模态框的内容
                content: <Component {...config} />
            })
        } else {
            componentStack[name](inputConfig)
        }
    } else if (type === alertInputType.update) {
        if (componentStack[name]) {
            componentStack[name](inputConfig)
        }
    }
}

export default alertInput

export const alertInputTypes = alertInputType
