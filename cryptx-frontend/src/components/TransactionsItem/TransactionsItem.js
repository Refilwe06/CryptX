import './TransactionsItem.css';

const TransactionsItem = ({ coin, status, price, date, isProfit }) => {
    return (
        <div className='transaction'>
            <div className="icon-status">
                <img src={`${process.env.PUBLIC_URL}/` + (isProfit ? 'roundarrowup.svg' : 'roundarrowdown.svg')} alt={'Round icon'} />
                <div className="name-status">
                    <span className='font-600'>{coin}</span>
                    <span className='light-text'>{status}</span>
                </div>
            </div>
            <div className="price-date">
                <span className='font-600'>${price.toLocaleString()}</span>
                <span className='light-text'>{date}</span>
            </div>
        </div>
    )
}

export default TransactionsItem;