import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../redux/reviewSlice.jsx/getAllReviews';
import ReviewSection from '../components/reviews/ProductReview';
import { MoonLoader } from 'react-spinners';

const ProductReviews = () => {
let dispatch=useDispatch()
 useEffect(() => { window.scrollTo(0, 0); }, []);
  let {isLoading,reviews}=useSelector((state)=>state.getAllReviewsUser)
  useEffect(()=>{
    dispatch(getAllReviews()).then((res)=>{
          console.log(res);
        })

  },[dispatch])
  //const reviewRefs = useRef([]);


  /*const reviews = [
    {
      _id: 1,
      author: "Stacey A",
      rating: 5,
      date: "1 week ago",
      title: "Fantastic",
      comment: "Fantastic delivery, excellent scissors, engraving brilliant too 😊, thank you",
      image: {
        url:"/api/placeholder/400/300"
      }
    },
    {
      _id: 2,
      author: "Lisa Ritson",
      rating: 5,
      createdAt: "2 weeks ago",
      title: "Amazing scissors",
      comment: "Amazing scissors a little disappointed with the engraving as it isn't ver noticeable",
      image: {
        url:"/api/placeholder/400/300"
      }
    }
  ];*/

 /* useEffect(() => {
    const observers = [];
    reviewRefs.current.forEach((ref) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      if (ref) {
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);*/

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    
      {/* Header Section */}
      <div className="text-center mb-16 space-y-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-gray-900 animate-fade-in">
          Reviews
        </h1>
        <div className="w-16 h-1 bg-gray-200 mx-auto transform transition-all duration-300 hover:w-24 hover:bg-gray-400"></div>
      </div>

      {/* Reviews Section */}
      {isLoading? <div className="sweet-loading w-screen h-screen flex justify-center items-center">
      <MoonLoader
      color="#ff0000"
      cssOverride={{}}
      loading={isLoading}
      size={60}
      speedMultiplier={2}
      /> 
</div>:<div>
     {reviews?.length>0?<ReviewSection Reviews={reviews}/>:<p>No Review Yet</p>}
      </div>}

      
    </div>
  );
}

export default ProductReviews;