/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2023-03-27 10:37:46
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 16:36:26
 * @FilePath: \student-performance\src\apis\student\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "../../utils/http/index";

const urls = {
    timetable: "student/timetable",
    result: "student/result",
    querySelect: "student/select_query",
    insertSelect: "student/select_insert",
    deleteSelect: "student/select_delete",
    queryInfo: "student/userinfo_query",
    updateInfo: "student/userinfo_update"
}

const studentApi = {
    // 获取课表接口
    async timetableHandle() {
        return axios.post(urls.timetable)
    },
    // 获取成绩接口
    async resultHandle() {
        return axios.post(urls.result)
    },
    // 获取选课课程
    async selectQueryHandle() {
        return axios.post(urls.querySelect)
    },
    // 选课接口
    async selectInsertHandle(aid) {
        return axios.put(`${urls.insertSelect}?aid=${aid}`)
    },
    // 取消选课接口
    async selectDeleteHandle(aid) {
        return axios.delete(`${urls.deleteSelect}?aid=${aid}`)
    },
    // 获取个人信息接口
    async userinfoQueryHandle() {
        return axios.post(urls.queryInfo)
    },
    async userinfoUpdateHandle(userinfo) {
        return axios.put(urls.updateInfo, userinfo)
    }
}

export default studentApi;
