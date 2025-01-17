import React, { useState, useEffect, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProductt } from "../../redux/productSlice/deleteProductSlice";

const AdminCard = ({
  id,
  image1 = "/api/placeholder/400/400",
  image2 = "/api/placeholder/400/400",
  title = "Product Title",
  rating = 5,
  reviews = 10,
  originalPrice,
  salePrice ,
  isSpecial = true,
  currency = "PKR",
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  let dispatch=useDispatch();

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
    return [...Array(Math.ceil(rating))]?.map((_, index) => (
      <FaStar
        key={index}
        size={14}
        className={`${
          index < rating ? "fill-current" : "fill-none"
        } text-black`}
      />
    ));
  };

  const handleUpdate = () => {
    navigate(`/admin/upDateProduct/${id}`);
  };

  const handleDelete = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  let deleteProduct=()=>{
    dispatch(deleteProductt(id)).then((res)=>{
      console.log(res);
      
    })
  }

  return (
    <div
    
      ref={cardRef}
      className={`group relative flex flex-col w-full max-w-[250px] transform transition-all duration-700 ease-out
        ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
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
      <span className="absolute bottom-[45%] left-2 bg-black text-white px-2 py-0.5 text-xs font-medium rounded-md">
        Sale
      </span>

      {/* Image Container */}
      <Link to={`/admin/product/${id}`} className="relative w-full pb-[90%] overflow-hidden rounded-lg bg-gray-100 mb-2">
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
      </Link>

      {/* Product Info */}
      <Link to={`/admin/product/${id}`} className="flex flex-col flex-grow space-y-1">
        <h3 className="text-xs font-medium text-gray-900 truncate group-hover:underline cursor-pointer">
          {title}
        </h3>

        {/* Tooltip for full title */}
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -top-2 left-0 right-0 -translate-y-full bg-black text-white text-xs p-2 rounded-md z-20 pointer-events-none">
          {title}
        </div>

        {/* Rating */}
        {rating?<div className="flex items-center">
          <div className="flex mr-1">{renderStars()}</div>
          <span className="text-xs text-gray-500">({reviews})</span>
        </div>:null}

        {/* Pricing */}
        <div className="flex flex-col">
          {Number(originalPrice)===Number(salePrice)?null:<p className="text-xs text-gray-500 line-through">
          {currency} {originalPrice.toLocaleString()} 
          </p>}
          <div className="flex items-baseline">
            <span className="text-xs font-medium">From </span>
            <p className="ml-1 text-sm font-semibold">
            {currency} {salePrice.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handleUpdate}
          className="text-sm font-medium text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="text-sm font-medium text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="text-sm font-medium text-gray-600 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
              onClick={deleteProduct}
                className="text-sm font-medium text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Confirm
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCard;