/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-05 16:32:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-24 11:19:01
 * @FilePath: \student-performance\src\components\LoadableComponent\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import "./index.scss"

import { Spin } from "antd"
 
/**
 * 该组件用于创建一个延迟加载的组件，此延迟为时间上的延迟
 * @author Striver-TL
 * @returns { VNode } 组件返回的内容
 */
const createDelayComponent = () => {
    // 延迟组件
    let DelayComponent = (props) => {
        // 加载状态state
        const [loading, setLoading] = useState(true);

        // 创建effect用于延迟执行取消加载中状态
        useEffect(() => {
            loading && setTimeout(() => {
                setLoading(false)
            }, 400)
            // 组件被销毁时，释放掉DelayComponent
            return () => DelayComponent = null
        })

        // 加载中渲染的内容
        const loadingNode = (
            <div className='page-loading'>
                <div className="page-loading-block">
                    <Spin tip="页面加载中..." />
                </div>
            </div>
        )

        // 返回VNode 
        return (
            // 如果加载中状态则返回加载中节点
            // 如果加载完毕状态则加载指定的组件
            loading
                ?
                loadingNode
                :
                <div className="page-main">
                    {/* 异步加载组件 */}
                    <Suspense fallback={loadingNode}>
                        {/* 异步加载的组件 */}
                        {props.component}
                    </Suspense>
                </div>
        )
    }
    DelayComponent.propTypes = {
        component: PropTypes.node.isRequired
    }

    return DelayComponent
}



/**
 * 
 * @param { Function } loader 具有返回import()的函数 
 * @returns { Vnode } 一个具备懒加载组件的渲染结果
 */
const loadableComponent = loader => {
    const LoadableComponent = React.lazy(loader)
    const DelayComponent = createDelayComponent();
    return <DelayComponent component={<LoadableComponent />} />
}

export default loadableComponent