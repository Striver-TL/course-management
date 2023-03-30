/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-17 13:57:34
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-27 10:16:59
 * @FilePath: \student-performance\src\apis\base\login\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import axios from "@/utils/http";
import crypto from "crypto-browserify";
import { actionTypes, store } from "@/redux/store.js"

const urls = {
    login: "/login",
    cancel: "/cancel_login",
    info: "/user_info"
}
class Api {
    /**
     * 登录接口
     * @param { String } username 用户名 
     * @param { String } password 密码 
     * @param { String } type 用户类型
     * @returns { Object } 接口返回的结果
     */
    async loginHandle(username, password, type) {
        return await axios.post(`${urls.login}?username=${username}&password=${crypto.createHash("md5").update(password).digest("hex")}&type=${type}`);
    }

    /**
     * 取消登录接口
     * @returns { Object } 接口返回的结果
     */
    async cancelHandle() {
        let token = window.localStorage.getItem("token");
        if (token) window.localStorage.removeItem("token");
        return await axios.post(urls.cancel);
    }

    /**
     * 获取登录信息接口
     * @returns { Object } 接口返回的结果
     */
    async infoHandle() {
        return await axios.get(urls.info).then(({ data }) => {
            // success为用户是否登录
            // result为登录的用户信息
            const { success, result } = data
            // 登录成功并且有用户信息则进行登录后的路由跳转
            // 否则加载登录页面
            success && result && store.dispatch({
                type: actionTypes.LOGIN_USER,
                data: result
            })
        });
    }
}

export default Object.seal(new Api());
