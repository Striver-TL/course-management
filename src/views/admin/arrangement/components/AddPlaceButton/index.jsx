/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-23 11:32:21
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-29 17:09:53
 * @FilePath: \student-performance\src\views\admin\arrangement\components\AddPlaceButton\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from 'react'
import { Button, message, Tag } from "antd"
import PropTypes from 'prop-types'
import api from '@/apis/admin/arrangement'
import alertInput, { alertInputTypes } from "@/components/alertInput";
import PubSub from "pubsub-js";
import CoursePlan from "@/model/CoursePlan"
import createApi from '@/apis/admin/data'
import tableKeys from '@/utils/http/config/tableKeys';

const baseApi = createApi(tableKeys.TABLE_CLASSROOM)

function AddPlaceButton(props) {
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState(-1);


    const inputConfig = [{
        key: "cid",
        item: {
            name: "cid",
            label: "教室",
            rules: [{
                required: true
            }]
        },
        input: {
            type: "modal",
            queryHandle: baseApi.queryHandle,
            countHandle: baseApi.countHandle,
            tableColumns: [{
                key: "building_code",
                dataIndex: "building_code",
                title: "教学楼编号"
            }, {
                key: "building_name",
                dataIndex: "building_name",
                title: "教学楼名称"
            }, {
                key: "layer_code",
                dataIndex: "layer_code",
                title: "教室号"
            }, {
                key: "capacity",
                dataIndex: "capacity",
                title: "容纳人数"
            }],
            queryColumns: ["classrooms.id id", "building_code", "building_name", "layer", "code", "capacity"],
            joins: {
                buildings: ["bid", "id"]
            },
            toNode: data => {
                console.log(data)
                data.key = data.id
                data.layer_code = <Tag color="blue">{`${data.layer}-${data.code}`}</Tag>
                return data
            }
        }
    }, {
        key: "day",
        item: {
            name: "day",
            label: "上课时间（天）",
            rules: [{
                required: true,
                message: "请选择上课时间"
            }]
        },
        input: {
            type: "select",
            options: [{
                value: "0",
                label: "星期日"
            }, {
                value: "1",
                label: "星期一"
            }, {
                value: "2",
                label: "星期二"
            }, {
                value: "3",
                label: "星期三"
            }, {
                value: "4",
                label: "星期四"
            }, {
                value: "5",
                label: "星期五"
            }, {
                value: "6",
                label: "星期六"
            }]
        }
    }, {
        key: "section",
        item: {
            name: "section",
            label: "上课时间（节）",
            rules: [{
                required: true,
                message: "请选择上课节"
            }]
        },
        input: {
            type: "select",
            options: [{
                value: "1-2",
                label: "1-2"
            }, {
                value: "3-4",
                label: "3-4"
            }, {
                value: "1-4",
                label: "1-4"
            }, {
                value: "5-6",
                label: "5-6"
            }, {
                value: "7-8",
                label: "7-8"
            }, {
                value: "5-8",
                label: "5-8"
            }, {
                value: "9-10",
                label: "9-10"
            }]
        }
    }]

    const clickHandle = () => {
        setLoading(true)
        alertInput(alertInputTypes.create, {
            inputConfig,
            name: props.tableName,
            finish: (values, setModalLoading, modal) => {
                setLoading(false)
                const [ start_section, end_section ] = values.section.split("-")
                delete values.section
                values.start_section = +start_section
                values.end_section = +end_section
                values.aid = id
                // 先对数据进行验证
                const coursePlan = new CoursePlan(values)
                const validResult = coursePlan.toValid({
                    aid: "实施编号格式有误",
                    cid: "教室编号格式有误",
                    start_section: "起始上课时间格式有误",
                    end_section: "结束上课时间格式有误",
                    day: "上课时间格式有误"
                })
                // 未通过验证
                if (validResult.err) {
                    setModalLoading(false)
                    message.error(validResult.message)
                    return
                }
                api.insertHandle(values.aid, values)
                    .then(({ data }) => {
                        if (data.success) { 
                            PubSub.publish(`${props.tableName}:reflash`)
                            message.success(data.message)
                            modal.destroy()
                        }
                        else message.error(data.message)
                    })
                    .finally(() => setModalLoading(false))
            }
        })
    }

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

    return (<Button loading={loading} type="primary" color="blue" onClick={clickHandle} disabled={id < 0 || loading} >添加地点</Button>)
}

AddPlaceButton.propTypes = {
    tableName: PropTypes.string.isRequired
}

export default AddPlaceButton
