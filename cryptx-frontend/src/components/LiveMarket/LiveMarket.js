import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import LiveMarketItem from '../LiveMarketItem/LiveMarketItem';
import './LiveMarket.css';

const LiveMarket = ({ sortedCoins }) => {
    const { data } = useFetch('http://localhost:5000/crypto/fetch-multiple-coin-prices');
    const [lineGraphData, setLineGraphData] = useState([]);

    useEffect(() => {
        if (data) setLineGraphData(data)

    }, [data])
    // Force the order to follow the UI as the API response is different
    const sortOrder = ['ethereum', 'bitcoin', 'litecoin', 'cardano'];

    // Sort the array based on the predefined order
    sortedCoins = sortedCoins.sort((a, b) => {
        return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id);
    });
    return (
        <div className="live-market">
            {
                sortedCoins.map((item) => <LiveMarketItem key={item.id} {...item} lineGraphData={lineGraphData?.find(g => g.id === item.id)} />)
            }
        </div>
    )
}

export default LiveMarket;