import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { createContext, useState } from 'react';

const userContext = createContext();

function authContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/verify', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if (response.data.success) {
            setUser(response.data.user);
          }
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setUser(null);
        }
        console.error('Error verifying user:', error);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);
  const login = (user) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {children}

    </userContext.Provider>
  );
}
const useAuth = () => React.useContext(userContext);

export { useAuth };
export default authContext;
