import './CoinCard.css'
const CoinCard = ({ id, name, symbol, price_change_24h, price_change_percentage_24h } ) => {
    const icons = {
        "bitcoin": {
            path: "bitcoinsquare.svg"
        },
        "litecoin": {
            path: "litecoinsquare.svg"
        },
        "cardano": {
            path: "cardanosquare.svg"
        },
        "ethereum": {
            path: "ethereumsquare.svg"
        }
    }

    const isProfit = price_change_percentage_24h > 0;
    return (
        <div className="coin">
            <div className="icon-rate">
                <img src={`${process.env.PUBLIC_URL}/${icons[id]['path']}`} alt={name + ' icon'} width={40} />
                <div className="rate">
                    <img src={`${process.env.PUBLIC_URL}/` + (isProfit ? 'profit.svg' : 'loss.svg')} alt="Coin icon" width={15} />
                    <span style={{ color: (isProfit ? '#1ECB4F' : '#FF8D4D'), fontWeight: 500 }}>{isProfit ? '+' : ''}{price_change_percentage_24h.toFixed(2)}%</span>
                </div>
            </div>
            <div className="price-coin-symbol">
                <span className='price-change'>${price_change_24h.toLocaleString()}</span>
                <span className='symbol'><span>{name}</span> - <span style={{ textTransform: 'uppercase' }}>{symbol}</span></span>
            </div>
        </div>
    )
}

export default CoinCard;