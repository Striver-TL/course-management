/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 17:52:45
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 18:00:29
 * @FilePath: \student-performance\src\components\MyNotice\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react';
import { Timeline } from 'antd';

class MyNotice extends Component {
    render() {
        return (
            <div>
                <h3 className='title'>我的公告</h3>
                <Timeline pending="Recording..." style={{
                    paddingLeft: "30px"
                }}>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
            </div>
        );
    }
}

export default MyNotice;
