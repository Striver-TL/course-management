/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-10 17:51:48
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-05 16:47:28
 * @FilePath: \student-performance\craco.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * 
 */
const CracoLessPlugin = require('craco-less');
const path = require("path")

module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src")
        }
    },
    babel: {
        plugins: [
            [
                "import",
                {
                    "libraryName": "antd",
                    "libraryDirectory": "es",
                    "style": true
                }
            ]
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#10ac6c' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ]
};