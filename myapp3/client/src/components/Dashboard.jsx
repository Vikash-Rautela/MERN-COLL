import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    return (
        <div className="container mt-5">
            <h1>Dashboard</h1>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;
