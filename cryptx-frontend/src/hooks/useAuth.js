import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const serverURL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    // Register function
    const register = async (name, username, password, setContextUser) => {
        setLoading(true);
        try {
            const response = await fetch(serverURL + '/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.err || 'Registration failed');
            }

            setContextUser(result.user);
            localStorage.setItem('token', result.token || '');
            localStorage.setItem('user', JSON.stringify(result.user || ''));
            setTimeout(() => {
                navigate('/overview');
            }, 1500);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Login function
    const login = async (username, password, setContextUser) => {
        setLoading(true);
        try {
            const response = await fetch(serverURL + '/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Login failed');
            }

            setContextUser(result.user);
            localStorage.setItem('token', result.token || '');
            localStorage.setItem('user', JSON.stringify(result.user || ''));
            setTimeout(() => {
                navigate('/overview');
            }, 1500);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = (setContextUser) => {
        setContextUser(null);
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/login');
        }, 500);
    };

    return {
        error,
        loading,
        register,
        login,
        logout,
    };
};

export default useAuth;
