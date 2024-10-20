/* eslint-disable react-hooks/exhaustive-deps */
import './BitcoinGraph.css';
import React, { useEffect, useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                backgroundColor: '#6154F0',
                padding: '5px 5px',
                height: 40,
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                borderRadius: '12px',
                color: '#fff',
            }}>
                <p style={{ fontWeight: 'bold' }}>${payload[0].value.toLocaleString()}</p>
            </div>
        );
    }
    return null;
};


const BitcoinGraph = ({ coinId = 'bitcoin' }) => {
    const [data, setData] = useState([]);

    // Function to fetch Bitcoin prices from my server
    const fetchBitcoinPrices = async () => {
        try {
            const response = await fetch('http://localhost:5000/crypto/fetch-coin-prices?coinId=' + coinId);
            const result = await response.json();
            return result.data;
        } catch (error) {
            console.error('Error fetching Bitcoin prices:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const prices = await fetchBitcoinPrices();
            setData(prices);
        };

        fetchData();
    }, []);

    return (
        <div className="graph-container">
            <h3 style={{ marginTop: 0 }}>BTC Graph</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 14 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 14 }} tickFormatter={(value) => `$${value.toLocaleString()}`} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#6154F0"
                        strokeWidth={4}
                        dot={{ r: 6, strokeWidth: 2, stroke: '#6154F0', fill: '#fff' }}
                        activeDot={{ r: 8, strokeWidth: 2, stroke: '#6154F0', fill: '#6154F0' }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BitcoinGraph;
