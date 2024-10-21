import React, { useContext } from 'react'
import './Header.css';
import SearchBar from '../SearchBar/SearchBar';
import { UserContext } from '../../context/UserContext';

const Header = () => {
    const { user } = useContext(UserContext);

    return (
        <div className='header'>
            <SearchBar />
            <div className="user-actions">
                <div className="icons">
                    <img src={`${process.env.PUBLIC_URL}/bell.svg`} alt="Bell Icon" />
                    <img src={`${process.env.PUBLIC_URL}/help.svg`} alt="Help Icon" />

                </div>
                <div className="profile-section">
                    <div className="avatar"><b>{user?.name[0]}</b></div>
                    <div className="user-details">
                        <div className="user-name">
                            <b>{user?.name}</b>
                            <span>@{user?.username}</span>
                        </div>
                        <img src={`${process.env.PUBLIC_URL}/arrowdown.svg`} alt="Help Icon" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;