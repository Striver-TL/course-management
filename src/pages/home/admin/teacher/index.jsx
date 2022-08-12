/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 23:19:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-08-11 19:54:06
 * @FilePath: \student-performance\src\pages\home\admin\teacher\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';

import SearchBar from '@/components/SearchBar'
import MyTable from '@/components/MyTable'
import { Empty, Button, Row, Col, Space, Modal, Tag, message } from 'antd';

import axios from "@/request"
import PubSub from 'pubsub-js';

import QueryTeacher from '@/request/utils/teacher';

import Teacher from '@/model/Teacher'

// 教师表格组件
// 用于展示和操作教师信息
const TeacherTable = (() => {
    // 教师表格列信息
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
    }, {
        key: "control",
        dataIndex: "control",
        title: "操作"
    }]

    // 查看教师详细信息的方法
    const showTeacher = tno => {
        // 异步导入模块
        // 用不到该组件时释放组件的内存占用
        import("@/components/InfoCard").then(res => {
            const InfoCard = res.default
            // 已模态框的形式显示教师信息
            Modal.info({
                title: "教师信息",
                content: (<InfoCard type="teacher" tno={tno} />),
                okText: "确定",
                icon: <></>
            })
        }).catch(() => message.error("查看教师信息失败"))
    }

    const deleteTeacher = tno => {
        Modal.error({
            title: "提示信息",
            content: <span>确认删除教工号<Tag color="red">{tno}</Tag>的教师信息？</span>,
            okText: "确定",
            okCancel: true,
            cancelText: "取消",
            onOk() {
                QueryTeacher.deleteTeacher(tno).then(res => {
                    if (res.data.success) {
                        message.success("删除信息成功！")
                        PubSub.publish("count update")
                    }
                    else message.error("删除信息失败！")
                }).catch(() => {
                    message.error("删除信息失败！")
                })
            }
        })
    }

    // 
    const toNode = ({ tno, tname, gender }) => {
        // 创建教师类
        const teacher = new Teacher({
            tno,
            tname,
            gender
        })
        // 
        teacher.gender = <Tag color={gender === "0" ? "pink" : "blue"}>{teacher.gender}</Tag>
        // 操作按钮
        teacher.control = (
            <Space direction="horizontal" size="small">
                <Button type="primary" onClick={showTeacher}>详情</Button>
                <Button type="dashed" onClick={() => {
                    QueryTeacher.queryTeacher
                    alertTeacherInput({
                        title: "修改教师信息",
                        name: "changeTeacher",
                        finish() {

                        },
                        inputs: {
                        }
                    })
                }}>修改</Button>
                <Button type="primary" onClick={() => deleteTeacher(tno)} danger>删除</Button>
            </Space>
        )
        return teacher
    }

    /**
     * 
     * @author Striver-TL
     * @param { Number } page 页码
     * @param { Number } pageSize 页显示数据数量
     * @returns { Promise } 处理获取数据的promise对象
     */
    const getData = (page, pageSize) =>
    // 调用获取教师数据方法获取数据
    // page - 1 * pageSize = 起始数据索引
    // page * pageSize = 结束数据索引
    (QueryTeacher.getTeacherData((page - 1) * pageSize, page * pageSize)
        // 从后端成功获取到数据
        .then(res => {
            // 获取成功返回表格行数据
            if (res.data.success) {
                // 返回处理后的数组
                return res.data.result.map(toNode)
            }
            // 获取失败返回空数据
            else return []
        })
        .catch(() => [])
    )

    // TeacherTable组件
    return () => {
        // 创建数据数量state
        // null 表示未获取数据数量
        const [count, setCount] = useState(null)

        // 没有获取数据数量就先获取
        if (count === null) {
            const getCount = () => {
                axios("/getTeacherCount", {
                    method: "GET"
                }).then(res => {
                    // 获取成功后更新state
                    if (res.data.success) setCount(res.data.result)
                })
            }
            PubSub.subscribe("count update", getCount)
            getCount()
        }
        console.log(count)
        // JSX
        return (
            // 是否存在教师数据
            count > 0 ?
                // 存在
                <MyTable
                    columns={columns}
                    getData={getData}
                    total={count || 0}
                />
                :
                // 不存在
                <Empty />
        )
    }
})()

const TeacherManagement = () => {
    return (
        <div>
            <h3 className="title">教师管理</h3>
            <Row>
                <Col><SearchBar toSearch={() => { }} /></Col>
                <Col><Button type="primary" onClick={() => {
                    alertTeacherInput({
                        title: "添加教师",
                        name: "addTeacher",
                        inputs: {},
                        /**
                        * 该函数会在MyForm组件表单提交时执行
                        * @param { Object } data 表单数据 
                        * @param { Function } setLoading MyForm组件中用于设置加载中状态的set函数 
                        */
                        finish: (data, setLoading, modal) => {
                            // 如果存在生日调用Moment对象的format方法转换为字符串
                            data.birthday && (data.birthday = data.birthday.format("yy-MM-DD"));
                            QueryTeacher.insertTeacher(data).then(({ data }) => {
                                // 取消加载中状态
                                setLoading(false);
                                if (data.success) {
                                    // 销毁模态框
                                    modal.destroy();
                                    // 给出提示
                                    message.success("添加教师成功！")
                                    // 
                                    PubSub.publish("count update")
                                } else {
                                    message.error(data.message)
                                }
                            }).catch(() => {
                                setLoading(false)
                                message.error("添加教师失败！")
                            })

                        }
                    })
                }} danger>添加教师</Button></Col>
            </Row>
            <br />
            <TeacherTable />
        </div>
    );
}

function alertTeacherInput(config) {
    import("@/components/alertInput")
        .then((alertInput) => {
            const inputs = config.inputs
            const inputConfig = [
                // 教工号
                {
                    // 组件的key
                    key: "tno",
                    // Form.Item的props
                    item: {
                        // 名
                        name: "tno",
                        // 标记
                        label: "教工号",
                        // 校验规则
                        rules: [
                            // 必填
                            {
                                required: true,
                                message: "请输入教工号"
                            },
                            // 10位纯数字
                            {
                                pattern: /^\d{10}$/,
                                message: "教工号必须为10位纯数字"
                            }
                        ]
                    },
                    // 表单组件的props
                    input: {
                        ...(inputs.tno ? inputs.tno : {}),
                        type: "text",
                        placeholder: "请输入教工号"
                    }
                },
                // 教师姓名
                {
                    // 组件的key
                    key: "tname",
                    // Form.Item的props
                    item: {
                        // 名
                        name: "tname",
                        // 标记
                        label: "姓 名",
                        // 校验规则
                        rules: [
                            // 必填
                            {
                                required: true,
                                message: "请输入教师姓名"
                            },
                            // 中英文的名字格式
                            // 中文为1-20个汉字，不能为除汉字之外的字符
                            // 英文为1-20个字母，姓名中间可以有空格
                            {
                                pattern: /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z.\s]{1,20})$/,
                                message: "姓名格式错误"
                            }
                        ]
                    },
                    // Input的props
                    input: {
                        ...(inputs.tname ? inputs.tname : {}),
                        type: "text",
                        placeholder: "请输入教师姓名"
                    }
                },
                // 性别
                {
                    // 组件的key
                    key: "gender",
                    // Form.Item的props
                    item: {
                        name: "gender",
                        label: "性 别",
                        // 校验规则
                        rules: [
                            // 必填
                            {
                                required: true,
                                message: "请选择性别"
                            },
                            // 验证器
                            // 值只能为0或1
                            {
                                validator(_, value) {
                                    if (value !== "0" && value !== "1") return Promise.reject()
                                    return Promise.resolve()
                                },
                                message: "请选择有效的性别选项"
                            }
                        ]
                    },
                    // Select组件的props
                    input: {
                        type: "select",
                        name: "gender",
                        placeholder: "请选择性别",
                        ...(inputs.gender ? inputs.gender : {}),
                        options: [{
                            value: "0",
                            title: "女"
                        }, {
                            value: "1",
                            title: "男"
                        }]
                    }
                },
                // 生日
                {
                    // 组件的key
                    key: "birthday",
                    // Form.Item的props
                    item: {
                        // 名
                        name: "birthday",
                        // 标记
                        label: "生 日",
                        // 校验规则
                        rules: [
                            // 所选择的日期需满足以下条件：
                            // 值必须为Moment实例对象（Moment实例对象为DatePicker组件的value）
                            // 时间戳小于当前时间
                            // 时间戳在150年之内
                            {
                                async validator(_, value) {
                                    if (value === "" || value === undefined) return Promise.resolve()
                                    // 如果时间为未定义抛出错误
                                    if (!value.format) return Promise.reject()
                                    // 要验证的时间对象
                                    const targetDate = new Date(
                                        // 调用Moment实例的format方法将时间转为yy-MM-DD格式的字符串
                                        value.format("yy-MM-DD")
                                    )
                                    // 当前时间
                                    const nowDate = new Date()
                                    // 出生日期不可能大于当前时间，如果大于抛出错误
                                    if (targetDate.getTime() > nowDate.getTime()) return Promise.reject()
                                    // 判断出生日期是否在150年之内
                                    // 通过获取当前时间的年份-150来创建新的时间对象进行比较
                                    if (targetDate.getTime() < new Date(`${nowDate.getFullYear() - 150}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`).getTime()) return Promise.reject()
                                    return Promise.resolve()
                                },
                                // 错误提示信息
                                message: (() => {
                                    // 获取当前时间
                                    const date = new Date()
                                    // 存储当前时间的年月日
                                    const year = date.getFullYear(),
                                        month = date.getMonth() + 1,
                                        day = date.getDate()
                                    // 提示信息
                                    return `请选择${year - 150}-${month}-${day}至${year}-${month}-${day}之间的日期`
                                })(),
                            }]
                    },
                    // DatePicker的props
                    input: {
                        type: "date",
                        name: "birthday",
                        ...(inputs.birthday ? inputs.birthday : {}),
                        picker: {
                            key: "date",
                            placeholder: "请选择出生日期",
                            picker: "date"
                        }
                    }
                },
                // 手机号
                {
                    // 组件的key
                    key: "phone",
                    // Form.Item的props
                    item: {
                        // 名
                        name: "phone",
                        // 标记
                        label: "手机号",
                        // 校验规则
                        rules: [{
                            pattern: /^1[3456789]\d{9}$/,
                            message: "手机号格式错误"
                        }]
                    },
                    input: {
                        ...(inputs.phone ? inputs.phone : {}),
                        name: "phone",
                        placeholder: "请输入11位手机号",
                    }
                },
                // 邮箱
                {
                    // 组件的key
                    key: "email",
                    // Form.Item的props
                    item: {
                        // 名
                        name: "email",
                        // 标记
                        label: "邮 箱",
                        // 校验规则如下：
                        // 邮箱号部分：英文、数字、下划线、中划线
                        // 邮箱格式部分：@(字母、数字或-).(字母、数字){2-6}
                        rules: [{
                            pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                            message: "邮箱格式错误"
                        }]
                    },
                    input: {
                        ...(inputs.email ? inputs.email : {}),
                        type: "input",
                        placeholder: "请输入邮箱"
                    }
                }]
            alertInput.default({
                title: config.title,
                name: config.name,
                finish: config.finish,
                inputConfig
            })
        })
}

export default TeacherManagement;
