/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-11-22 14:27:24
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-11-25 08:32:36
 * @FilePath: \student-performance\src\components\MyForm\components\SelectModal\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Button, Modal, Space, Input } from "antd";
import React from "react";
import PropTypes from 'prop-types'
import MyTable from '@/components/MyTable'
import PubSub from "pubsub-js";

class SelectModal extends React.Component {

    static propTypes = {
        placeholder: PropTypes.string,
        queryHandle: PropTypes.func.isRequired,
        countHandle: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        queryColumns: PropTypes.array.isRequired,
        tableColumns: PropTypes.array.isRequired,
        toNode: PropTypes.func.isRequired,
        joins: PropTypes.object
    }

    id = ""

    componentDidMount() {
        PubSub.subscribe(`${this.props.name}:id`, (_, id) => this.id = id)
    }

    componentWillUnmount() {
        PubSub.unsubscribe(`${this.props.name}:id`)
        PubSub.unsubscribe(`selectModal:${this.props.name}`)
    }

    render() {
        const { countHandle, queryHandle, name, tableColumns, queryColumns, toNode, joins } = this.props

        const ModalComponent = () => {
            const clickHandle = () => {
                Modal.info({
                    icon: <></>,
                    content: <>
                        <MyTable
                            name={name}
                            countHandle={countHandle}
                            queryHandle={queryHandle}
                            tableColumns={tableColumns}
                            queryColumns={queryColumns}
                            toNode={toNode}
                            joins={joins}
                        />
                    </>,
                    closable: true,
                    okCancel: false,
                    okText: "确定",
                    onOk: () => {
                        PubSub.publish(`selectModal:${name}`, this.id)
                    }
                })
            }
            return <Button onClick={clickHandle}>选择</Button>
        }

        return (
            <Space size="middle">
                <Input disabled={true} placeholder={this.props.placeholder} />
                <ModalComponent />
            </Space>
        )
    }

}

export default SelectModal
