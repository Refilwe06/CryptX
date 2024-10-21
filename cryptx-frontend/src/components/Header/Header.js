import React, { useContext } from 'react'
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { UserContext } from '../../context/UserContext';
import Drawer from '../Drawer/Drawer';

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <div className='header'>
            <div className='menu-search'>
                <Drawer />
                <SearchBar />
            </div>
            <div className="user-actions">
                <div className="icons">
                    <img src={`${process.env.PUBLIC_URL}/bell.svg`} alt="Bell Icon" />
                    <img src={`${process.env.PUBLIC_URL}/help.svg`} alt="Help Icon" />

                </div>
                <div className="profile-section">
                    <div className="avatar"><b>{user?.name[0]}</b></div>
                    <div className="user-details">
                        <div className="user-name">
                            <b className='ellipsis'>{user?.name}</b>
                            <span className='ellipsis'>@{user?.username}</span>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/arrowdown.svg`} alt="Help Icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;