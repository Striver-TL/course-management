/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-21 16:33:34
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-20 22:32:45
 * @FilePath: \student-performance\src\apis\admin\select\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "@/utils/http"
import QueryTable from "../../../../utils/http/utils/QueryTable";

const urls = {
    insert: "/admin/selectcourse_insert",
    delete: "/admin/selectcourse_delete",
    query: "/admin/selectcourse_query",
    count: "/admin/selectcourse_count"
}

class Api {
    insertHandle = async data => await axios.post(urls.insert, data);

    deleteHandle = async option => await axios.post(`${urls.delete}?${QueryTable.toQueryParam(option)}`);

    queryHandle = async option => await axios.post(`${urls.query}?${QueryTable.toQueryParam(option)}`);
    countHandle = async option => await axios.post(`${urls.count}?${QueryTable.toQueryParam(option)}`);
}

export default Object.seal(new Api());