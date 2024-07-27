import React from 'react';
import { Dimension } from '../../config';
import { PieChart, Tooltip, Pie, Legend, Cell } from 'recharts';


const PieChartsColorized = ({data}) => {
    const {width, height} = Dimension();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text style={{zIndex : 999}} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

    return (
        <>
            <PieChart width={width < 360 ? 320 : 360 } height={280}>
                <Pie isAnimationActive={true} data={data} cx={360/2} cy={125} outerRadius={100} label={renderCustomizedLabel} labelLine={false}> 
                {
                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
                </Pie>
                <Tooltip/>
                <Legend align="center" margin={{ top: 12, left: 0, right: 0, bottom: 0 }}/>
            </PieChart>
        </>
    )
}

export default PieChartsColorized;