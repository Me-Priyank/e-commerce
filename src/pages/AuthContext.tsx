import { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: number;
  setIsLoggedIn: (value: number) => void;
  userEmail: string;
  setUserEmail: (value: string) => void;
  userData: any | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: 0,
  setIsLoggedIn: () => {},
  userEmail: '',
  setUserEmail: () => {},
  userData: null,
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<number>(0);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userData, setUserData] = useState<any | null>(null);

  // Load auth state from localStorage on initial render
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const storedUserData = localStorage.getItem('user_data');
    const storedEmail = localStorage.getItem('user_email');
    
    if (storedToken) {
      setIsLoggedIn(1);
      
      if (storedUserData) {
        try {
          setUserData(JSON.parse(storedUserData));
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      if (storedEmail) {
        setUserEmail(storedEmail);
      }
    }
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (isLoggedIn === 1) {
      localStorage.setItem('user_email', userEmail);
    }
  }, [isLoggedIn, userEmail]);

  const logout = () => {
    // Clear auth state
    setIsLoggedIn(0);
    setUserEmail('');
    setUserData(null);
    
    // Clear localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('user_email');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userEmail,
        setUserEmail,
        userData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};