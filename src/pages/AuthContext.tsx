import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: number; // 0 = not logged in, 1 = logged in
  setIsLoggedIn: (value: number) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: 0,
  setIsLoggedIn: () => {},
  userEmail: '',
  setUserEmail: () => {},
  isLoading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in by checking localStorage
    const checkAuthStatus = () => {
      try {
        const storedToken = localStorage.getItem('access_token');
        const storedEmail = localStorage.getItem('user_email');
        
        if (storedToken && storedEmail) {
          setIsLoggedIn(1);
          setUserEmail(storedEmail);
        } else {
          setIsLoggedIn(0);
          setUserEmail('');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        setIsLoggedIn(0);
        setUserEmail('');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const contextValue: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    userEmail,
    setUserEmail,
    isLoading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};