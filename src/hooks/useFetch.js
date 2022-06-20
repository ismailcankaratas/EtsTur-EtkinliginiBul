import React, { useEffect, useState } from 'react'
import axios from 'axios';

const useFetch = (url, arrayName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(url);
                setData(res.data[arrayName]);
            } catch (error) {
                setError(error)
            }
            setLoading(false)
        }

        fetchData();
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(url);
            setData(res.data[arrayName]);
        } catch (error) {
            setError(error)
        }
    }
    return { data, loading, error, reFetch }

}

export default useFetch;