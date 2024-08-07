import React, { useState, useEffect } from 'react';
import SyncLoader from "react-spinners/SyncLoader";
import './animloader.css';
import App from '../App'; // Import the App component
import MainBack from './code_asthram_logo.gif';

function AnimLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2200);
    }, []);

    return (
        <div>
            {loading ? (
                <div className='loader'>
                    <img src={MainBack} style={{ height: "100vh", width: "100%" }} alt='Loading...' />
                </div>
            ) : (
                <App />
            )}
        </div>
    );
}

export default AnimLoader;
