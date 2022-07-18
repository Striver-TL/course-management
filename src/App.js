/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 17:47:20
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-14 17:48:28
 * @FilePath: \student-performance\src\App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from './pages/home';
import Login from './pages/login';
import NotFound from './pages/404';

import './App.scss';
function App() {
  return (
    <div id="root">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
