import BitcoinGraph from '../BitcoinGraph/BitcoinGraph';
import CoinCard from '../CoinCard/CoinCard';
import Header from '../Header/Header';
import LiveMarket from '../LiveMarket/LiveMarket';
import Transactions from '../Transactions/Transactions';
import './Dashboard.css';

const Dashboard = () => {
    const coinData = [
        {
            "id": "bitcoin",
            "symbol": "btc",
            "name": "Bitcoin",
            "image": "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
            "current_price": 1210292,
            "market_cap": 23922312693851,
            "market_cap_rank": 1,
            "fully_diluted_valuation": 25411402743625,
            "total_volume": 714708347230,
            "high_24h": 1211077,
            "low_24h": 1180977,
            "price_change_24h": 17836.95,
            "price_change_percentage_24h": 1.49582,
            "market_cap_change_24h": 364282324966,
            "market_cap_change_percentage_24h": 1.54632,
            "circulating_supply": 19769415,
            "total_supply": 21000000,
            "max_supply": 21000000,
            "ath": 1375794,
            "ath_change_percentage": -12.05409,
            "ath_date": "2024-03-13T08:35:34.668Z",
            "atl": 666.26,
            "atl_change_percentage": 181502.77966,
            "atl_date": "2013-07-05T00:00:00.000Z",
            "roi": null,
            "last_updated": "2024-10-18T17:08:04.982Z"
        },
        {
            "id": "ethereum",
            "symbol": "eth",
            "name": "Ethereum",
            "image": "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
            "current_price": 46617,
            "market_cap": 5612130550388,
            "market_cap_rank": 2,
            "fully_diluted_valuation": 5612130550388,
            "total_volume": 272676441393,
            "high_24h": 46791,
            "low_24h": 45674,
            "price_change_24h": 346.49,
            "price_change_percentage_24h": 0.74884,
            "market_cap_change_24h": 44148102351,
            "market_cap_change_percentage_24h": 0.79289,
            "circulating_supply": 120387999.524875,
            "total_supply": 120387999.524875,
            "max_supply": null,
            "ath": 76298,
            "ath_change_percentage": -38.90386,
            "ath_date": "2024-03-12T00:20:10.099Z",
            "atl": 5.74,
            "atl_change_percentage": 811668.35493,
            "atl_date": "2015-10-20T00:00:00.000Z",
            "roi": {
                "times": 50.50631818076496,
                "currency": "btc",
                "percentage": 5050.631818076496
            },
            "last_updated": "2024-10-18T17:08:06.788Z"
        },
        {
            "id": "cardano",
            "symbol": "ada",
            "name": "Cardano",
            "image": "https://coin-images.coingecko.com/coins/images/975/large/cardano.png?1696502090",
            "current_price": 6.19,
            "market_cap": 221169341573,
            "market_cap_rank": 12,
            "fully_diluted_valuation": 278595518924,
            "total_volume": 4913140218,
            "high_24h": 6.19,
            "low_24h": 6.01,
            "price_change_24h": 0.057595,
            "price_change_percentage_24h": 0.93904,
            "market_cap_change_24h": 2352700292,
            "market_cap_change_percentage_24h": 1.07519,
            "circulating_supply": 35724265807.3247,
            "total_supply": 45000000000,
            "max_supply": 45000000000,
            "ath": 44.69,
            "ath_change_percentage": -86.15432,
            "ath_date": "2021-08-23T23:10:31.261Z",
            "atl": 0.29812,
            "atl_change_percentage": 1975.42372,
            "atl_date": "2017-11-02T00:00:00.000Z",
            "roi": null,
            "last_updated": "2024-10-18T17:08:14.264Z"
        },
        {
            "id": "litecoin",
            "symbol": "ltc",
            "name": "Litecoin",
            "image": "https://coin-images.coingecko.com/coins/images/2/large/litecoin.png?1696501400",
            "current_price": 1283.84,
            "market_cap": 96440359525,
            "market_cap_rank": 26,
            "fully_diluted_valuation": 107873629318,
            "total_volume": 8530542944,
            "high_24h": 1320.32,
            "low_24h": 1263.13,
            "price_change_24h": 4.98,
            "price_change_percentage_24h": 0.38943,
            "market_cap_change_24h": 357557296,
            "market_cap_change_percentage_24h": 0.37213,
            "circulating_supply": 75097039.4834713,
            "total_supply": 84000000,
            "max_supply": 84000000,
            "ath": 5769.81,
            "ath_change_percentage": -77.73441,
            "ath_date": "2021-05-10T03:13:07.904Z",
            "atl": 13.25,
            "atl_change_percentage": 9592.49107,
            "atl_date": "2015-01-14T00:00:00.000Z",
            "roi": null,
            "last_updated": "2024-10-18T17:08:18.743Z"
        }
    ]
    // Force the order to follow the UI as the API response is different
    const sortOrder = ['bitcoin', 'ethereum', 'litecoin', 'cardano'];

    // Sort the array based on the predefined order
    const sortedCoins = coinData.sort((a, b) => {
        return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id);
    });

    return (
        <div className="dashboard-container full-height">
            <Header />
            <div className="separator"></div>
            <div className="card-section">
                <div className="coins">
                    {
                        sortedCoins.map((coin) => <CoinCard key={coin.id} {...coin} />)
                    }
                </div>
                <BitcoinGraph />
            </div>
            <div className="live-market-transactions">
                <div>
                    <h3>Live Market</h3>
                    <LiveMarket data={sortedCoins} />
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