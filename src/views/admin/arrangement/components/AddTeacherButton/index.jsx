/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-09 08:50:44
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-28 16:15:06
 * @FilePath: \student-performance\src\pages\home\admin\arrangement\components\AddTeacherButton\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react";
import { Button, message, Modal, Tag } from "antd";
import PubSub from "pubsub-js";
import PropTypes from 'prop-types';
import createApi from "@/apis/admin/data";
import Teacher from "@/model/Teacher";
import "./index.scss"
import MyTable from "@/components/MyTable";
import tableKeys from "@/utils/http/config/tableKeys";
import arrangementApi from "@/apis/admin/arrangement";
const api = createApi(tableKeys.TABLE_TEACHER)
const columns = [{
    key: "tno",
    dataIndex: "tno",
    title: "教师号"
}, {
    key: "tname",
    dataIndex: "tname",
    title: "教师姓名"
}, {
    key: "gender",
    dataIndex: "gender",
    title: "性别"
}]

// 根据获取的数据转为相应节点
let toNode = ({ tno, tname, gender }) => {
    // 创建教师类
    let teacher = new Teacher({
        tno,
        tname,
        gender
    })
    teacher.key = tno
    // 
    teacher.gender = <Tag color={gender === "0" ? "pink" : "blue"}>{gender === "0" ? "女" : "男"}</Tag>
    return teacher
}


// 添加/更改教师按钮
const AddTeacherButton = (props) => {
    const [id, setId] = useState(-1)
    const tableName = "addTeacher"
    // 
    useEffect(
        () => {
            PubSub.subscribe(`${props.tableName}:id`, (_, id) => {
                setId(id)
            })
            return () => PubSub.unsubscribe(`${props.tableName}:id`)
        },
        // 仅在组件挂载和卸载时触发
        [props.tableName]
    )

    const clickHandle = () => {
        let tid = -1
        PubSub.subscribe(`${tableName}:id`, (_, id) => tid = id)
        Modal.info({
            icon: <></>,
            content: <MyTable
                // 表格类信息
                tableColumns={columns}
                // 查询的字段
                queryColumns={["id", "tno", "tname", "gender"]}
                toNode={toNode}
                name={tableName}
                queryHandle={api.queryHandle}
                countHandle={api.countHandle}
            />,
            onOk() {
                if (tid === -1) message.error("请选择指定的教师后确定")
                else {
                    arrangementApi.teacherHandle(id, tid)
                        .then(({ data }) => {
                            if (data.success) {
                                message.success(data.message)
                                PubSub.publish(`${props.tableName}:reflash`)
                            }
                            else message.error(data.message)
                        })
                        .catch(() => message.error("添加教师出错"))
                }
            },
            onCancel() {
                PubSub.unsubscribe(`${tableName}:id`)
            },
            okCancel: true,
            cancelText: "取消",
            okText: "确定",
        })
    }

    return (
        <Button type="primary" className="addTeacherBtn" disabled={id === -1} onClick={clickHandle}>添加教师</Button>
    )
}

AddTeacherButton.propTypes = {
    tableName: PropTypes.string.isRequired
}

export default AddTeacherButton
