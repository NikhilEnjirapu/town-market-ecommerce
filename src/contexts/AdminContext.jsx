import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is admin based on email
    const checkAdminStatus = () => {
      if (user && user.email) {
        // Grant admin access to enjirapunikhil@gmail.com
        if (user.email === 'enjirapunikhil@gmail.com') {
          setIsAdmin(true);
          localStorage.setItem('isAdmin', 'true');
        } else {
          setIsAdmin(false);
          localStorage.removeItem('isAdmin');
        }
      } else {
        // Check for legacy admin status (fallback)
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);
      }
      setIsLoading(false);
    };

    checkAdminStatus();
  }, [user]); // Re-check when user changes

  const loginAsAdmin = (password) => {
    // For demo purposes, still allow password login
    // But main admin access is now email-based
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const value = {
    isAdmin,
    isLoading,
    loginAsAdmin,
    logout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
