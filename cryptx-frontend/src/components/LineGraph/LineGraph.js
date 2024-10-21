import React from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from "recharts";

// Line Graph component to display average price of coin over the last 6 months
const LineGraph = ({ lineGraphData }) => {
    const colors = {
        bitcoin: "#f9bd1f",
        ethereum: "#6154F0",
        litecoin: "#3654ed",
        cardano: "#1ecb50"
    }

    return (
        <ResponsiveContainer>
            <AreaChart data={lineGraphData?.data}>
                <defs>
                    <linearGradient id={lineGraphData?.id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors[lineGraphData?.id]} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={colors[lineGraphData?.id]} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area
                    type="monotone"
                    dataKey="price"
                    stroke={colors[lineGraphData?.id]}
                    strokeWidth={4}
                    fillOpacity={1}
                    fill={`url(#${lineGraphData?.id})`}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LineGraph;
