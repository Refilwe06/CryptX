import LiveMarketItem from '../LiveMarketItem/LiveMarketItem';
import './LiveMarket.css';

const LiveMarket = ({ data }) => {
    // Force the order to follow the UI as the API response is different
    const sortOrder = ['ethereum', 'bitcoin', 'litecoin', 'cardano'];

    // Sort the array based on the predefined order
    data = data.sort((a, b) => {
        return sortOrder.indexOf(a.id) - sortOrder.indexOf(b.id);
    });
    return (
        <div className="live-market">
            {
                data.map((item) => <LiveMarketItem key={item.id} {...item} />)
            }
        </div>
    )
}

export default LiveMarket;