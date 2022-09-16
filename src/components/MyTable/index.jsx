/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 17:05:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-16 15:54:06
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

class TableControl extends Component {
    static propTypes = {
        type: PropTypes.symbol.isRequired,
        validator: PropTypes.func.isRequired,
        inputConfig: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired
    }
    render() {
        const { type, validator, inputConfig, name } = this.props
        return <>
            <Space direction="horizontal">
                <TableFilter
                    inputConfig={inputConfig}
                    name={name}
                />
                <AddInfoButton
                    inputConfig={inputConfig}
                    type={type}
                    validator={validator}
                    name={name}
                />
                <ReflashButton
                    name={name}
                />
            </Space>
        </>
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
        name: PropTypes.string.isRequired,
        toNode: PropTypes.func.isRequired
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
            // 表格数据
            dataSource: [],
            condition: {}
        }
        this.getData = createAnishake(this.getData, 1000, this)
        this.getDataCount = createAnishake(this.getDataCount, 1000, this)
        this.queryTable = new QueryTable(props.type)
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
        PubSub.subscribe(`${this.props.name}:condition`, (_, { condition, callback }) => {
            this.setState({
                condition
            })
            this.setDataCount(typeof callback === "function" ? callback : undefined)

        })
        PubSub.subscribe(`${this.props.name}:reflash`, this.setDataCount.bind(this))
        PubSub.subscribe(this.props.name, (_, callback) => {
            this.setState({
                condition: {}
            })
            this.setDataCount(callback)
        })
    }
    // 
    componentWillUnmount() {
        PubSub.unsubscribe(this.props.name)
        PubSub.unsubscribe(`${this.props.name}:condition`)
        PubSub.unsubscribe(`${this.props.name}:reflash`)
    }

    // 组件更新后
    componentDidUpdate(_, prevState) {
        // 如果数据条数发生变化，从新获取数据
        if (this.state.total !== prevState.total) {
            this.setData(this.state.current, this.pagination.pageSize)
        }
    }

    // 获取数据
    getData(page, pageSize) {
        const option = {
            columns: this.props.queryColumns,
            section: [(page - 1) * pageSize, page * pageSize],
        }
        if (Object.getOwnPropertyNames(this.state.condition).length) option.condition = this.state.condition
        // 调用获取方法
        this.queryTable.getData(option)
            .then(({ data }) => {
                const { success, result, message } = data
                if (success) {
                    const data = (result || []).map(item => this.props.toNode(item))
                    // 表格未加载
                    // 刷新表格数据
                    this.setState({
                        dataSource: data,
                        current: page,
                        loading: false
                    })
                } else {
                    message.error(message)
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

    setData(page, pageSize) {
        this.setState({
            loading: true
        })
        // 获取成功
        this.getData(page, pageSize)
    }

    getDataCount(callback) {
        const option = {
            column: "id"
        }, condition = this.state.condition
        if (typeof condition === "object" && condition !== null) option.condition = condition
        // 从后端获取数据
        this.queryTable.getCount(option)
            .then(result => {
                // 获取返回的数据
                const data = result.data
                // 成功获取
                if (data.success) {
                    // 设置数据条数
                    this.setState({
                        total: data.result.id
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
    setDataCount(callback) {
        this.setState({
            loading: true
        })
        this.getDataCount(callback)
    }

    // 渲染方法
    render() {
        // 获取加载状态
        // 数据集
        // 数据总数
        const { loading, dataSource, total } = this.state
        this.pagination.total = total
        return (
            dataSource.length || loading
                ?
                <Table
                    bordered
                    loading={loading}
                    onChange={({ current, pageSize }) => this.getData(current, pageSize)}
                    dataSource={dataSource}
                    pagination={this.pagination}
                    columns={this.props.tableColumns}
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
        this.queryTable = new QueryTable(props.type)
        this.state = {
            inputConfig: props.inputConfig
        }
        this.clickHandle = this.clickHandle.bind(this)
    }

    static getDerivedStateFromProps(props, state) {
        if (state.inputConfig !== props.inputConfig) {
            return {
                inputConfig: props.inputConfig
            }
        }
        return state
    }

    componentDidUpdate(_, state) {
        if (!(state.inputConfig === this.state.inputConfig)) {
            this.alertInput(alertInputTypes.update);
        }
    }

    alertInput(type) {
        const { name } = this.props
        const { inputConfig } = this.state
        alertInput(type, {
            inputConfig,
            name,
            finish: (data, setLoading, modal) => {
                const validResult = this.props.validator(data)
                if (validResult.err) {
                    message.error("添加的数据中有错误")
                    setLoading(false)
                } else {
                    new QueryTable(this.props.type)
                        .insertData(data)
                        .then(({ data }) => {
                            if (data.success) {
                                message.success("数据添加成功")
                                modal.destroy()
                                PubSub.publish(`${this.props.name}:reflash`)
                            } else {
                                message.error(data.message)
                            }
                        })
                        .finally(() => setLoading(false))

                }
            }
        })
    }

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
        type: PropTypes.symbol.isRequired,
        id: PropTypes.number.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        // 修改this指向
        this.clickHandle = this.clickHandle.bind(this)
        // 更改为防抖 
        this.showInfo = createAnishake(this.showInfo, 1000, this)
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
                            id={this.props.id}
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
        const { loading } = this.state
        return (
            <Button
                type="primary"
                loading={loading}
                onClick={this.clickHandle}
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
        // 数据id
        id: PropTypes.number.isRequired,
        // Form组件的配置文件
        inputConfig: PropTypes.array.isRequired,
        // 验证数据的方法
        validator: PropTypes.func.isRequired,
        // Form名字
        name: PropTypes.string.isRequired,
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
            isShow: false
        }
        // 修改this指向
        this.clickHandle = this.clickHandle.bind(this)
        // 创建防抖函数
        this.finish = createAnishake(this.finish, 1000, this)
    }

    componentDidMount() {
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
     * @param { Object } data 表单数据 
     * @param { Function } setLoading 设置Form组件的loading状态
     * @param { Modal } modal Modal的实例对象
     */
    finish(data, setLoading, modal) {
        // 验证结果
        const validResult = this.props.validator(data)
        // 验证失败弹窗警告
        if (validResult.err) return message.error(validResult.message)
        // 更新数据
        this.queryTable.updateData({
            // 条件对象
            condition: {
                // id为指定id
                id: this.props.id,
                // 未被删除
                is_delete: "0"
            }
        }, data)
            .then(({ data }) => {
                // 验证结果
                if (data.success) {
                    // 成功提示
                    message.success("数据更新成功")
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
            columns: inputConfig.filter(config => !config.notSql).map(config => config.item.name),
            condition: {
                id: this.props.id
            }
        })
            .then(({ data }) => {
                if (data.success) {
                    return data.result[0]
                } else return Promise.reject()
            })
            .then((initialValues) => {
                const { name, inputConfig } = this.props
                alertInput(alertInputTypes.create, {
                    name,
                    inputConfig,
                    initialValues,
                    finish: this.finish.bind(this),
                    onCancel: () => {
                        this.setState({
                            isShow: false
                        })
                    }
                })
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
        return (
            <Button
                type="dashed"
                onClick={this.clickHandle}
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
        // 数据的id
        id: PropTypes.number.isRequired,
        // 警告提示节点
        errorNode: PropTypes.node.isRequired
    }

    // 构造器
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
        // 修改this指向
        this.clickHandle = this.clickHandle.bind(this)
        this.queryTable = new QueryTable(props.type)
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
                        id: this.props.id,
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
        const errorNode = this.props.errorNode
        // 创建异步处理
        return new Promise((resolve, reject) => {
            // 弹出警告框
            // 点击确认按钮返回resolve状态
            // 点击取消按钮返回reject状态
            const modal = Modal.error({
                icon: <></>,
                content: (errorNode),
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
                danger
            >删除</Button>
        )
    }

}

class TableFilter extends Component {
    static propTypes = {
        inputConfig: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            keyword: "",
            column: this.props.inputConfig[0].key,
            loading: false
        }

        this.toSearch = this.toSearch.bind(this)
        this.change = this.change.bind(this)
        this.selectHandle = this.selectHandle.bind(this)
    }

    toSearch() {
        this.setState({
            loading: true
        })
        const { column, keyword } = this.state
        PubSub.publish(`${this.props.name}:condition`, {
            condition: {
                [column]: keyword
            },
            callback: () => {
                this.setState({
                    loading: false
                })
            }
        })
    }

    change(e) {
        this.setState({
            keyword: e.target.value
        })
    }

    selectHandle(key) {
        this.setState({
            column: key
        })
    }

    render() {
        const value = this.state.keyword
        const options = this.props.inputConfig.map(
            ({ key, item }) => <Select.Option key={key}>{item.label}</Select.Option>
        )
        return (
            <div className="searchbar">
                <Row justify="space-around">
                    <Col flex="1 1 auto">
                        <Row>
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
                                    placeholder="请输入查询的数据"
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col flex="0 0 60px">
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

class ReflashButton extends Component {
    static propsTypes = {
        name: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
            loading: false
        }
        this.flash = createThrottle(this.flash, 5000, this, () => {
            this.setState({
                disabled: false
            })
        })
        this.clickHandle = this.clickHandle.bind(this)
    }

    clickHandle() {
        this.setState({
            disabled: true
        })
        this.flash()
    }

    flash() {
        this.setState({
            loading: true
        })
        PubSub.publish(this.props.name, () => {
            this.setState({
                loading: false
            })
        })
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
