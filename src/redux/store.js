/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 19:20:12
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-26 11:43:05
 * @FilePath: \student-performance\src\redux\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { combineReducers, createStore } from 'redux'
import RoutePath from '../model/RoutePath'
import UserType from '../model/UserType'
const ActionTypes = {
    LOGIN_USER: Symbol("Login User"),
    PAGE_KEY: Symbol("Page Key"),
    SPECIAL_NAMES: Symbol("Special Key"),
    DEPARMENT_NAMES: Symbol("Department Key"),
    COLLEGE_NAMES: Symbol("College Key"),
    BUILDING_NAMES: Symbol("Building Key")
}

// 登录的用户状态reducer
const loginUser = (preState = null, action) => {
    // 判断type值
    switch (action.type) {
        // 如果是登录用户值
        case ActionTypes.LOGIN_USER:
            // 获取数据
            const data = action.data
            // 重新设置用户类别为UserType中保存的Key
            data.type = UserType.USER_TYPES[data.type]
            return data
        default:
            return preState
    }
}

const pageKey = (preState = null, action) => {
    switch (action.type) {
        case ActionTypes.PAGE_KEY:
            const paths = Object.values(RoutePath)
            for (let path of paths) {
                if (path === action.data) return path
            }
            return preState
        default:
            return preState
    }
}

const specialNames = (preState = {}, action) => {
    switch(action.type) {
        case ActionTypes.SPECIAL_NAMES:
            return Object.assign(preState, action.data)
        default:
            return preState
    }
}

const collegeNames = (preState = {}, action) => {
    switch(action.type) {
        case ActionTypes.COLLEGE_NAMES:
            return Object.assign(preState, action.data)
        default:
            return preState
    }
}

const departmentNames = (preState = {}, action) => {
    switch(action.type) {
        case ActionTypes.DEPARMENT_NAMES:
            return Object.assign(preState, action.data)
        default:
            return preState
    }
}

const buildingNames = (preState = {}, action) => {
    switch(action.type) {
        case ActionTypes.BUILDING_NAMES:
            return Object.assign(preState, action.data)
        default:
            return preState
    }
}

const reducer = combineReducers({
    loginUser,
    pageKey,
    specialNames,
    departmentNames,
    collegeNames,
    buildingNames
})


export const store = createStore(reducer)
export const actionTypes = ActionTypes
