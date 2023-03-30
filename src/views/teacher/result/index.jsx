/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:12:21
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 22:27:24
 * @FilePath: \student-performance\src\pages\home\result\management\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Space } from 'antd'
import React from 'react'

import ResultList from './components/ResultList'

export default function ResultManagement() {
  return (
    <Space size="middle" direction='vertical' style={{ width: "100%" }}>
      <h3 className="title">成绩管理</h3>
      <ResultList></ResultList>
    </Space>
  )
}
