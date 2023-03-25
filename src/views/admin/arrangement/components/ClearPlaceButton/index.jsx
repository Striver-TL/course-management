/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-24 17:12:14
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-28 16:16:22
 * @FilePath: \student-performance\src\views\admin\arrangement\components\ClearPlaceButton\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState, useEffect } from 'react'
import { Button, message, Modal } from "antd";
import api from '@/apis/admin/arrangement'
import PubSub from "pubsub-js";
import PropTypes from 'prop-types';

function ClearPlaceButton(props) {
    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(-1)
    useEffect(() => {
        PubSub.subscribe(`${props.tableName}:id`, (_, id) => setId(id))
        return () => {
            PubSub.unsubscribe(`${props.tableName}:id`)
        };
    }, [props.tableName]);
    const clickHandle = () => {
        setLoading(true)
        Modal.confirm({
            content: "确定清除此课程的地点安排？",
            onOk: () => {
                api.deleteHandle(id).then(({ data }) => {
                    const { success } = data
                    if (success) {
                        message.success(data.message)
                        PubSub.publish(`${props.tableName}:reflash`)
                    } else message.error(data.message)
                })
                    .catch(() => message.error("清除课程地点时出错"))
                    .finally(() => setLoading(false))
            },
            onCancel: () => {
                setLoading(false)
            },
            okText: "确定",
            cancelText: "取消"
        })
    }
    return <Button type="primary" danger disabled={loading || id < 1} loading={loading} onClick={clickHandle}>清除上课地点</Button>
}

ClearPlaceButton.propTypes = {
    tableName: PropTypes.string.isRequired
}

export default ClearPlaceButton
