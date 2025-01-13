import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBanners } from '../../redux/reviewSlice.jsx/getAllBanners';

const BannerSlider = () => {
  let dispatch=useDispatch()
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample banner data with links
  let { isLoading, banners } = useSelector((state) => state.getAllBanners);
  useEffect(()=>{
    dispatch(getAllBanners()).then((res) => {
          console.log(res);
        });
  },[])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === banners?.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev === 0 ? banners?.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  /*useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);*/

  const handleButtonClick = (e, link) => {
    e.preventDefault();
    // Use your preferred routing method here
    window.location.href = link;
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* Main banner container with reduced height */}
      <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]">
        {banners?.map((banner, index) => (
          <div
            key={banner?._id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out transform ${
              index === currentSlide
                ? 'translate-x-0 opacity-100'
                : index < currentSlide
                ? '-translate-x-full opacity-0'
                : 'translate-x-full opacity-0'
            }`}
          >
            {/* Banner image */}
            <img
              src={banner?.image?.url}
              alt={banner?.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Content overlay with adjusted padding and spacing */}
            <div className="absolute inset-0 bg-black bg-opacity-40">
              <div className="flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-2 sm:space-y-3">
                {banner?.title?<h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transform translate-y-0 opacity-100 transition-all duration-700 delay-100">
                  {banner?.title}
                </h2>:null}
                {banner?.subtitle?<p className="text-sm sm:text-base md:text-lg mb-1 transform translate-y-0 opacity-100 transition-all duration-700 delay-200">
                  {banner?.subtitle}
                </p>:null}
                {banner?.description?<p className="text-xs sm:text-sm md:text-base mb-2 max-w-xl transform translate-y-0 opacity-100 transition-all duration-700 delay-300">
                  {banner?.description}
                </p>:null}
                {banner.buttonText&&banner?.link?<button 
                  onClick={(e) => handleButtonClick(e, banner?.link)}
                  className="bg-white text-black px-4 py-1.5 sm:px-6 sm:py-2 rounded-full text-sm md:text-base font-medium hover:bg-opacity-90 transform hover:scale-105 transition-transform"
                >
                  {banner?.buttonText}
                </button>:null}
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1.5 sm:p-2 rounded-full hover:bg-opacity-100 transition-all z-10"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-1.5 sm:p-2 rounded-full hover:bg-opacity-100 transition-all z-10"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {banners?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-3 sm:w-4' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;