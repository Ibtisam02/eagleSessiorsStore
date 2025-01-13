import React, { useEffect, useState } from 'react';
import { FaPlus, FaStar, FaStarHalf,FaTimes,FaTrash  } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviewsAdmin } from '../../redux/reviewSlice.jsx/getAllReviewsAdmin';
import { MoonLoader } from 'react-spinners';
import { deleteReviewAdmin } from '../../redux/reviewSlice.jsx/deleteReviewAdmin';
import toast from 'react-hot-toast';
//import { FaX } from 'react-icons/fa6';

const ReviewsTable = () => {
  let dispatch=useDispatch()
  const [selectedReview, setSelectedReview] = useState(null);
  let [change,setChange]=useState(false)
  let {isLoading,reviews}=useSelector((state)=>state.getAllReviewsAdmin)
  useEffect(()=>{
    dispatch(getAllReviewsAdmin()).then((res)=>{
      console.log(res);
      
    })
  },[change,dispatch])
  /*const [reviews, setReviews] = useState([
    {
      id: 1,
      orderId: "ORD-001",
      customer: {
        name: "John Doe",
        email: "john@example.com"
      },
      rating: 4.5,
      comment: "Excellent product and fast shipping! The quality exceeded my expectations. Would definitely recommend to others.",
      date: "2024-01-15",
      images: [
        "/api/placeholder/200/150",
        "/api/placeholder/200/150"
      ]
    },
    {
      id: 2,
      orderId: "ORD-002",
      customer: {
        name: "Sarah Smith",
        email: "sarah@example.com"
      },
      rating: 5,
      comment: "Perfect in every way! The attention to detail is remarkable. This is exactly what I was looking for.",
      date: "2024-01-14",
      images: [
        "/api/placeholder/200/150"
      ]
    }
  ]);*/

  const handleDeleteReview = (reviewId) => {
    if (reviewId) {
      dispatch(deleteReviewAdmin(reviewId)).then((res)=>{
        console.log(res);
        if (res.payload.success) {
          setSelectedReview(null)
          setChange(!change)
          return toast.success(res.payload.message)
        }
      })
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalf key="half-star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    return stars;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr className="whitespace-nowrap">
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                <th className="py-4 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reviews?.map((review) => (
                <tr 
                  key={review?._id}
                  className="hover:bg-gray-50 transition-colors duration-150 ease-in-out cursor-pointer"
                  onClick={() => setSelectedReview(review)}
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="font-medium text-gray-900">{review?.author}</span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-600">
                    {review?.orderId}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-600 line-clamp-2">{review?.comment}</p>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right text-sm">
                    <button 
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-150"
                      onClick={() => setSelectedReview(review)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>}
      </div>

      {/* Review Detail Modal */}
      {selectedReview && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-200 ease-in-out"
          onClick={() => setSelectedReview(null)}
        >
          <div 
            className="bg-white rounded-xl w-full max-w-2xl overflow-hidden transition-transform duration-200 ease-in-out transform"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gray-50 p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{selectedReview?.author}</h3>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleDeleteReview(selectedReview?._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-150"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setSelectedReview(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(selectedReview?.rating)}
                    </div>
                    <span className="text-lg font-medium">{selectedReview?.rating}/5</span>
                  </div>
                  <span className="text-sm text-gray-500">{formatDate(selectedReview?.createdAt?.slice(0,10))}</span>
                </div>

                <div>
                  <p className="text-gray-600 leading-relaxed">{selectedReview?.comment}</p>
                </div>

                {selectedReview?.image?.url && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Attached Images</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <img 
                          src={selectedReview?.image?.url}
                          alt={`Review image`}
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4 border-t">
                  <span className="text-sm text-gray-500">Order ID: {selectedReview?.orderId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTable;