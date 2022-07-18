/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:20:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 00:50:16
 * @FilePath: \student-performance\src\redux\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createStore } from 'redux'
import UserType from '../model/UserType'
import RoutePath from '../model/RoutePath'
const store = {
    // 用户类别
    userType: createStore((preState=null, action) => {
        console.log(action)
        switch(action.data) {
            case "1":
            case "2":
            case "3":
                return UserType.USER_TYPES[action.data]
            default: 
                return preState
        }
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
