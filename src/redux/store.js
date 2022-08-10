/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:20:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-29 07:41:12
 * @FilePath: \student-performance\src\redux\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'redux'
import RoutePath from '../model/RoutePath'
let loginUser = null
try {
    let jsonUser = localStorage.getItem("loginUser")
    if (jsonUser) {
        loginUser = JSON.parse(jsonUser)
    }
} catch(e) {}
const store = {
    // 用户类别
    loginUser: createStore((preState=loginUser, action) => {
        return action.data || preState 
    }),
    // 页面key
    pageKey: createStore((preState=null, action) => {
        const paths = Object.values(RoutePath)
        for (let path of paths) {
            if (path === action.data) return path
        }
        return preState
    })
}

export default store
