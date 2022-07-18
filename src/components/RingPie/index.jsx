/*
 * @Author: Striver-TL 2806717229@qq.com
 * @Date: 2022-07-15 14:43:43
 * @LastEditors: Striver-TL 2806717229@qq.com
 * @LastEditTime: 2022-07-15 17:28:26
 * @FilePath: \student-performance\src\components\RingPie\index.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import * as eacharts from 'echarts';

class RingPie extends React.Component {
    static propTypes = {
        color: PropTypes.array,
        source: PropTypes.array.isRequired,
        title: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.state = {
            element: createRef()
        }
        this.option = this.getOption()
        this.setOption()
        this.eachart = null
    }

    render() {
        return (
            <div className="ringpie" ref={this.state.element}></div>
        )
    }

    componentDidMount() {
        this.eachart = eacharts.init(this.state.element.current)
        this.eachart.setOption(this.option)
    }

    componentDidUpdate() {
        this.eachart.setOption(this.setOption())
    }

    setOption() {
        const { source, title, color } = this.props
        const { option } = this
        option.dataset.source = source
        option.title.text = title
        option.series.color = color
        return this.option
    }

    getOption() {

        return {
            title: {
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: "14",
                    fontWeight: "normal",
                    color: "#333"
                }
            },
            tooltip: {

            },
            dataset: {
            },
            grid: {
                top: "5%",
                left: "5%",
                bottom: "5%",
                right: "5%"
            },
            series: {
                type: "pie",
                radius: ["40%", "70%"],
                label: {
                    show: false,
                },
                labelLine: {
                    show: false
                },
                emphasis: {
                    focus: "self"
                },
                // id: "数值",
                animation: true,
                animationDUration: 300,
                animationDurationUpdate: 300,
                animationDelay: 0
            }
        }
    }
}

export default RingPie;
