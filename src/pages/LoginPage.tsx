import { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, LogOut, ShoppingBag, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

export default function LoginPage() {
  // Get the auth context values
  const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail } = useContext(AuthContext);
  
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic validation
    if (!userEmail.trim() || !password.trim()) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    // Simple password validation (minimum 6 characters)
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    
    // Clear any previous error messages
    setErrorMessage('');
    
    // Set logged in state to 1 (FIXED: This was accidentally set to 0 before)
    setIsLoggedIn(1);
    
    // Redirect to home page after successful login
    navigate('/');
  };

  const handleLogout = () => {
    // Clear login state
    setIsLoggedIn(0);
    setUserEmail('');
    
    // Clear localStorage (redundant but good practice for certainty)
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {isLoggedIn === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading text-gray-900">Welcome Back</h2>
              <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
              <p className="mt-4 text-gray-600">Sign in to your account to continue</p>
            </div>
            
            {errorMessage && (
              <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                {errorMessage}
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gold focus:ring-gold border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-gold hover:text-gold/80">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded-md transition duration-300 shadow-sm"
              >
                Sign In
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <a href="#" className="text-gold hover:text-gold/80 font-medium">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-heading text-gray-900">Welcome Back</h2>
              <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
              <p className="mt-4 text-gray-600">You are logged in as {userEmail}</p>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <User size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-medium">My Profile</h3>
                  <p className="text-sm text-gray-500">Edit your profile details</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <ShoppingBag size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-medium">My Orders</h3>
                  <p className="text-sm text-gray-500">View your order history</p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="bg-gold/10 p-3 rounded-full mr-4">
                  <Heart size={24} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-medium">Wishlist</h3>
                  <p className="text-sm text-gray-500">Your saved items</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-md transition duration-300 shadow-sm mt-4"
              >
                <LogOut size={18} className="mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
        
        <div className="bg-cream py-4 px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} SAAH by Pankti Chheda. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}