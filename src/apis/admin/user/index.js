/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-16 10:47:20
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-26 10:01:39
 * @FilePath: \student-performance\src\apis\admin\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/utils/http";
import QueryTable from "@/utils/http/utils/QueryTable";
import tableKeys from "@/utils/http/config/tableKeys";
import crypto from "crypto-browserify";

const urls = {
    frozen: "/admin/frozen",
    insert: "/admin/insertUser",
    delete: "/admin/deleteUser",
    query: "/admin/queryUser",
    count: "/admin/countUser"
}

class Api {

    constructor() {
        this.queryTable = new QueryTable(tableKeys.TABLE_USER);
    }

    /**
     * 冻结指定用户接口
     * @param { Number } id 用户的唯一标识
     * @param { Number } timestamp 冻结时长 
     * @returns { Promise } 接口的返回数据
     */
    frozenHandle(id, timestamp) {
        return axios.post(`${urls.frozen}?id=${id}&timestamp=${timestamp}`);
    }
    /**
     * 添加用户接口
     * @param { String } username 用户名 
     * @param { String } password 密码
     * @param { String } type 用户类型
     * @returns { Promise } 接口返回的数据
     */
    insertHandle({ username, password, type }) {
        password = crypto.createHash("md5").update(password).digest("hex");
        return axios.put(`${urls.insert}?type=${type}&username=${username}&password=${password}`);
    }
    /**
     * 删除用户
     * @param { Number } id 用户的唯一标识
     * @param { String } username 用户名
     * @param { String } type 用户类别
     * @returns { Promise } 处理接口返回的数据
     */
    deleteHandle({ condition }) {
        return axios.delete(`${urls.delete}?id=${condition.id}`)
    }

    /**
     * 查询用户数据
     * @param { Object } option  
     * @returns { Promise } 处理接口返回的数据
     */
    queryHandle = async option => await this.queryTable.queryHandle(urls.query, option);

    countHandle = async option => await this.queryTable.countHandle(urls.count, option);
}

export default Object.seal(new Api());

