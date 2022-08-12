/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 17:05:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-11 19:20:13
 * @FilePath: \student-performance\src\components\MyTable\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table } from "antd"

class MyTable extends Component {
    static propTypes = {
        // 数据总条数
        total: PropTypes.number.isRequired,
        // 数据获取函数
        getData: PropTypes.func.isRequired,
        // 表格列配置
        columns: PropTypes.array.isRequired
    }

    // 获取数据
    getData(page, pageSize) {
        // 表格加载中
        this.setState({
            loading: true
        })
        // 调用获取方法
        this.props.getData(page, pageSize)
            // 获取成功
            .then(data => {
                // 为数据添加key
                data.forEach(teacher => teacher.key = teacher.tno)
                // 表格未加载
                // 刷新表格数据
                this.setState({
                    dataSource: data,
                    current: page,
                    loading: false
                })
            })
            // 获取失败
            .catch(() => {
                // 表格未加载
                this.setState({
                    loading: false
                })
            })
    }

    // 构造器
    constructor(props) {
        super(props)
        // 数据总条数
        this.state = {
            // 表格是否正在加载
            loading: false,
            // 
            total: props.total,
            // 当前页码
            current: 1,
            // 表格数据
            dataSource: []
        }
        this.getData = this.getData.bind(this)
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
        this.getData(1, this.pagination.pageSize)
    }
    // 
    componentDidUpdate(prevState) {
        if (this.state.total !== prevState.total) {
            this.getData(this.state.current, this.pagination.pageSize)
        }
    }
    // 
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.total !== prevState.total) {
            return {
                total: nextProps.total
            }
        }
        return {}
    }
    // 渲染方法
    render() {
        const { loading, dataSource, total } = this.state
        this.pagination.total = total
        return (
            <Table
                bordered
                loading={loading}
                onChange={({current, pageSize}) => this.getData(current, pageSize)}
                dataSource={dataSource}
                pagination={this.pagination}
                columns={this.props.columns}
                size="small"
            />
        );
    }
}

export default MyTable;
