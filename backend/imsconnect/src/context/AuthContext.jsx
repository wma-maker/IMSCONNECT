import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (credentials) => {
    // Mock login function
    if (credentials.username === 'admin' && credentials.password === 'admin') {
      setUser({ role: 'manager' });
    } else if (credentials.username === 'employee' && credentials.password === 'employee') {
      setUser({ role: 'employee' });
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
