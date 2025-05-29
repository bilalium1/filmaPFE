// src/frontend/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Set base URL for all axios requests
axios.defaults.baseURL = '' // Adjust if using a proxy

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data when token exists
  const fetchUser = async (token) => {
    try {
      const { data } = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      // Set default header only AFTER successful validation
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err) {
      console.error('Token validation failed:', err);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUser(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem('authToken', token);
    await fetchUser(token); // Fetch and set user data immediately
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};