/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-19 16:04:02
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-15 19:15:41
 * @FilePath: \student-performance\src\request\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import PubSub from 'pubsub-js';

// axios.defaults.withCredentials = true

const service = axios.create({
    baseURL: "/api-dev/v1",
    headers: { authorization: localStorage.getItem("token") },
    timeout: 100000,
    // withCredentials: true
})
const authorization_key = "SERVICE_UN_AUTHORIZATION"
service.interceptors.response.use(response => {
    if (response.data.code === 401) PubSub.publish(authorization_key);
    return response;
})
export default service
export const setAuthorization = (token) => service.defaults.headers.authorization = token;
export const onUnAuthorization = callback => PubSub.subscribe(authorization_key, callback);
export const offUnAuthorization = callback => PubSub.unsubscribe(authorization_key, callback);