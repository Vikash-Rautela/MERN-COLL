import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthProvider';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import NavBar from './components/NavBar';
import About from './components/About';
import Contact from './components/Contact';
import Signup from './components/Signup';
import Admin from './components/Admin';

const App = () => {
    const { token } = useContext(AuthContext);

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/login" element={!token ? <LoginForm /> : <Navigate to={"/"} />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={token ? <Admin /> : <Navigate to={"/login"} />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signup" element={!token ? <Signup /> : <Navigate to={"/"} />} />
            </Routes>
        </>
    );
};

export default App;
