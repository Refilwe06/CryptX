import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { setUser } = useContext(UserContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            localStorage.removeItem('user'); // Clear user data from localStorage if no token
            setUser(null); // Clear user context if token is absent
        }
    }, [token, setUser]); // Run effect when token changes

    if (!token) {
        return <Navigate to='/login' />; // Redirect to login if token is absent
    }

    return <Outlet />; // Render child components (protected routes) if token exists
};

export default ProtectedRoutes;
