/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 17:23:14
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 00:36:58
 * @FilePath: \student-performance\src\pages\404\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { useNavigate } from 'react-router'

import { Result, Button } from 'antd'

export default function NotFound() {
    const navigate = useNavigate()
    const toNavigate = path => () => {
      navigate(path)
    }

  return (<Result
    status="404"
    title="404"
    subTitle="抱歉，该网页不存在！"
    extra={<><Button type="primary" onClick={toNavigate("/home")}>首页</Button><Button type="primary" onClick={toNavigate("/login")}>登录</Button></>}
  />)
}
