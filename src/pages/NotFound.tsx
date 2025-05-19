import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 px-4">
      <h1 className="text-6xl font-heading text-gold mb-4">404</h1>
      <h2 className="text-2xl font-heading mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md text-center mb-8">
        The page you're looking for doesn't exist or has been moved. 
        Please check the URL or navigate back to our homepage.
      </p>
      <Link to="/" className="btn-primary">
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;