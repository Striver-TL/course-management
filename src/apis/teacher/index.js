/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2023-03-30 11:31:17
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-30 18:01:54
 * @FilePath: \student-performance\src\apis\teacher\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "../../utils/http/index"
const urls = {
    timetable: "teacher/timetable",
    queryInfo: "teacher/userinfo_query",
    updateInfo: "teacher/userinfo_update",

}

const teacherApi = {
    async timetableHandle() {
        return axios.post(urls.timetable)
    },
    async userinfoQueryHandle() {
        return axios.post(urls.queryInfo)
    },
    async userinfoUpdateHandle(userInfo) {
        return axios.put(urls.updateInfo, userInfo)
    }
}

export default teacherApi
