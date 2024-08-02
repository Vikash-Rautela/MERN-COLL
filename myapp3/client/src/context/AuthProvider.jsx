import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        const storedToken = Cookies.get('token');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const register = async (userData) => {
        try {
            const response = await fetch("http://localhost:4000/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const resData = await response.json();
                return resData;
            } else {
                console.error("Registration error:", response.statusText);
            }
        } catch (error) {
            console.error("Registration error:", error.message);
        }
    };

    const login = async ({ email, password }) => {
        try {
            const response = await fetch("http://localhost:4000/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const resData = await response.json();
                setUser(resData.user);
                setToken(resData.token);

                Cookies.set('user', JSON.stringify(resData.user), {
                    expires: 1,
                });

                Cookies.set('token', resData.token, {
                    expires: 1,
                });

                return resData;
            } else {
                console.error("Login error:", response.statusText);
            }
        } catch (error) {
            console.error("Login error:", error.message);
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            setToken(null);
            Cookies.remove('user');
            Cookies.remove('token');
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    const authInfo = {
        user,
        token,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
