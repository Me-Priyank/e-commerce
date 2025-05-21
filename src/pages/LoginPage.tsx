import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

// Base API URL - easier to change if needed
const API_BASE_URL = 'http://13.60.171.89:8080/api/v1';

export default function LoginPage() {
  // Get the auth context values
  const { isLoggedIn, setIsLoggedIn, userEmail, setUserEmail } = useContext(AuthContext);
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setIsLoggedIn(1);
      navigate('/home');
    }
  }, [navigate, setIsLoggedIn]);

  const handleEmailSubmit = async () => {
    // Basic validation
    if (!userEmail.trim()) {
      setErrorMessage('Please enter your email');
      return;
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Try multiple request formats to see which one works with your API
      // Format 1: Query parameter
      console.log('Attempting OTP request with email:', userEmail);
      
      // Try with direct query parameter (no encodeURIComponent)
      const response = await axios.post(
        `${API_BASE_URL}/auth/login/email-otp?email=${userEmail}`,
        {},
        { 
          headers: { 
            'Accept': '*/*',
            'Content-Type': 'application/json' 
          }
        }
      );
      
      console.log('OTP request response:', response);
      
      if (response.status === 200) {
        // Save email to localStorage
        localStorage.setItem('user_email', userEmail);
        setSuccessMessage('OTP sent to your email');
        setStep('otp');
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Let's try an alternative approach if the first one fails
      try {
        console.log('First attempt failed, trying alternative request format');
        
        // Format 2: Request body with email parameter
        const altResponse = await axios({
          method: 'POST',
          url: `${API_BASE_URL}/auth/login/email-otp`,
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*'
          },
          data: `email=${encodeURIComponent(userEmail)}`
        });
        
        console.log('Alternative OTP request response:', altResponse);
        
        if (altResponse.status === 200) {
          localStorage.setItem('user_email', userEmail);
          setSuccessMessage('OTP sent to your email');
          setStep('otp');
          return;
        }
      } catch (altError) {
        console.error('Alternative approach also failed:', altError);
        
        // Last resort - try without any content-type header
        try {
          console.log('Trying final approach with minimal headers');
          
          const finalResponse = await fetch(`${API_BASE_URL}/auth/login/email-otp?email=${encodeURIComponent(userEmail)}`, {
            method: 'POST',
            headers: {
              'Accept': '*/*'
            }
          });
          
          if (finalResponse.ok) {
            localStorage.setItem('user_email', userEmail);
            setSuccessMessage('OTP sent to your email');
            setStep('otp');
            return;
          }
        } catch (finalError) {
          console.error('Final approach also failed:', finalError);
        }
      }
      
      // If all attempts fail, show error message
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error
          const statusCode = error.response.status;
          const errorData = error.response.data;
          
          if (statusCode === 500) {
            setErrorMessage('Server error. Please try again later or contact support.');
          } else if (statusCode === 404) {
            setErrorMessage('Email not registered. Please check your email address.');
          } else if (errorData && errorData.message) {
            setErrorMessage(errorData.message);
          } else {
            setErrorMessage(`Error (${statusCode}): Failed to send OTP. Please try again.`);
          }
        } else if (error.request) {
          // No response received
          setErrorMessage('No response from server. Please check your internet connection.');
        } else {
          setErrorMessage('Failed to send OTP. Please try again.');
        }
      } else {
        setErrorMessage('Failed to send OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    // Basic validation
    if (!otp.trim()) {
      setErrorMessage('Please enter the OTP');
      return;
    }
    
    if (otp.length < 6) {
      setErrorMessage('Please enter a valid OTP');
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Verify OTP with proper request format
      const response = await axios.post(
        `${API_BASE_URL}/auth/verify/email-otp`,
        { 
          contact: userEmail, 
          otp: otp 
        },
        { 
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        }
      );
      
      // Check if response is successful
      if (response.data && response.data.response_key === 'SUCCESS') {
        // Store user data in localStorage
        localStorage.setItem('user_data', JSON.stringify(response.data.payload.user));
        localStorage.setItem('access_token', response.data.payload.token_detail.access_token);
        
        if (response.data.payload.role) {
          localStorage.setItem('role', response.data.payload.role.name);
        }
        
        localStorage.setItem('user_email', userEmail);
        
        // Update auth context
        setIsLoggedIn(1);
        
        // Redirect to home page
        navigate('/home');
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      
      // Handle different types of errors
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with an error
          const statusCode = error.response.status;
          const errorData = error.response.data;
          
          if (statusCode === 401) {
            setErrorMessage('Invalid OTP. Please try again.');
          } else if (errorData && errorData.message) {
            setErrorMessage(errorData.message);
          } else {
            setErrorMessage(`Error (${statusCode}): Failed to verify OTP. Please try again.`);
          }
        } else if (error.request) {
          // No response received
          setErrorMessage('No response from server. Please check your internet connection.');
        } else {
          setErrorMessage('Failed to verify OTP. Please try again.');
        }
      } else {
        setErrorMessage('Failed to verify OTP. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Render the email input step
  const renderEmailStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading text-gray-900">Welcome Back</h2>
        <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600">Enter your email to receive a verification code</p>
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
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>
        </div>
        
        <button
          onClick={handleEmailSubmit}
          disabled={loading}
          className="w-full bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded-md transition duration-300 shadow-sm flex items-center justify-center"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : null}
          {loading ? 'Sending...' : 'Send Verification Code'}
          {!loading && <ArrowRight size={18} className="ml-2" />}
        </button>
      </div>
    </motion.div>
  );

  // Render the OTP input step
  const renderOtpStep = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-heading text-gray-900">Verify Your Email</h2>
        <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
        <p className="mt-4 text-gray-600">Enter the verification code sent to <span className="font-medium">{userEmail}</span></p>
      </div>
      
      {errorMessage && (
        <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {errorMessage}
        </div>
      )}
      
      {successMessage && (
        <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-md text-sm">
          {successMessage}
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyRound size={18} className="text-gray-400" />
            </div>
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-gold focus:border-gold text-center tracking-widest"
              placeholder="000000"
              maxLength={6}
              disabled={loading}
            />
          </div>
        </div>
        
        <button
          onClick={handleOtpSubmit}
          disabled={loading}
          className="w-full bg-gold hover:bg-gold/90 text-white py-2 px-4 rounded-md transition duration-300 shadow-sm flex items-center justify-center"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : null}
          {loading ? 'Verifying...' : 'Verify & Login'}
        </button>
        
        <div className="text-center mt-4">
          <button
            onClick={handleBackToEmail}
            className="text-gold hover:text-gold/80 text-sm font-medium"
            disabled={loading}
          >
            Change Email
          </button>
        </div>
        
        <div className="text-center mt-2">
          <button
            onClick={handleEmailSubmit}
            className="text-gray-600 hover:text-gray-800 text-sm"
            disabled={loading}
          >
            Didn't receive code? Resend
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {step === 'email' ? renderEmailStep() : renderOtpStep()}
        
        <div className="bg-cream py-4 px-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} SAAH by Pankti Chheda. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}