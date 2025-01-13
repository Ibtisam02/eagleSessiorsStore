import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Success Card */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="w-20 h-20 text-green-500" />
        </div>
        
        {/* Success Message */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Success!</h1>
          <p className="text-gray-600 text-lg">
            Your action has been completed successfully.
          </p>
          <p className="text-sm text-gray-500">
            We'll send you a confirmation email shortly.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-2 rounded-md transition-colors duration-200"
          >
            Go to Home
          </button>
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-2 rounded-md transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
      
      {/* Footer Text */}
      <p className="mt-8 text-gray-500 text-sm">
        Thank you for using our service
      </p>
    </div>
  );
};

export default SuccessPage;