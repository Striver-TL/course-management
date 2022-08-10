/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 17:05:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-04 13:18:10
 * @FilePath: \student-performance\src\components\MyTable\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { Table } from "antd"

class Index extends Component {
    static propTypes = {
        total: PropTypes.number.isRequired,
        getData: PropTypes.func.isRequired,
        columns: PropTypes.array.isRequired
    }

    // 获取数据
    getData(page, pageSize) {
        this.setState({
            loading: true
        })
        this.props.getData(page, pageSize).then(data => {
            data.forEach(teacher => teacher.key = teacher.tno)
            this.setState({
                dataSource: data,
                loading: false
            })
            console.log(this.state.dataSource, data)
        }).catch(() => {
            this.setState({
                loading: false
            })
        })
    }

    constructor(props) {
        super(props)
        // 数据总条数
        this.pagination.total = props.total
        this.state = {
            // 表格是否正在加载
            loading: false,
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
    componentDidMount() {
        this.getData(1, this.pagination.pageSize)
    }
    // 渲染方法
    render() {
        const { loading, dataSource } = this.state
        return (
            <Table
                bordered
                loading={loading}
                onChange={this.getData}
                dataSource={dataSource}
                pagination={this.pagination}
                columns={this.props.columns}
                size="small"
            />
        );
    }
}

export default Index;
