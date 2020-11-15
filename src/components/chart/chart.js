import React from "react";
import PropTypes from "prop-types"

import {Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis} from "recharts";
import {getChartColorsByName} from "../../common/utils";

import {withResizeDetector} from "react-resize-detector";


const BenchmarkChart = ({
                            data, style,
                            width, height,        // provided by #withResizeDetector
                            chartColors
                        }) => {
    const {stroke, gradient, name} = chartColors

    return (
        <div style={style}>
            <AreaChart height={height} width={width} data={data}>
                <defs>
                    <linearGradient id={name} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={gradient} stopOpacity={0.95}/>
                        <stop offset="95%" stopColor={gradient} stopOpacity={0.1}/>
                    </linearGradient>
                </defs>
                <Area type='monotone' dataKey='value' stroke={stroke} strokeWidth={2} fill={`url(#${name})`}/>
                <XAxis dataKey="name" minTickGap={20}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="1 1" stroke='#444'/>
            </AreaChart>
        </div>
    )
}

BenchmarkChart.propTypes = {
    data: PropTypes.object.isRequired,
    style: PropTypes.object,
    chartColors: PropTypes.object
}

BenchmarkChart.defaultProps = {
    style: {},
    chartColors: getChartColorsByName
}


export default withResizeDetector(BenchmarkChart);