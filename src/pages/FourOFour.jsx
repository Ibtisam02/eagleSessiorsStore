import React, { useEffect } from 'react';
import { FaHome, FaSearch } from 'react-icons/fa';
import { FiRefreshCcw } from 'react-icons/fi';

const NotFoundPage = () => {
   useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* 404 Card */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        {/* 404 Text */}
        <div className="text-center mb-6">
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <div className="flex justify-center items-center mb-6">
            <FaSearch className="w-16 h-16 text-gray-400 animate-bounce" />
          </div>
        </div>
        
        {/* Error Message */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600">
            Oops! Looks like you've wandered into uncharted territory.
          </p>
          <p className="text-sm text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FaHome className="w-4 h-4" />
            Return Home
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <FiRefreshCcw  className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
      
      {/* Footer Text */}
      <div className="mt-8 text-center space-y-2">
        
        <p className="text-gray-400 text-xs">
          Error Code: 404 | Page Not Found
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;