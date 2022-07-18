/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-13 14:22:42
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-16 10:28:02
 * @FilePath: \student-performance\src\components\SearchBar\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Input, Button, Row, Col, message } from 'antd'

import './index.scss'

export default class SearchBar extends Component {
    static propTypes = {
        toSearch: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.state = {
            value: "",
            status: ""
        }
        this.change = this.change.bind(this)
        this.toSearch = this.toSearch.bind(this)
        this.reset = this.reset.bind(this)
    }

    change(e) {
        this.setState({
            value: e.target.value
        })
    }

    reset() {
        this.setState({
            value: ""
        })
    }

    toSearch() {
        if (!this.state.value) {
            message.error("搜索内容不能为空")
            this.setState({
                status: "error"
            })
        }
        this.props.toSearch(this.state.value, this.reset)
    }

    render() {
        const { value, status } = this.state
        return (
            <div className="searchbar">
                <Row justify="space-around">
                    <Col flex="1 1 auto">
                        <Input type="text" onBlur={() => this.setState({
                            status: ""
                        })} status={status} value={value} onChange={this.change} placeholder={this.props.placeholder} />
                    </Col>
                    <Col flex="0 0 60px">
                        <Button className="search-btn" type="primary" onClick={this.toSearch}>搜索</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
