import { useContext } from 'react';
import './MenuItem.css';
import { UserContext } from '../../context/UserContext';

const MenuItem = ({ item, activeMenuItem, setActiveMenuItem, index }) => {
    const { setUser } = useContext(UserContext);
    const { label, icon, logout } = item;
    const isActive = index === activeMenuItem;
    return (
        <div className='menu-item' onClick={() => logout ? logout(setUser) : setActiveMenuItem(index)}>
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