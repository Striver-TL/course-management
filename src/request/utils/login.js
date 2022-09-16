/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-22 15:29:33
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-16 10:03:19
 * @FilePath: \student-performance\src\request\utils\login.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from '../index'

export default class RequestLogin {
    static login(option) {
        return axios(`/login?username=${option.username}&password=${option.password}&type=${option.type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static getLoginUser() {
        return axios("/getLoginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static cancelLogin() {
        return axios("/cancelLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
