/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-08-02 10:59:34
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-04 11:38:02
 * @FilePath: \student-performance\src\components\UserForm\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from 'react'

import { Form, Input, Alert } from 'antd'

class UserForm extends Component {
    formData = {}
    constructor(props) {
        super(props)
        this.state = {}
        props.items.forEach(item => {
            this.state[item.key]
        })
    }
    toSubmit() {
        this.props.toSubmit(formData)
    }
    render() {
        const items = this.props.items.map(({key, type, placeholder, name, value}) => <Form.Item key={key}>
            <Input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(e) => {

                    this.formData[key] = e.target.value
                }}
                addonAfter={<Alert type="success" message="" showIcon={true}></Alert>}
            />
        </Form.Item>)
        return (<Form>
            {items}
        </Form>)
    }
}

export default UserForm
