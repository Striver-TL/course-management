/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 17:47:20
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-06 15:22:11
 * @FilePath: \student-performance\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Route, useLocation } from 'react-router'
import { Routes } from 'react-router-dom'

import loadableComponent from './components/loadableComponent';

import store from './redux/store';

import './App.scss';
const RouteComponent = () => {
    const location = useLocation()
    const pathname = location.pathname.split("/")[1] || "home"
    const loginUser = store.loginUser.getState()
    if (loginUser) {
        if (pathname === "home") {
            return loadableComponent(() => import("@/pages/home"))
        } else {
            return loadableComponent(() => import("@/pages/404"))
        }
    } else {
      return loadableComponent(() => import("@/pages/login"))
    }
}
function App() {
  return (
    <div id="root">
      <Routes>
        <Route path="*" element={<RouteComponent />} />
      </Routes>
    </div>
  );
}

export default App;
