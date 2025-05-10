import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in on mount
        const token = localStorage.getItem('token');
        if (token) {
            fetchUser(token);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setError(null);
            const response = await axios.post('http://localhost:5000/signin', {
                email,
                password
            });
            const { access_token, user } = response.data;
            localStorage.setItem('token', access_token);
            setUser(user);
            return true;
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred during login');
            return false;
        }
    };

    const signup = async (email, password) => {
        try {
            setError(null);
            await axios.post('http://localhost:5000/signup', {
                email,
                password
            });
            return true;
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred during signup');
            return false;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            await axios.post('http://localhost:5000/logout', null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        } finally {
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 