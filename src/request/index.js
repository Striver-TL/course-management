/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-19 16:04:02
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-09-17 18:43:17
 * @FilePath: \student-performance\src\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'

// axios.defaults.withCredentials = true

const service = axios.create({
    baseURL: "/server",
    timeout: 30000,
    // withCredentials: true
})

export default service
