import './MenuItem.css';

const MenuItem = ({ item, activeMenuItem, setActiveMenuItem, index }) => {
    const { label, icon } = item;
    const isActive = index === activeMenuItem;

    return (
        <div className='menu-item' onClick={() => setActiveMenuItem(index)}>
            <div className="icon-label">
                <img className={'svg-icon ' + (isActive ? 'active-icon' : '')} src={`${process.env.PUBLIC_URL}/${icon}`} alt="" />
                <span style={index === activeMenuItem ? { fontWeight: 'bold', color: '#6154F0' } : {}} >{label}</span>
            </div>
            {
                index === activeMenuItem && <div className='active-indicator' />
            }

        </div>
    )
}

export default MenuItem