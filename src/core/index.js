/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-04 19:25:42
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-27 13:41:43
 * @FilePath: \student-performance\src\core\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import QueryTable from "@/utils/http/utils/QueryTable"
import tableKeys from "@/utils/http/config/tableKeys"
import { store, actionTypes } from "@/redux/store"
import axios from "../utils/http/index";

const taskStack = [
    async () => {
        try {
            let { data } = await axios.get("/global/college")
            let { success, result } = data
            if (success) {
                store.dispatch({
                    type: actionTypes.COLLEGE_NAMES,
                    data: result.reduce(
                        (prevent, { college_code, college_name }) => {
                            prevent[college_code] = college_name
                            return prevent
                        },
                        {}
                    )
                })

                data = (await axios.get("global/department")).data;
                [success, result] = [data.success, data.result];
                if (success) {
                    store.dispatch({
                        type: actionTypes.DEPARMENT_NAMES,
                        data: result.reduce(
                            (prevent, { department_code, department_name, college_code }) => {
                                if (!prevent[college_code]) {
                                    prevent[college_code] = {}
                                }
                                prevent[college_code][department_code] = department_name
                                return prevent
                            },
                            {}
                        )
                    });

                    // 查询专业
                    data = (await axios.get("/global/special")).data;
                    [success, result] = [data.success, data.result];
                    // 成功获取到数据
                    if (success) {
                        store.dispatch({
                            type: actionTypes.SPECIAL_NAMES,
                            data: result.reduce(
                                (prevent, { special_code, special_name, department_code }) => {
                                    if (!prevent[department_code]) {
                                        prevent[department_code] = {}
                                    }
                                    prevent[department_code][special_code] = special_name
                                    return prevent
                                },
                                {}
                            )
                        })
                    }
                }

            }
        } catch (e) {
            console.log(e)
        }
    },
    async () => {
        let { data } = await new QueryTable(tableKeys.TABLE_BUILDING).queryHandle("/admin/query", {
            columns: ["building_code", "building_name"]
        })
        const { success, result } = data
        success && store.dispatch({
            type: actionTypes.BUILDING_NAMES,
            data: result.reduce((obj, item) => {
                obj[item.building_code] = item.building_name
                return obj
            }, {})
        })
    }
]

const toInstall = (thenFunc, catchFunc, successFunc) => {
    taskStack.splice.apply([0, taskStack.length].concat(taskStack.map(
        func => func().then(thenFunc).catch(catchFunc)
    )))
    Promise.all(taskStack)
        .then(successFunc)
}

export const install = toInstall
export const stack = taskStack
