import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

const App = () => {
    const navigate = useNavigate();
    const token = Cookies.get('token');

    useEffect(() => {
        if (token) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [token]);

    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Dashboard />} />
        </Routes>
    );
};

export default App;
