import TransactionsItem from '../TransactionsItem/TransactionsItem';
import './Transactions.css';

const Transactions = () => {
    const transactions = [
        {
            coin: 'Ethereum',
            status: 'Received',
            price: '24102',
            date: 'Today, 19:30',
            isProfit: true
        },
        {
            coin: 'Bitcoin',
            status: 'Buy',
            price: '4157',
            date: 'Today, 14:32',
            isProfit: false
        },
        {
            coin: 'Bitcoin',
            status: 'Buy',
            price: '64784',
            date: 'Today, 13:50',
            isProfit: false
        },
        {
            coin: 'Litecoin',
            status: 'Buy',
            price: '14265',
            date: 'Today, 09:38',
            isProfit: false
        },
    ]
    return (
        <div className="transactions">
            {
                transactions.map((trans, index) => <TransactionsItem key={index} {...trans} />)
            }
        </div>
    )
}

export default Transactions;