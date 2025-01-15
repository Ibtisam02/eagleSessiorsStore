import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserCard = ({
  id,
  image1 = "/api/placeholder/400/400",
  image2 = "/api/placeholder/400/400",
  title = "Product Title",
  rating = 5,
  reviews = 1,
  originalPrice = "53,500.00",
  salePrice = "21,400.00",
  isSpecial = true,
  currency = "PKR",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        size={14}
        className={`${
          index < rating ? "fill-current" : "fill-none"
        } text-black`}
      />
    ));
  };

  return (
    <Link
      to={`/product/${id}`}
      ref={cardRef}
      className={`group relative flex flex-col w-[calc(50%-4px)] lg:w-[calc(25%-6px)] transform transition-all duration-700 ease-out
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Special Badge */}
      {isSpecial && (
        <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-0.5 text-xs font-medium rounded-md z-10">
          SPECIAL
        </span>
      )}

      {/* Sale Badge */}
      {/*<span className="absolute bottom-[45%] left-2 bg-black text-white px-2 py-0.5 text-xs font-medium rounded-md">
        Sale
      </span>*/}

      {/* Image Container */}
      <div className="relative w-full pb-[90%] overflow-hidden rounded-lg bg-gray-100">
        {/* First Image */}
        <img
          src={image1}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-in-out transform ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Second Image */}
        <img
          src={image2}
          alt={`${title} - alternate view`}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-in-out transform ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow mt-2 space-y-2">
        <h3 className="text-xs font-medium text-gray-900 break-words group-hover:underline cursor-pointer">
          {title}
        </h3>

        {rating > 0 ? (
          <div className="flex items-center gap-1">
            {[...new Array(Math.ceil(rating)).keys()].map((star) => (
              <span key={star} className="text-yellow-400 text-sm">★</span>
            ))}
            <span className="text-xs text-gray-600">({reviews})</span>
          </div>
        ) : null}

        {/* Pricing */}
        <div className="flex flex-col mt-auto">
          <p className="text-xs text-gray-500 line-through">
            {currency} {originalPrice.toLocaleString()}
          </p>
          <div className="flex items-baseline">
            <span className="text-xs font-medium">From </span>
            <p className="ml-1 text-sm font-semibold">
              {currency} {salePrice.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;