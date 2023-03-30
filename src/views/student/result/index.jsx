/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-14 17:18:48
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2023-03-28 20:30:23
 * @FilePath: \student-performance\src\pages\home\result\query\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message, Space, Table, Tag } from 'antd'
import React, { useState, useEffect } from 'react'
import PropType from "prop-types";
import studentApi from '../../../apis/student';

import "./index.scss";

function ResultQuery(props) {
  const [source, setSource] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    props.queryHandle()
      .then(result => {
        const { data } = result;
        if (!data.success) return message.error(data.message);
        setSource(props.toNode(data.result));
      })
      .catch(() => message.error("查询成绩时出错"))
      .finally(() => setIsLoading(false))
  }, [props.queryHandle]);
  return <Table
    loading={isLoading}
    dataSource={source}
    columns={ResultQuery.columns}
  ></Table>
}

ResultQuery.columns = [{
  key: "number",
  dataIndex: "number",
  title: "序号"
}, {
  key: "cname",
  dataIndex: "cname",
  title: "课程名"
}, {
  key: "tname",
  dataIndex: "tname",
  title: "教师"
}, {
  key: "grade",
  dataIndex: "grade",
  title: "分数"
}]

ResultQuery.propTypes = {
  queryHandle: PropType.func.isRequired,
  toNode: PropType.func.isRequired
}


export default () => {
  const toNode = (result) => {
    result = result.map(({ id, cname, tname, grade }, index) => ({
      key: id,
      number: index + 1,
      cname: <span>{cname}</span>,
      tname: <Tag color='primary'>{tname}</Tag>,
      grade: <Tag color="blue">{grade}</Tag>
    }))
    return result;
  }

  return (
    <Space size="small" direction='vertical' className="wrapper">
      <h3 className="title">成绩查询</h3>
      <ResultQuery
        queryHandle={studentApi.resultHandle}
        toNode={toNode}
      />
    </Space>
  )
}
