/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-09-17 08:24:54
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-02 08:16:56
 * @FilePath: \student-performance\src\pages\home\admin\user\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from "react";
import PageComponent from "../../../../components/PageComponent";
import MyTable from "@/components/MyTable";
import { Space, Tag } from "antd";

import isFrozen from "./utils/isFrozen";
import tableKeys from "../../../../request/config/tableKeys";
import getTimeFromMillsecond from "@/utils/getTimeFromMillsecond";

import "./index.scss"

const tableColumns = [{
    key: "type",
    dataIndex: "type",
    title: "用户类别"
}, {
    key: "username",
    dataIndex: "username",
    title: "用户名"
}, {
    key: "state",
    dataIndex: "state",
    title: "状  态"
}]

const queryColumns = ["username", "type", "frozen_duration", "frozen_time"]
const toNode = (user) => {
    user.key = user.id = user.type + user.username
    user.type = [<Tag color="red">管理</Tag>, <Tag color="blue">教师</Tag>, <Tag color="#E564DC">学生</Tag>][user.type]
    if (isFrozen(user.frozen_time, user.frozen_duration)) {
        let time = getTimeFromMillsecond(new Date(user.frozen_time).getTime() + user.frozen_duration)
        user.state = <span className="user-state user-state-frozen">已冻结({time})</span>
    } else {
        user.state = <span className="user-state user-state-normal">正常</span>
    }
    return user
}

const validator = user => {

}

const inputConfig = [{
    key: "username",
    item: {
        name: "username",
        label: "用户名",
        rules: [{
            required: true,
            message: "请输入用户名"
        }]
    },
    input: {
        type: "input",
        placeholder: "请输入用户名"
    }
}, {
    key: "type",
    item: {
        name: "type",
        label: "用户类别",
        rules: [{
            required: true,
            message: "请选择用户类别"
        }]
    },
    input: {
        type: "select",
        options: [{
            value: "1",
            label: "教师"
        }, {
            value: "2",
            label: "学生"
        }],
        placeholder: "请选择用户类别"
    }
}, {
    key: "password",
    item: {
        name: "password",
        label: "密码",
        rules: [{
            required: true,
            message: "请输入密码"
        }]
    },
    input: {
        type: "passwordd",
        placeholder: "请输入密码"
    }
}]

const UserManagement = () => {
    const tableName = "table_user"
    return <PageComponent title="用户管理">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <MyTable.TableControl
                type={tableKeys.TABLE_USER}
                tableColumns={tableColumns}
                name={tableName}
                validator={validator}
                inputConfig={inputConfig}
            />
            <MyTable
                type={tableKeys.TABLE_USER}
                name={tableName}
                tableColumns={tableColumns}
                queryColumns={queryColumns}
                toNode={toNode}
                >
            </MyTable>
        </Space>
    </PageComponent>
}


export default UserManagement
