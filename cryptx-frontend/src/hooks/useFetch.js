import { useState, useEffect } from 'react';

const useFetch = (url) => {
    console.log(process.env.REACT_APP_API_URL)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData?.err || `Error: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err)
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
