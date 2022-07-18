/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 18:04:16
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-17 18:42:44
 * @FilePath: \student-performance\src\components\MySchedule\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
import { Table, Tag } from 'antd'

import './index.scss'
export default class MySchedule extends Component {
    static columns = [
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

    constructor(props) {
        super(props)
        this.state = {
            dataSource: [{
                key: "1",
                courseIndex: "1",
                one: <>
                    <div>机器学习</div><Tag color="lime">12-101</Tag>
                </>,
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "2",
                courseIndex: "2",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "3",
                courseIndex: "3",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "4",
                courseIndex: "4",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "5",
                courseIndex: "5",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "6",
                courseIndex: "6",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "7",
                courseIndex: "7",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }, {
                key: "8",
                courseIndex: "8",
                one: "数学",
                two: "数学",
                three: "数学",
                four: "数学",
                five: "数学"
            }]
        }
    }

    render() {
        return (
            <div className='table'>
                <h3 className='title'>我的课表</h3>
                <Table size='small' bordered={true} pagination={false} dataSource={this.state.dataSource} columns={MySchedule.columns} />
            </div>
        )
    }
}
