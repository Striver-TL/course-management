/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-01 14:49:56
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-01 15:16:37
 * @FilePath: \student-performance\src\pages\home\admin\user\utils\isFrozen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const isFrozen = (frozen_time, frozen_duration) => {
    try {
        console.log(frozen_time, frozen_duration)
        const date = new Date(frozen_time);
        return date < Date.now() && date.getTime() + frozen_duration > Date.now();
    } catch (e) {
        return true
    }
}

export default isFrozen
