import { Modal } from "antd"

const alertInput = (config) => {
    // 导入MyForm组件为局部
    import("@/components/MyForm").then(module => {
        const MyForm = module.default
        // 通过模态框弹出添加教师的表单
        const modal = Modal.info({
            // 标题
            title: config.title,
            // 目的是隐藏掉模态框默认图标
            icon: <></>,
            // 目的是隐藏掉确认按钮
            okButtonProps: {
                hidden: true
            },
            // 右上角显示close按钮
            closable: true,
            // 清除自动获取事件焦点的按钮（可以防止模态框意外关闭）
            autoFocusButton: null,
            // 模态框的内容
            content: (
                <MyForm
                    items={config.inputConfig}
                    name={config.name}
                    // 当Form表单被提交时触发的函数
                    finish={(...args) => {
                        config.finish(...args, modal)
                    }}
                />
            )
        })
    })
}

export default alertInput