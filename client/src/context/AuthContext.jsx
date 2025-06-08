import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context that components will use
const AuthContext = createContext(null);

// Create the provider component that will wrap our app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // On initial load, check sessionStorage to see if a user was already logged in.
  // This keeps you logged in if you refresh the page.
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('ourJourneyUser');
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Could not access session storage:", error);
    }
  }, []);

  // The login function updates the state and saves the user to sessionStorage
  const login = (userData) => {
    sessionStorage.setItem('ourJourneyUser', userData);
    setUser(userData);
    navigate('/home'); // Redirect to the homepage after login
  };

  // The logout function clears the state and sessionStorage
  const logout = () => {
    sessionStorage.removeItem('ourJourneyUser');
    setUser(null);
    navigate('/login'); // Redirect to the login page after logout
  };

  // The value object provides the user state and functions to the rest of the app
  const value = { user, login, logout, isAuthenticated: Boolean(user) };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// This is a custom hook that makes it easier to use the auth context in other components
export const useAuth = () => {
  return useContext(AuthContext);
};