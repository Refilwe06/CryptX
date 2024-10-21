import LineGraph from '../LineGraph/LineGraph';
import './LiveMarketItem.css';

const LiveMarketItem = ({ id, name, market_cap_change_24h, market_cap_change_percentage_24h, symbol, lineGraphData }) => {
    const isProfit = market_cap_change_percentage_24h > 0;
    const icons = {
        "bitcoin": {
            path: "bitcoinround.svg"
        },
        "litecoin": {
            path: "litecoinround.svg"
        },
        "cardano": {
            path: "cardanoround.svg"
        },
        "ethereum": {
            path: "ethereumround.svg"
        }
    }

    return (
        <div className="live-market-item">
            <div className="icon-coin">
                <img src={`${process.env.PUBLIC_URL}/${icons[id]['path']}`} alt={name + ' icon'} width={50} />
                <div className="coin-currency">
                    <span className='font-600'>{name}</span>
                    <small className='symbol light-text'><span style={{ textTransform: 'uppercase' }}> {symbol}</span> / USDT</small>
                </div>
            </div>
            <div className="change-rate">
                <span className='light-text'>Change</span>
                <span style={{ color: (isProfit ? '#1ECB4F' : '#FF8D4D'), fontWeight: 500, fontSize: '0.8rem', marginTop: 5 }}>{isProfit ? '+' : ''}{market_cap_change_percentage_24h.toFixed(2)}%</span>
            </div>
            <div className="price">
                <span className='light-text'>Price</span>
                <span className='font-600'>{market_cap_change_24h.toLocaleString()} USD</span>
            </div>
            <LineGraph lineGraphData={lineGraphData} />
        </div>
    )
}

export default LiveMarketItem;