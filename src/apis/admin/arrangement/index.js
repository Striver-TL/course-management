/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-24 14:48:15
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-28 16:08:59
 * @FilePath: \student-performance\src\apis\admin\arrangement\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import QueryTable from '@/utils/http/utils/QueryTable'
import tableKeys from '@/utils/http/config/tableKeys'
import axios from '@/utils/http'
const urls = {
    query: "/admin/arrangement_query",
    count: "/admin/count",
    insert: "/admin/place_insert",
    delete: "/admin/place_delete",
    add: "/admin/arrangement_teacher"
}

class Api {
    constructor() {
        this.queryTable = new QueryTable(tableKeys.TABLE_COURSEPLAN);
        this.countTable = new QueryTable(tableKeys.TABLE_ARRANGEMENT);
    }

    deleteHandle = async id => axios.post(`${urls.delete}?id=${id}`);
    insertHandle = async (aid, data) => await axios.post(`${urls.insert}?id=${aid}`, {
        data
    });
    queryHandle = async option => await this.queryTable.queryHandle(urls.query, option);
    countHandle = async option => await this.countTable.countHandle(urls.count, option);
    teacherHandle = async (aid, tid) => await axios.post(`${urls.add}?aid=${aid}&tid=${tid}`);
}

export default Object.seal(new Api());