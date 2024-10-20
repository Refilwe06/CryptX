import { useState } from 'react';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    return (
        <div className="transactions">
            {
                transactions.map((trans, index) => <TransactionsItem key={index} {...trans} />)
            }
        </div>
    )
}

export default Transactions;