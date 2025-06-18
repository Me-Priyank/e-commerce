import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CollectionPage from "./pages/CollectionPage";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import BookAppointment from "./pages/BookAppointments";
import AllProducts from "./pages/AllProducts";
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import { AuthProvider, AuthContext } from "./pages/AuthContext";
import Account from "./pages/Account";
import Ship from "./pages/ShippingPolicy";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isLoggedIn, isLoading } = React.useContext(AuthContext);

  // Protected route component - only for account page
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isLoading) {
      return <div>Loading...</div>; // Show loader during auth check
    }
    if (isLoggedIn === 0) {
      return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
  };

  // Handle loading state globally
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <CartProvider>
      <Routes>
        {/* Main layout routes - accessible to everyone */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="/collection/all" element={<AllProducts />} />
          <Route path="collection/:category" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="about" element={<About />} />
          <Route path="shipping" element={<Ship />} />
          <Route path="contact" element={<Contact />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="*" element={<NotFound />} />
          
          {/* Protected account route */}
          <Route 
            path="account" 
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Login page - redirect to home if already logged in */}
        <Route
          path="/login"
          element={isLoggedIn === 1 ? <Navigate to="/account" /> : <LoginPage />}
        />
      </Routes>
      <CartDrawer />
    </CartProvider>
  );
}

export default App;