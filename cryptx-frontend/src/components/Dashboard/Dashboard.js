import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import BitcoinGraph from '../BitcoinGraph/BitcoinGraph';
import CoinCard from '../CoinCard/CoinCard';
import Header from '../Header/Header';
import LiveMarket from '../LiveMarket/LiveMarket';
import Transactions from '../Transactions/Transactions';
import './Dashboard.css';

const Dashboard = () => {
    const { data, loading, error } = useFetch(process.env.REACT_APP_API_URL + '/crypto/fetch-coin-data');
    const [coinData, setCoinData] = useState([]);

    useEffect(() => {
        if (data) setCoinData(data?.coinData)
    }, [data]);

    // Force the order to follow the UI as the API response is different
    const sortOrder = ['bitcoin', 'ethereum', 'litecoin', 'cardano'];

    // Sort the array based on the predefined order
    const sortedCoins = coinData?.sort((a, b) => {
        return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id);
    });

    return (
        <div className="dashboard-container full-height">
            <Header />
            <div className="separator"></div>
            <div className="card-section">
                <>
                    {
                        loading ? <p>Loading...</p>
                            :
                            error ? <p>{error}.</p>
                                :
                                <div className="coins">
                                    {
                                        sortedCoins.map((coin) => <CoinCard key={coin.id} {...coin} />)
                                    }
                                </div>
                    }
                </>

                <BitcoinGraph />
            </div>
            <div className="live-market-transactions">
                <div>
                    <h3>Live Market</h3>
                    <LiveMarket sortedCoins={sortedCoins} />
                </div>
                <div>
                    <h3>Transactions</h3>
                    <Transactions />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;