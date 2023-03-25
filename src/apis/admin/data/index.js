/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-14 15:17:31
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-12-01 16:11:43
 * @FilePath: \student-performance\src\apis\admin\data\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import QueryTable from "@/utils/http/utils/QueryTable";
const urls = {
    query: "/admin/query",
    insert: "/admin/insert",
    update: "/admin/update",
    delete: "/admin/delete",
    count: "/admin/count"
}

class Api {

    constructor(key) {
        this.queryTable = new QueryTable(key);
    }

    queryHandle = async option => await this.queryTable.queryHandle(urls.query, option);

    insertHandle = async data => await this.queryTable.insertHandle(urls.insert, data);

    updateHandle = async (option, data) => await this.queryTable.updateHandle(urls.update, option, data);

    deleteHandle = async id => await this.queryTable.deleteHandle(urls.delete, id);

    countHandle = async option => await this.queryTable.countHandle(
        urls.count,
        option);
}

const createApi = key => Object.seal(new Api(key));

export default createApi;