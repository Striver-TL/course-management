/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-26 10:21:31
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-16 09:36:15
 * @FilePath: \student-performance\src\setupProxy.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const target = 'http://localhost:8081';
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api-dev/v1',{ 
        target: target,
        changeOrigin: true
    })
  );
};