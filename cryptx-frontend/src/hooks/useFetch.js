import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetch = (url, setContextUser) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.err || `Error: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err)
                if (err.message.includes('expired')) {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    navigate('/login?expired=true');
                }
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, token, navigate]);

    return { data, loading, error };
};

export default useFetch;
