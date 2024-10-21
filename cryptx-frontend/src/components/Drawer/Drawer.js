import React, { useState } from 'react';
import './Drawer.css';
import Sidenav from '../Sidenav/Sidenav';

const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <img src={process.env.PUBLIC_URL + '/menu.svg'} alt="Hamburger Icon" onClick={() => setIsOpen(!isOpen)} className='pointer hamburger-icon'/>
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                <div className="full-height">
                    <Sidenav handleClose={toggleDrawer} />
                </div>
            </div>

            {/* Overlay */}
            {isOpen && <div className="overlay" onClick={toggleDrawer}></div>}
        </>
    );
};

export default Drawer;
