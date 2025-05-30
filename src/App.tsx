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
import { AuthProvider, AuthContext } from "./pages/AuthContext";

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

function AppRoutes() {
  const { isLoggedIn, isLoading } = React.useContext(AuthContext);

  // Protected route component
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
    <Routes>
      <Route
        path="/"
        element={isLoggedIn === 0 ? <Navigate to="/login" /> : <Layout />}
      >
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="all" element={<AllProducts />} />
        <Route path="collection/:category" element={<CollectionPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="book-appointment" element={<BookAppointment />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/login"
        element={isLoggedIn === 1 ? <Navigate to="/" /> : <LoginPage />}
      />

      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Layout>
              <div className="container mx-auto py-8 px-4">
                <h1 className="text-2xl font-bold mb-4">My Account</h1>
                {/* Account page content here */}
              </div>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;