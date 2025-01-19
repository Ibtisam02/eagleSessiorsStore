import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addUserReview } from '../redux/reviewSlice.jsx/addUserReview';
import toast from 'react-hot-toast';

const ReviewForm = () => {
  let {id}=useParams()
  let dispatch=useDispatch()
   useEffect(() => { window.scrollTo(0, 0); }, []);
  let {isLoading,message}=useSelector((state)=>state.addUserReview)
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    comment: '',
    image: null
  });

  const [touched, setTouched] = useState({
    rating: false,
    title: false,
    comment: false
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [previewUrl, setPreviewUrl] = useState('');

  const getErrors = (field) => {
    switch (field) {
      case 'rating':
        if (!formData.rating) return 'Please select a rating';
        return '';
      case 'title':
        if (!formData.title) return 'Title is required';
        if (formData.title.length < 3) return 'Title must be at least 3 characters';
        return '';
      case 'comment':
        if (!formData.comment) return 'Review comment is required';
        if (formData.comment.length < 10) return 'Comment must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mark all fields as touched
    setTouched({
      rating: true,
      title: true,
      comment: true
    });

    // Check if there are any errors
    const hasErrors = ['rating', 'title', 'comment'].some(field => getErrors(field));
    
    if (!hasErrors) {
      let formDat=new FormData();

      formDat.append("id",id);
      formDat.append("rating",formData.rating);
      formDat.append("title",formData.title);
      formDat.append("comment",formData.comment);
      formDat.append("image",formData.image);
      dispatch(addUserReview(formDat)).then((res)=>{
        console.log(res);
        if (res.payload?.success) {
          return toast.success(res.payload?.message)
        }
        
      })
      
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white border border-gray-200">
      <h2 className="text-2xl font-bold text-black mb-8 text-center">Write a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Rating *</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`w-8 h-8 cursor-pointer transition-transform hover:scale-110 ${
                  star <= (hoveredRating || formData.rating)
                    ? 'fill-black text-black'
                    : 'text-gray-300'
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => {
                  setFormData({ ...formData, rating: star });
                  setTouched({ ...touched, rating: true });
                }}
              />
            ))}
          </div>
          {touched.rating && getErrors('rating') && (
            <p className="text-xs text-red-400 mt-1 border-l-2 border-black pl-2 bg-gray-50">
              {getErrors('rating')}
            </p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            onBlur={() => handleBlur('title')}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none
                     text-black bg-white"
            placeholder="Enter review title"
          />
          {touched.title && getErrors('title') && (
            <p className="text-xs text-red-400 mt-1 border-l-2 border-black pl-2 bg-gray-50">
              {getErrors('title')}
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Review Comment *</label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            onBlur={() => handleBlur('comment')}
            className="w-full px-4 py-2 border border-gray-300 focus:border-black outline-none
                     text-black bg-white h-32 resize-none"
            placeholder="Write your review here"
          />
          {touched.comment && getErrors('comment') && (
            <p className="text-xs text-red-400 mt-1 border-l-2 border-black pl-2 bg-gray-50">
              {getErrors('comment')}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Add Image (optional)
          </label>
          <div className="border-2 border-dashed border-gray-300 p-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-black
                       file:mr-4 file:py-2 file:px-4
                       file:border file:border-black
                       file:text-sm file:font-medium
                       file:bg-white file:text-black
                       hover:file:bg-gray-100"
            />
            {previewUrl && (
              <div className="mt-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-w-full h-auto max-h-48"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-black text-white font-medium 
                   hover:bg-gray-900 transition-colors focus:outline-none
                   disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;