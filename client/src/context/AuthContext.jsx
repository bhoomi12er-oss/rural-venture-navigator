import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('rvn_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (phone, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, password }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Login failed');
    }

    setUser(data.user);
    localStorage.setItem('rvn_token', data.token);
    localStorage.setItem('rvn_user', JSON.stringify(data.user));
    return data.user;
  };

  const register = async (name, phone, password, role) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, phone, password, role }),
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || 'Registration failed');
    }

    setUser(data.user);
    localStorage.setItem('rvn_token', data.token);
    localStorage.setItem('rvn_user', JSON.stringify(data.user));
    return data.user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rvn_token');
    localStorage.removeItem('rvn_user');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
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
