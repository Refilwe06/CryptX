import "./Menu.css";
import MenuItem from "../MenuItem/MenuItem";
import { useState } from 'react';
import useAuth from "../../hooks/useAuth";

const Menu = () => {
    const [activeMenuItem, setActiveMenuItem] = useState(0);
    const menuItems = [
        {
            icon: 'overview.svg',
            route: '',
            label: 'Overview'
        },
        {
            icon: 'chart.svg',
            route: '',
            label: 'Chart'
        },
        {
            icon: 'transactions.svg',
            route: '',
            label: 'Transactions'
        },
        {
            icon: 'wallet.svg',
            route: '',
            label: 'Wallet'
        },
        {
            icon: 'mailbox.svg',
            route: '',
            label: 'Mail Box'
        },
        {
            icon: 'setting.svg',
            route: '',
            label: 'Setting'
        },
        {
            icon: 'logout.svg',
            route: '',
            label: 'Logout',
            logout: useAuth().logout
        },
    ]
    return (
        <div className='menu'>
            {
                menuItems.map((item, index) => <MenuItem key={index} item={item} index={index} activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />)
            }
        </div>
    )
}

export default Menu