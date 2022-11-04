/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 17:05:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-04 22:49:16
 * @FilePath: \student-performance\src\components\MyTable\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table, Button, message, Empty, Modal, Row, Col, Input, Space, Select } from "antd"
import QueryTable from "@/request/utils/QueryTable"
import createAnishake from "@/utils/createAntishake"
import createThrottle from "@/utils/createThrottle"
import PubSub from 'pubsub-js'

import "./index.scss"

import alertInput, { alertInputTypes } from "../alertInput"
import browerType from "../../utils/browserType"

// 用于记录是否为PC客户端
let isClient
// 验证浏览器类别
// 记录浏览器是否为PC端
browerType({
    mobile() {
        isClient = false
    },
    client() {
        isClient = true
    }
})

// 表格控制组件
// 包含：
// 表格数据过滤
// 表格数据添加
// 表格刷新
// ...
class TableControl extends Component {
    // 限制props
    static propTypes = {
        // 数据类别
        type: PropTypes.symbol.isRequired,
        // 数据验证器
        validator: PropTypes.func.isRequired,
        // 输入框配置
        inputConfig: PropTypes.array.isRequired,
        // 表格名
        name: PropTypes.string.isRequired
    }
    render() {
        // 获取对应props
        const { type, validator, inputConfig, name } = this.props
        // 可拓展节点列表
        const nodeList = [
            // 添加数据按钮
            <AddInfoButton
                inputConfig={inputConfig}
                type={type}
                validator={validator}
                name={name}
                key="add"
            />,
            // 刷新数据按钮
            <ReflashButton
                name={name}
                key="reflash"
            />
        ]
            // 添加外部传入的子节点
            .concat(this.props.children)
        return (
            /* 组件最外容器 */
            <Space
                size="small"
                // 客户端为横向布局
                // 移动端为纵向布局
                direction={isClient ? "horizontal" : "vertical"}
                style={{ width: "100%" }}
            >
                {/* 加入表格过滤组件 */}
                <TableFilter
                    inputConfig={inputConfig}
                    name={name}
                />
                {
                    // 判断是否客户端
                    isClient ?
                        // PC端nodeList与TableFilter占在同一行
                        nodeList
                        :
                        // 移动端nodeList独占一行
                        <div className="table-control-row">
                            <Row justify="space-around">
                                {nodeList}
                            </Row>
                        </div>
                }
            </Space>
        )
    }
}

// 表格组件
class MyTable extends Component {
    static propTypes = {
        // 表格列配置
        tableColumns: PropTypes.array.isRequired,
        // 获取数据字段配置
        queryColumns: PropTypes.array.isRequired,
        // 展示的数据类型
        type: PropTypes.symbol.isRequired,
        // 表格名字
        name: PropTypes.string.isRequired,
        // 表格数据转为对应组件函数
        toNode: PropTypes.func.isRequired,
        // 多表查询
        joins: PropTypes.object,
        // 表格的类名
        className: PropTypes.string
    }

    // 构造器
    constructor(props) {
        super(props)
        // 数据总条数
        this.state = {
            // 表格是否正在加载
            loading: false,
            // 
            total: 0,
            // 当前页码
            current: 1,
            // 刷新次数
            reflashCount: 0,
            // 表格数据
            dataSource: [],
            // 数据条件
            likes: {},
            // 被选中的数据id
            selectId: 0
        }
        // 获取数据方法改为防抖方法（1秒内只能成功调用1次）
        this.getData = createAnishake(this.getData, 1000, this)
        // 获取数据数量方法改为防抖方法（1秒内只能成功调用1次）
        this.getDataCount = createAnishake(this.getDataCount, 1000, this)
        // 为该表格创建对应的查询数据实例
        this.queryTable = new QueryTable(props.type)
        // 初始化getRadio
        this.getRadio = this.getRadio()
    }
    // 配置分页器的选项
    pagination = {
        // 位置：下中
        position: ["bottomCenter"],
        // 每页显示条数：10
        pageSize: 10,
        // 单页隐藏分页器
        hideOnSinglePage: true
    }
    // 组件第一次渲染获取第一页数据
    componentDidMount() {
        this.setDataCount()
        // 订阅
        // 条件改变
        PubSub.subscribe(`${this.props.name}:likes`, (_, { likes, callback }) => {
            // 获取传入的所有条件
            Reflect.ownKeys(likes).forEach(name => {
                // 把空的条件删除掉
                likes[name] === "" && delete likes[name]
            })
            // 更新条件状态
            this.setState({
                likes
            })
            // 设置数据数量
            this.setDataCount(typeof callback === "function" ? callback : undefined)

        })
        // 订阅
        // 刷新数据
        PubSub.subscribe(`${this.props.name}:reflash`, (_, callback) => {
            this.setId(-1)
            this.setDataCount(callback)
        })
    }
    // 
    componentWillUnmount() {
        PubSub.unsubscribe(`${this.props.name}:likes`)
        PubSub.unsubscribe(`${this.props.name}:reflash`)
    }

    // 组件更新后
    componentDidUpdate(_, prevState) {
        // reflashCount状态发生了变化说明表格需要重新刷新
        if (this.state.reflashCount !== prevState.reflashCount) {
            this.setData(this.state.current, this.pagination.pageSize)
        }
    }

    isChecked(event) {
        return event.target.checked
    }

    setId(id) {
        PubSub.publish(`${this.props.name}:id`, id)
    }

    getRadio () {
        // 创建一个处理change事件的函数
        // id为数据id
        // 通过调用setId方法设置了id，再通过订阅发布将id发布，之后像刷新按钮更新按钮这些组件就会收到id变化从而更改对应state来针对此id的数据进行操作
        let createRadioHandler = (id) => (e) => {
            // 选择了此按钮触发
            if (this.isChecked(e)) {
                this.setId(id)
            }
        }
        // 创建数组保存所创建的Input组件便于后续操作（例如取消选择状态）
        let inputs = []
        let name = this.props.name
        PubSub.subscribe(`${name}:reflash`, () => inputs.forEach(({ current }) => current.input.checked = false))
        // 创建并返回一个Input组件并且将组件存放起来
        return function (id) {
            let ref = React.createRef()
            inputs.push(ref)
            return <Input type="radio" ref={ref} name={name} onChange={createRadioHandler(id)} />
        }
    }

    // 获取数据
    getData(page, pageSize) {
        const option = {
            // 需要获取的字段
            columns: this.props.queryColumns,
            // 获取的数据区间
            section: [(page - 1) * pageSize, page * pageSize],
        }
        if (this.props.joins) {
            option.joins = this.props.joins
        }
        // 如果有条件
        // 将条件添加到选项对象中
        if (Object.getOwnPropertyNames(this.state.likes).length) option.likes = this.state.likes
        // 调用获取方法
        this.queryTable.getData(option)
            .then(({ data }) => {
                const { success, result } = data
                // 成功获取数据
                if (success) {
                    // 将数据转为显示的数据
                    // toNode是外部传入的函数，将数据进行二次包装
                    const data = (result || []).map(item => {
                        const obj = Object.assign(this.props.toNode(item), { id: item.id })
                        obj.select = this.getRadio(obj.id)
                        return obj
                    })
                    // 表格未加载
                    // 刷新表格数据
                    this.setState({
                        // 设置数据集
                        dataSource: data,
                        // 更新当前页
                        current: page,
                        // 取消表格加载
                        loading: false
                    })
                } else {
                    message.error(data.message)
                }
            })
            // 获取失败
            .catch(() => {
                message.error("数据获取失败")
                // 表格未加载
                this.setState({
                    loading: false
                })
            })
    }

    // 设置数据方法
    setData(page, pageSize) {
        // 表格加载状态
        this.setState({
            loading: true
        })
        // 调用获取数据方法
        this.getData(page, pageSize)
    }

    // 获取数据条数
    getDataCount(callback) {
        const option = {
            column: "id"
        }
        // 如果有条件
        // 将条件添加到选项对象中
        const condition = this.state.condition
        if (typeof condition === "object" && condition !== null) option.condition = condition
        // 从后端获取数据
        this.queryTable.getCount(option)
            .then(result => {
                // 获取返回的数据
                const data = result.data
                // 成功获取
                if (data.success) {
                    message.success(`成功获取${data.result.id}条数据`)
                    // 设置数据条数
                    this.setState({
                        total: data.result.id,
                        reflashCount: this.state.reflashCount + 1
                    })
                } else {
                    // 抛出错误
                    return Promise.reject()
                }
            })
            .catch(() => {
                // 给出警告
                message.error("获取数据条数时出错")
            })
            .finally(() => {
                // 加载完毕
                this.setState({
                    loading: false
                })
                typeof callback === "function" && callback()
            })
    }


    // 设置数据条数
    setDataCount(callback) {
        // 表格加载中
        this.setState({
            loading: true
        })
        // 获取数据条数
        this.getDataCount(callback)
    }

    // 渲染方法
    render() {
        // 获取加载状态
        // 数据集
        // 数据总数
        const { loading, dataSource, total } = this.state
        // 记录数量便于表格进行渲染
        this.pagination.total = total
        return (
            // dataSource有数据或者正在加载
            dataSource.length || loading
                ?
                // 表格
                <Table
                    className={`teng-table ${this.props.className ? this.props.className : ""}`}
                    bordered
                    loading={loading}
                    // 表格在翻页时候
                    onChange={
                        ({ current, pageSize }) => (
                            // 重新从后端获取数据
                            this.getData(current, pageSize)
                        )
                    }
                    // 表格数据
                    dataSource={dataSource}
                    // 翻页信息
                    pagination={this.pagination}
                    // 表格列信息
                    columns={this.props.tableColumns.concat([{
                        key: "select",
                        dataIndex: "select",
                        title: "选择"
                    }])}
                    // 小表格
                    size="small"
                />
                :
                <Empty description="找不到指定数据" />
        );
    }
}

class AddInfoButton extends Component {
    // 限制prop
    static propTypes = {
        // 数据类型
        type: PropTypes.symbol.isRequired,
        // Form组件的配置文件
        inputConfig: PropTypes.array.isRequired,
        // 验证数据的方法
        validator: PropTypes.func.isRequired,
        // Form名字
        name: PropTypes.string.isRequired,
        // 

    }

    constructor(props) {
        super(props)
        // 添加指定类型的获取数据的实例对象
        this.queryTable = new QueryTable(props.type)
        // 组件状态
        this.state = {
            // 表单控件配置
            // 默认：组件外部传入进来的配置
            inputConfig: props.inputConfig
        }
        // 防止方法没用通过实例调用
        this.clickHandle = this.clickHandle.bind(this)
    }

    // 在props更新时更新state
    static getDerivedStateFromProps(props, state) {
        // 如果外部的inputConfig发生了变化而组件内部没有更新此变化
        if (state.inputConfig !== props.inputConfig) {
            return {
                // 更新state
                inputConfig: props.inputConfig
            }
        }
        return state
    }

    // 组件更新后
    componentDidUpdate(_, state) {
        // 如果inputConfig发生了变化
        if (!(state.inputConfig === this.state.inputConfig)) {
            // 更新弹框的表单信息
            this.alertInput(alertInputTypes.update);
        }
    }

    /**
     * 弹出/更新带有表单的窗口
     * @param { Symbol } type alertInput模块规定的类别 
     */
    alertInput(type) {
        // 获取表单名字作为弹窗的标识
        const { name } = this.props
        // 获取表单配置
        const { inputConfig } = this.state
        // 调用弹出窗口的函数
        alertInput(
            // 指令的类别为传入的类别
            type,
            // 弹窗配置
            {
                // 表单配置
                inputConfig,
                // 弹窗标识
                name,
                // 表单提交时执行的方法
                /**
                 * 
                 * @param { Object } data 表单数据 
                 * @param { Function } setLoading 设置操作是否正在进行 
                 * @param { Object } modal 弹窗的对象（用来关闭弹窗）
                 */
                finish: (data, setLoading, modal) => {
                    // 验证数据
                    const validResult = this.props.validator(data)
                    // 如果未通过验证
                    if (validResult.err) {
                        // 给出错误提示
                        message.error("添加的数据中有错误")
                        // 取消加载中状态
                        setLoading(false)
                    } else {
                        // 向后台发送插入数据请求
                        new QueryTable(this.props.type)
                            .insertData(data)
                            .then(({ data }) => {
                                // 添加成功
                                if (data.success) {
                                    // 成功提示
                                    message.success("数据添加成功")
                                    // 销毁弹窗
                                    modal.destroy()
                                    // 发布订阅
                                    // 发布刷新表格
                                    PubSub.publish(`${this.props.name}:reflash`)
                                } else {
                                    // 添加失败弹出错误
                                    message.error(data.message)
                                }
                            })
                            // 请求完就取消加载中状态
                            .finally(() => setLoading(false))

                    }
                }
            })
    }

    // 按钮的点击事件处理函数
    clickHandle = () => {
        this.alertInput(alertInputTypes.create)
    }

    render() {
        return (
            <Button
                type="primary"
                onClick={this.clickHandle}
            >添加</Button>
        )
    }

}


// 查看信息组件
class SeeInfoButton extends Component {
    // 限制prop
    static propTypes = {
        // 数据类别
        type: PropTypes.symbol.isRequired,
        // 表格的名字
        tableName: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        // 组件状态
        this.state = {
            // 是否正在查看
            loading: false,
            // 用于标识id以方便从后端获取数据
            id: 0
        }
        // 修改this指向
        this.clickHandle = this.clickHandle.bind(this)
        // 更改为防抖 
        this.showInfo = createAnishake(this.showInfo, 1000, this)
    }

    // 组件成功挂载后
    componentDidMount() {
        // 订阅id变化
        PubSub.subscribe(
            `id: ${this.props.tableName}`,
            (_, id) => {
                // 更改id状态
                this.setState({
                    id
                })
            }
        )
    }

    // 组件即将被卸载时
    componentWillUnmount() {
        // 取消订阅
        PubSub.unsubscribe(`id: ${this.props.tablaName}`)
    }

    // 查看信息方法
    showInfo() {
        // 
        import("@/components/InfoCard")
            .then(module => {
                return module.default
            })
            .then(InfoCard => {
                // 弹出信息框
                Modal.info({
                    // 
                    title: "信息查看",
                    // 显示关闭按钮
                    closable: true,
                    // 确认文字
                    okText: "确认",
                    // 
                    icon: <></>,
                    // 显示内容
                    content: (
                        // 信息卡片
                        <InfoCard
                            // 数据类型
                            type={this.props.type}
                            // 数据id
                            id={this.state.id}
                        />
                    )
                })
            })
            .catch(() => {
                // 提示错误信息
                message.error("导入模块时出错")
            })
            .finally(() => {
                // 取消加载中状态
                this.setState({
                    loading: false
                })
            })
    }

    // 点击事件处理函数
    clickHandle() {
        this.setState({
            loading: true
        })
        this.showInfo()
    }

    // 渲染函数
    render() {
        const { loading, id } = this.state
        return (
            <Button
                type="primary"
                loading={loading}
                onClick={this.clickHandle}
                disabled={id <= 0}
            >查看</Button>
        )
    }
}

// 更新信息组件
class UpdateButton extends Component {
    // 限制prop
    static propTypes = {
        // 数据类型
        type: PropTypes.symbol.isRequired,
        // Form组件的配置文件
        inputConfig: PropTypes.array.isRequired,
        // 验证数据的方法
        validator: PropTypes.func.isRequired,
        // Form名字
        name: PropTypes.string.isRequired,
        tableName: PropTypes.string.isRequired,
        // 是否使用发布订阅来更新数据
        usePubSub: PropTypes.bool
    }

    // 构造器
    constructor(props) {
        super(props)
        // 
        this.queryTable = new QueryTable(props.type)
        this.state = {
            inputConfig: props.inputConfig,
            isShow: false,
            id: 0
        }
        // 修改this指向
        this.clickHandle = this.clickHandle.bind(this)
        // 创建防抖函数
        this.finish = createAnishake(this.finish, 1000, this)
    }

    componentDidMount() {
        PubSub.subscribe(`id: ${this.props.tableName}`, (_, id) => {
            this.setState({
                id
            })
        })
        if (this.props.usePubSub) {
            PubSub.subscribe(`update: ${this.props.name}`, (_, inputConfig) => {
                this.setState({
                    inputConfig
                })
            })
        }
    }

    componentWillUnmount() {
        PubSub.unsubscribe(`update: ${this.props.name}`)
        PubSub.unsubscribe(`id: ${this.props.tableName}`)
    }

    componentDidUpdate(_, state) {
        if (this.state.isShow && state.inputConfig !== this.state.inputConfig) {
            alertInput(alertInputTypes.update, {
                name: this.props.name,
                inputConfig: this.state.inputConfig
            })
        }
    }

    /**
     * 表单提交时处理的方法
     * @param { Object } data 表单数据 
     * @param { Function } setLoading 设置Form组件的loading状态
     * @param { Modal } modal Modal的实例对象
     */
    finish(data, setLoading, modal) {
        // 验证结果
        const validResult = this.props.validator(data)
        // 验证失败弹窗警告
        if (validResult.err) {
            setLoading(false)
            return message.error(validResult.message)
        }
        // 更新数据
        this.queryTable.updateData({
            // 条件对象
            condition: {
                // id为指定id
                id: this.state.id,
                // 未被删除
                is_delete: "0"
            }
        }, data)
            .then(({ data }) => {
                // 验证结果
                if (data.success) {
                    // 成功提示
                    message.success("数据更新成功")
                    // 通知表格刷新数据
                    PubSub.publish(`${this.props.tableName}:reflash`)
                    // 销毁弹窗
                    modal.destroy()
                } else {
                    // 验证未通过
                    // 弹窗警告
                    message.error(data.message)
                }
            })
            .catch(() => {
                message.error("更新数据时出错")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    // 显示修改弹窗
    showUpdate() {
        const { inputConfig } = this.state
        // 导入用于弹出Form组件的模块
        this.queryTable.getData({
            // 设置获取的字段名
            columns: (
                // 过滤掉不作为Sql查询的配置
                inputConfig.filter(
                    config => !config.notSql
                    // 获取名字集合
                ).map(
                    config => config.item.name
                )
            ),
            condition: {
                id: this.state.id
            }
        })
            .then(({ data }) => {
                // 成功获取数据
                if (data.success) {
                    // 返回数据到下一个then
                    return data.result[0]
                    // 未成功获取将Promise转为reject状态 
                } else return Promise.reject()
            })
            // 将获取的数据作为初始值
            .then((initialValues) => {
                // 获取name标识
                // 获取inputConfig
                const { name, inputConfig } = this.props
                // 弹出表单窗口
                alertInput(
                    // 创建新窗口
                    alertInputTypes.create,
                    {
                        // 窗口标识
                        name,
                        // 表单元素配置
                        inputConfig,
                        // 表单初始值
                        initialValues,
                        // 提交数据时执行类的finish方法
                        finish: this.finish.bind(this),
                        // 
                        afterClose: () => {
                            this.setState({
                                isShow: false
                            })
                        }
                    }
                )
                this.setState({
                    isShow: true
                })
            })
            .catch(() => message.error("获取数据时出错"))
    }

    // 鼠标点击事件处理函数
    clickHandle() {
        this.showUpdate()
    }

    // 渲染函数
    render() {
        const { isShow, id } = this.state
        return (
            <Button
                type="dashed"
                onClick={this.clickHandle}
                disabled={isShow || id <= 0}
                loading={isShow}
            >更新</Button>
        )
    }
}

// 删除信息组件
class DeleteButton extends Component {
    // 限制prop
    static propTypes = {
        // 表格名字
        tableName: PropTypes.string.isRequired,
        // 信息的类型
        type: PropTypes.symbol.isRequired,
    }

    // 构造器
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            id: 0
        }
        // 修改this指向
        this.clickHandle = this.clickHandle.bind(this)
        this.queryTable = new QueryTable(props.type)
    }


    componentDidMount() {
        PubSub.subscribe(`id: ${this.props.tableName}`, (_, id) => {
            this.setState({
                id
            })
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(`id: ${this.props.tableName}`)
    }

    // 点击事件处理函数
    clickHandle() {
        this.setState({
            loading: true
        })
        // 执行确认方法
        this.confirm()
            // 确认
            .then((modal) => {
                // 调用删除信息接口
                this.queryTable.deleteData({
                    condition: {
                        id: this.state.id,
                        is_delete: "0"
                    }
                })
                    // 成功返回数据
                    .then(({ data }) => {
                        // 删除成功
                        if (data.success) {
                            message.success("数据删除成功")
                            PubSub.publish(`${this.props.tableName}:reflash`)
                        } else {
                            // 删除失败
                            message.error(data.message)
                        }
                    })
                    // 未成功返回数据
                    .catch(() => {
                        // error
                        message.error("删除数据时出错")
                    })
                    // 
                    .finally(() => {
                        this.setState({
                            loading: false
                        })
                        modal.destroy()
                    })
            })
            // 取消
            .catch(() => {
                this.setState({
                    loading: false
                })
            })
    }

    // 确认
    confirm() {
        // 创建异步处理
        return new Promise((resolve, reject) => {
            // 弹出警告框
            // 点击确认按钮返回resolve状态
            // 点击取消按钮返回reject状态
            const modal = Modal.error({
                icon: <></>,
                content: "确定删除此数据？",
                okText: "确定",
                okCancel: true,
                cancelText: "取消",
                onOk() {
                    resolve(modal)
                },
                onCancel() {
                    reject()
                    modal.destroy()
                }
            })
        })
    }

    render() {
        return (
            <Button
                type="primary"
                onClick={this.clickHandle}
                disabled={this.state.id <= 0}
                danger
            >删除</Button>
        )
    }

}

// 表格过滤数据组件
class TableFilter extends Component {
    // prop限制
    static propTypes = {
        // 表单配置
        inputConfig: PropTypes.array.isRequired,
        // 表单标识
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        // 组件状态
        this.state = {
            // 关键字
            keyword: "",
            // 关键字对应的字段
            column: this.props.inputConfig[0].key,
            // 是否在过滤中
            loading: false
        }
        // 为以下方法锁定this
        this.toSearch = this.toSearch.bind(this)
        this.change = this.change.bind(this)
        this.selectHandle = this.selectHandle.bind(this)
    }
    // 开始搜索方法
    toSearch() {
        // 更改状态为过滤中
        this.setState({
            loading: true
        })
        // 获取状态
        const { column, keyword } = this.state
        // 发布
        PubSub.publish(
            // 条件改变
            `${this.props.name}:likes`,
            {
                // 条件对象
                likes: {
                    [column]: keyword
                },
                // 给订阅者提供加载完毕函数
                callback: () => {
                    this.setState({
                        loading: false
                    })
                }
            }
        )
    }
    // 输入框事件处理函数
    change(e) {
        this.setState({
            keyword: e.target.value
        })
    }
    // 选择框事件处理函数
    selectHandle(key) {
        // 切换字段状态
        this.setState({
            column: key
        })
    }

    render() {
        // 获取关键字state作为初始值
        const value = this.state.keyword
        // Select的option
        const options = this.props.inputConfig.map(
            ({ key, item }) => <Select.Option key={key}>{item.label}</Select.Option>
        )
        return (
            <div className="searchbar">
                <Row justify="space-around" wrap={false}>
                    <Col>
                        <Select onChange={this.selectHandle} defaultValue={this.state.column}>
                            {options}
                        </Select>
                    </Col>
                    <Col>
                        <Input
                            type="text"
                            value={value}
                            onChange={this.change}

                            bordered={true}
                            placeholder="请输入查询的数据"
                        />
                    </Col>
                    <Col>
                        <Button
                            className="search-btn"
                            type="primary"
                            onClick={this.toSearch}
                            loading={this.state.loading}
                            disabled={this.state.loading}
                        >搜索</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

// 刷新按钮组件
class ReflashButton extends Component {
    // prop限制
    static propsTypes = {
        // 表格的标识
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        // 组件状态
        this.state = {
            // 按钮禁用状态
            disabled: false,
            // 数据正在刷新状态
            loading: false
        }
        // 刷新节流
        // 5秒内只能刷新一次
        this.flash = createThrottle(this.flash, 5000, this, () => {
            this.setState({
                disabled: false
            })
        })
        // 以下方法锁定this
        this.clickHandle = this.clickHandle.bind(this)
    }
    // 按钮的事件处理函数
    clickHandle() {
        // 禁用按钮
        this.setState({
            disabled: true
        })
        // 调用刷新数据方法
        this.flash()
    }

    flash() {
        // 状态改为正在刷新
        this.setState({
            loading: true
        })
        // 发布
        PubSub.publish(
            `${this.props.name}:reflash`,
            () => {
                this.setState({
                    loading: false
                })
            }
        )
    }

    render() {
        const { loading, disabled } = this.state
        return (
            <Button
                disabled={loading || disabled}
                loading={loading}
                type="ghost"
                danger
                onClick={this.clickHandle}
            >刷新</Button>
        )
    }
}

MyTable.DeleteButton = DeleteButton
MyTable.SeeInfoButton = SeeInfoButton
MyTable.UpdateButton = UpdateButton
MyTable.AddInfoButton = AddInfoButton
MyTable.TableFilter = TableFilter
MyTable.TableControl = TableControl
MyTable.ReflashButton = ReflashButton

export default MyTable;
