/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-21 16:33:34
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-19 17:52:29
 * @FilePath: \student-performance\src\apis\admin\select\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/utils/http"
import QueryTable from "@/utils/http/utils/QueryTable";
import tableKeys from '@/utils/http/config/tableKeys'

const urls = {
    insert: "/admin/selectplan_insert",
    delete: "/admin/selectplan_delete",
    update: "/admin/selectplan_update",
    query: "/admin/query",
    count: "/admin/count"
}

class Api {
    constructor() {
        this.queryTable = new QueryTable(tableKeys.TABLE_SELECTPLAN);
    }
    insertHandle = async data => await axios.post(`${urls.insert}?${QueryTable.toQueryParam(data)}`);

    updateHandle = async (option, data) => await axios.post(`${urls.update}?${QueryTable.toQueryParam(option)}`, data);

    deleteHandle = async option => await axios.post(`${urls.delete}?${QueryTable.toQueryParam(option)}`);

    queryHandle = async option => await this.queryTable.queryHandle(urls.query, option);
    countHandle = async option => await this.queryTable.countHandle(urls.count, option);
}

export default Object.seal(new Api());