/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-05 16:32:37
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-05 18:54:53
 * @FilePath: \student-performance\src\components\LoadableComponent\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Loadable from "react-loadable"
import { LoadingOutlined } from "@ant-design/icons"
const loadableComponent = loader => {
    const LoadableComponent = Loadable({
        loader,
        loading: () => (<div>
            <LoadingOutlined />
            <h3>页面加载中...</h3>
        </div>)
    })
    return <LoadableComponent />
}

export default loadableComponent