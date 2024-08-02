import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function NavBar() {
    const { user, logout, token } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Navbar</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul
                        className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                        style={{ '--bs-scroll-height': '150px' }}
                    >
                        <li className="nav-item">
                            <Link className="nav-link active" to="/" aria-current="page">Home</Link>
                        </li>

                        {token && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/admin">Admin</Link>
                            </li>
                        )}

                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>

                        {!token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span className="navbar-text">Welcome, {user.name}</span>
                                </li> 
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
