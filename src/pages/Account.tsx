import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Account: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Get user data from localStorage
    const storedEmail = localStorage.getItem('user_email');
    const storedUserData = localStorage.getItem('user_data');
    
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear all stored data
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_data');
    localStorage.removeItem('role');
    
    // Update auth context
    setIsLoggedIn(0);
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gold to-yellow-500 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full">
                <User size={32} className="text-gold" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Account</h1>
                <p className="text-gold-100">Welcome back!</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition duration-300 flex items-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Account Information */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* User Information Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User size={20} className="mr-2 text-gold" />
                Account Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center space-x-2 p-3 bg-white rounded-md border">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-gray-900">{userEmail || 'Not available'}</span>
                  </div>
                </div>

                {userData && (
                  <>
                    {userData.name && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <div className="p-3 bg-white rounded-md border">
                          <span className="text-gray-900">{userData.name}</span>
                        </div>
                      </div>
                    )}

                    {userData.phone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <div className="p-3 bg-white rounded-md border">
                          <span className="text-gray-900">{userData.phone}</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Settings size={20} className="mr-2 text-gold" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/home')}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-md border transition duration-300"
                >
                  <div className="font-medium text-gray-900">Go to Home</div>
                  <div className="text-sm text-gray-600">Browse our collections</div>
                </button>
                
                <button
                  onClick={() => navigate('/book-appointment')}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-md border transition duration-300"
                >
                  <div className="font-medium text-gray-900">Book Appointment</div>
                  <div className="text-sm text-gray-600">Schedule a consultation</div>
                </button>
                
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full text-left p-3 bg-white hover:bg-gray-100 rounded-md border transition duration-300"
                >
                  <div className="font-medium text-gray-900">Contact Us</div>
                  <div className="text-sm text-gray-600">Get in touch with our team</div>
                </button>
              </div>
            </div>
          </div>

          
        </div>
      </motion.div>
    </div>
  );
};

export default Account;