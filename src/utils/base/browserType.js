/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-18 14:20:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-10-31 15:15:26
 * @FilePath: \student-performance\src\utils\browserType.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const browerType = (option) => {

    let sUserAgent = navigator.userAgent.toLowerCase()  //浏览器的用户代理设置为小写，再进行匹配

    let isIpad = !!sUserAgent.match(/ipad/i) //或者利用indexOf方法来匹配

    let isIphoneOs = !!sUserAgent.match(/iphone os/i)

    let isMidp = !!sUserAgent.match(/midp/i) //移动信息设备描述MIDP是一套Java应用编程接口，多适用于塞班系统

    let isUc7 = !!sUserAgent.match(/rv:1.2.3.4/i)  //CVS标签

    let isUc = !!sUserAgent.match(/ucweb/i)

    let isAndroid = !!sUserAgent.match(/android/i)

    let isCe = !!sUserAgent.match(/windows ce/i)

    let isWM = !!sUserAgent.match(/windows mobil/i)

    if (isIpad || isIphoneOs || isMidp || isUc7 || isUc || isAndroid || isCe || isWM) {
        option.mobile && option.mobile()
    } else {
        option.client && option.client()
    }

}

export default browerType
