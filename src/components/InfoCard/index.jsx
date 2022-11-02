/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 09:06:31
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-02 09:11:53
 * @FilePath: \student-performance\src\components\InfoCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Card, Alert, Spin } from 'antd';
import PropTypes from 'prop-types'

import './index.scss';
import tableKeys, { tableValues, isTableKeys } from '../../request/config/tableKeys';
import QueryTable from '../../request/utils/QueryTable'

const InfoCard = (props) => {
    const { type, id } = props
    const [component, setComponent] = useState(null)

    if (!component) {
        let getComponentFunc = undefined
        if (isTableKeys(type)) {
            const key = tableValues[type]
            getComponentFunc = {
                [tableValues[tableKeys.TABLE_TEACHER]]: () => import("@/components/InfoCard/components/TeacherCard"),
                [tableValues[tableKeys.TABLE_STUDENT]]: () => import("@/components/InfoCard/components/StudentCard"),
                [tableValues[tableKeys.TABLE_CLASSROOM]]: () => import("@/components/InfoCard/components/ClassroomCard"),
                [tableValues[tableKeys.TABLE_COURSE]]: () => import("@/components/InfoCard/components/CourseCard")
            }[key]
        }

        if (getComponentFunc === undefined) return (
            <Alert type="error" message="无法查看该数据类型的详情信息" />
        )
        getComponentFunc()
            .then(module => module.default)
            .then(Component => setComponent(<Component queryTable={new QueryTable(type)} id={id} />))
            .catch((e) => setComponent(<Alert type="error" message="组件加载时出错" />) || console.log(e))
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
