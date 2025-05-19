import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CollectionPage from './pages/CollectionPage';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';

// Create a context to manage auth state throughout the app
export const AuthContext = React.createContext({
  isLoggedIn: 0,
  setIsLoggedIn: (value: number) => {},
  userEmail: '',
  setUserEmail: (email: string) => {}
});

function App() {
  // Initialize state from localStorage or default to logged out (0)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    return savedLoginState ? parseInt(savedLoginState) : 0;
  });
  
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || '';
  });
  
  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);
  
  useEffect(() => {
    localStorage.setItem('userEmail', userEmail);
  }, [userEmail]);

  // Protected route component that redirects to login if user is not logged in
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoggedIn === 0) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userEmail, setUserEmail }}>
      <Routes>
        {/* Redirect root to login if not logged in */}
        <Route path="/" element={
          isLoggedIn === 0 ? <Navigate to="/login" /> : <Layout />
        }>
          <Route index element={<Home />} />
          <Route path="collection/:category" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        
        {/* Login route (outside the Layout) */}
        <Route path="/login" element={
          isLoggedIn === 1 ? <Navigate to="/" /> : <LoginPage />
        } />
        
        {/* Account route (protected) */}
        <Route path="/account" element={
          <ProtectedRoute>
            <Layout>
              <LoginPage />
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;