/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 18:04:16
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 11:36:15
 * @FilePath: \student-performance\src\components\MySchedule\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
import { Row, Space, Tag } from 'antd';
import PropTypes from "prop-types"
import { Table, Alert } from 'antd'
import UserType from '../../model/UserType'
import { store } from '../../redux/store'

import './index.scss'
const columns = [
    {
        title: "课程",
        dataIndex: 'courseIndex',
        key: "courseIndex",
        width: "9%"
    }, {
        title: "一",
        dataIndex: 'one',
        key: "one",
        width: "13%"
    }, {
        title: "二",
        dataIndex: 'two',
        key: "two",
        width: "13%"
    }, {
        title: "三",
        dataIndex: 'three',
        key: "three",
        width: "13%"
    }, {
        title: "四",
        dataIndex: 'four',
        key: "four",
        width: "13%"
    }, {
        title: "五",
        dataIndex: 'five',
        key: "five",
        width: "13%"
    }, {
        title: "六",
        dataIndex: 'six',
        key: "six",
        width: "13%"
    }, {
        title: "日",
        dataIndex: 'seven',
        key: "seven",
        width: "13%"
    }
]

const toSource = (() => {
    const days = {
        "0": "seven",
        "1": "one",
        "2": "two",
        "3": "three",
        "4": "four",
        "5": "five",
        "6": "six"
    };
    let returnResult = null;
    return (result) => {
        returnResult = [{
            key: "1",
            courseIndex: "1-2"
        }, {
            key: "2",
            courseIndex: "3-4"
        }, {
            key: "3",
            courseIndex: "5-6"
        }, {
            key: "4",
            courseIndex: "7-8"
        }, {
            key: "5",
            courseIndex: "9-10"
        }]
        // 遍历所有选课信息
        result.forEach(item => {
            // 需要的数据
            const { start_section, end_section, day, cname, week_start, week_end, building_name, layer, code } = item;
            // 为指定天的指定节添加课程信息
            for (let i = Math.floor(start_section / 2); i < end_section / 2; i++) {
                // returnResult[i]为指定节数据
                // days[day]表示某天的某节数据
                if (!returnResult[i][days[day]]) returnResult[i][days[day]] = [];
                returnResult[i][days[day]].push(<Row key={`${i}`}>
                    <Space color="gray" size="small" direction="horizontal">
                        <h6>{cname}</h6>
                        <Tag color="blue">{`${building_name} ${layer}${code}`}</Tag>
                        <Tag color="red">{`${week_start}-${week_end}周`}</Tag>
                    </Space>
                </Row>)
            };
        });
        // 将每节存储的VNode数组转为VNode
        returnResult.forEach(item => {
            Object.keys(days).forEach(key => {
                if (item[key]) item[key] = <Space size="small" direction="vertical">{item[key]}</Space>
            })
        });
        return returnResult;
    }
})();

class MySchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isLoading: true,
            dataSource: []
        }
    }

    componentDidMount() {
        (async () => {
            try {
                const result = await this.props.queryHandle();
                if (!result.data.success) return this.setState({
                    error: true
                });
                this.setState({
                    dataSource: store.getState().loginUser.type !== UserType.ADMIN ? toSource(result.data.result) : [],
                    isLoading: false
                });
            } catch (e) {
                console.log(e)
                this.setState({ error: true })
            }
        })();
    }

    render() {
        return (
            <div className='table'>
                <h3 className='title'>我的课表</h3>
                {!this.state.error ? <Table size='small' bordered={true} pagination={false} dataSource={this.state.dataSource} columns={columns} loading={this.state.isLoading} /> : <Alert message="课表加载失败" type='error' />}
            </div>
        )
    }
}

MySchedule.propTypes = {
    queryHandle: PropTypes.func.isRequired,
}

export default MySchedule
