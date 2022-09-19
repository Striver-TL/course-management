/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-18 12:24:36
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-18 17:26:40
 * @FilePath: \student-performance\src\components\PageComponent\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import PropTypes from 'prop-types'

const PageComponent = (props) => {
    return (
        <div>
            {/* 标题 */}
            <h3 className="title">{ props.title }</h3>
            {/* 页面内容 */}
            { props.children }
        </div>
    );
}

PageComponent.propTypes = {
    title: PropTypes.string.isRequired
}

export default PageComponent
