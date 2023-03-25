/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 09:06:31
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-14 17:01:53
 * @FilePath: \student-performance\src\components\InfoCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Card, Alert, Spin } from 'antd';
import PropTypes from 'prop-types'

import './index.scss';
import { store } from '../../redux/store';
import tableKeys, { isTableKeys } from '@/utils/http/config/tableKeys';
import QueryTable from '@/utils/http/utils/QueryTable'
import UserType from '../../model/UserType';

// 信息卡片组件
const InfoCard = (props) => {
    let url = {
        [UserType.ADMIN]: '/admin/query',
        [UserType.STUDENT]: '',
        [UserType.TEACHER]: ''
    }[store.getState().loginUser.type];
    // 获取数据类型和数据标识
    const { type, id } = props
    // 组件状态，用于异步加载和展示组件
    const [component, setComponent] = useState(null)
    // 如果组件还未被加载
    if (!component) {
        // 获取组件的函数
        let getComponentFunc = undefined
        // 传入的type合法
        if (isTableKeys(type)) {
            // 获取到对应的引入组件的函数
            getComponentFunc = {
                [tableKeys.TABLE_TEACHER]: () => import("@/components/InfoCard/components/TeacherCard"),
                [tableKeys.TABLE_STUDENT]: () => import("@/components/InfoCard/components/StudentCard"),
                [tableKeys.TABLE_CLASSROOM]: () => import("@/components/InfoCard/components/ClassroomCard"),
                [tableKeys.TABLE_COURSE]: () => import("@/components/InfoCard/components/CourseCard")
            }[type]
        }
        // 没有获取到引入组件的函数
        if (getComponentFunc === undefined) return (
            <Alert type="error" message="无法查看该数据类型的详情信息" />
        )
        // 异步加载组件
        getComponentFunc()
            .then(module => module.default)
            // 更新component状态
            .then(Component => setComponent(<Component queryTable={new QueryTable(type)} id={id} url={url} />))
            // 异常
            .catch(() => setComponent(<Alert type="error" message="组件加载时出错" />))
        return <Spin tip="组件加载中..." />

    }
    return (
        <Card
            className="card"
            size="default"
            bordered={false}
        >
            {component}
        </Card>
    );
}

InfoCard.propTypes = {
    type: PropTypes.symbol.isRequired,
    id: PropTypes.number.isRequired,
}

export default InfoCard
