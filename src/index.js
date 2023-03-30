/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 17:47:20
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-28 20:19:45
 * @FilePath: \student-performance\src\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from "antd";
import zhCN from 'antd/lib/locale/zh_CN';
import 'lib-flexible/flexible'
import 'moment/locale/zh-cn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
