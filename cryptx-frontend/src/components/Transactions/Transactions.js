import { useEffect, useState } from 'react';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import './Transactions.css';
import useFetch from '../../hooks/useFetch';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const { data, loading, error } = useFetch('http://localhost:5000/crypto/get-transactions');

    useEffect(() => {
        if (data) setTransactions(data?.transactions)

    }, [data])
    return (
        <>
            {
                loading ? <p>Loading...</p>
                    :
                    error ? <p>{error}.</p>
                        :
                        <div className="transactions">
                            {
                                transactions?.map((trans, index) => <TransactionsItem key={index} {...trans} />)
                            }
                        </div>
            }
        </>
    )
}

export default Transactions;