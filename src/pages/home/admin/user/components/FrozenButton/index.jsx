/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-04 09:12:27
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-04 09:14:09
 * @FilePath: \student-performance\src\pages\home\admin\user\components\FrozenButton\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react"
import { Button } from "antd"
import PropTypes from "prop-types"

const FrozenButton = (props) => {
    return <Button>冻结</Button>
}

FrozenButton.propTypes = {
    tableName: PropTypes.string.isRequired,
    type: PropTypes.symbol.isRequired
}

export default FrozenButton
