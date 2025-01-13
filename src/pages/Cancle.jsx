import React from 'react';
import { FiXCircle } from 'react-icons/fi';

const CancelPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Cancel Card */}
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-xl border border-gray-100">
        {/* Cancel Icon */}
        <div className="flex justify-center mb-6">
          <FiXCircle  className="w-20 h-20 text-red-500" />
        </div>
        
        {/* Cancel Message */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Cancelled</h1>
          <p className="text-gray-600 text-lg">
            Your action has been cancelled.
          </p>
          <p className="text-sm text-gray-500">
            No changes have been made to your payment.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 my-6"></div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-md transition-colors duration-200"
          >
            Return Home
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
      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm">
          Need help? <span className="text-red-600 hover:text-red-700 cursor-pointer">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default CancelPage;