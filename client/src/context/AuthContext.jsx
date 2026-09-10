import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('nodeops_token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('nodeops_user');
    return stored ? JSON.parse(stored) : null;
  });

  function login({ accessToken, user: loggedInUser }) {
    localStorage.setItem('nodeops_token', accessToken);
    localStorage.setItem('nodeops_user', JSON.stringify(loggedInUser));
    setToken(accessToken);
    setUser(loggedInUser);
  }

  function logout() {
    localStorage.removeItem('nodeops_token');
    localStorage.removeItem('nodeops_user');
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), login, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
