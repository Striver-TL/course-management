/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 09:06:31
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-29 07:49:01
 * @FilePath: \student-performance\src\components\InfoCard\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Card, Skeleton, Avatar, Tag, Row, Col, Divider, Space } from 'antd';
import { BankTwoTone, EnvironmentTwoTone, PhoneTwoTone, MailTwoTone } from '@ant-design/icons'

import './index.scss';
import UserType from '../../model/UserType';

const { Meta } = Card
const InfoCard = (props) => {
    const [loading, setLoading] = useState(true)
    const [userinfo] = useState({
        name: "张三",
        gender: "男",
        userType: UserType.STUDENT,
        school: "长沙民政职业技术学院",
        college: "软件学院",
        phone: "18063240519",
        email: "2806717229@qq.com"
    })
    const userLabel = {
        [UserType.ADMIN]: <Tag color="red">管理员</Tag>,
        [UserType.STUDENT]: <Tag color="blue">学生</Tag>,
        [UserType.TEACHER]: <Tag color="green">教师</Tag>
    }[userinfo.userType]
    setTimeout(() => setLoading(false), 1000)

    return (
        <Card
            className="card"
            size="default"
            bordered={false}
        >
            <Skeleton loading={loading} avatar active>
                <Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={<div>{userinfo.name}&nbsp;<Tag>{userinfo.gender}</Tag></div>}
                    description={<div>{userLabel}<Tag color="red">专科</Tag></div>}
                />
            </Skeleton>

            {!props.hiddenContent ? <><Divider /><Skeleton loading={loading} active title={false}>
                <Space direction='vertical' className="card-space">
                    <Row>
                        <Col span={2}><BankTwoTone className="card-icons" twoToneColor="#eb2f96" /></Col>
                        <Col span={16}>{userinfo.school}</Col>
                    </Row>
                    <Row>
                        <Col span={2}><EnvironmentTwoTone className="card-icons" /></Col>
                        <Col span={16}>{userinfo.college}</Col>
                    </Row>
                    <Row>
                        <Col span={2}><PhoneTwoTone className="card-icons" twoToneColor="green" /></Col>
                        <Col span={16}>+86&nbsp;{userinfo.phone}</Col>
                    </Row>
                    <Row>
                        <Col span={2}><MailTwoTone className="card-icons" twoToneColor="orange" /></Col>
                        <Col span={16}>{userinfo.email}</Col>
                    </Row>
                </Space>
            </Skeleton></>
                : <></>
            }
        </Card>
    );
}

export default InfoCard;
