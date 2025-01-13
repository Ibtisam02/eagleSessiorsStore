import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
  
  const ShopCategories = () => {
    const categories = [
        {
          title: "CUTTING & THINNING SCISSORS",
          image: "https://www.sakurascissors.com/cdn/shop/collections/S4c690cdc15d8432fb8c6ab2c7ebde554C-Photoroom.jpg?v=1734048316&width=535",
          alt: "Right handed scissors"
        },
        {
          title: "RAZORS",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8L7k7ndq9zN3oTfKxQseYJ49MHjC6rrQnkQ&s",
          alt: "Left handed scissors"
        },
        {
          title: "HAIRDRESSING ACCESSORIES",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc8efOQ8Didn0DAtEUiI7svmwMvLj6kEXnp8X6QR4_xyZgodUrCcFCtZtxA7VbcRH8vGg&usqp=CAU",
          alt: "Hairdressing accessories"
        }
      ];
  
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-4xl font-bold mb-12 tracking-wide opacity-0 animate-fade-in-up">
          SHOP ALL
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {categories.map((category, index) => (
            <Link
            to={`/productsBYCatagory/${category.title}`} 
              key={category.title} 
              className="group cursor-pointer opacity-0 border border-black"
              style={{
                animation: `fade-in-up 0.6s ease-out ${index * 0.2}s forwards`
              }}
            >
              <div className="relative overflow-hidden bg-white shadow-sm ">
                <img
                  src={category.image}
                  alt={category.alt}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <h2 className="text-lg font-medium">{category.title}</h2>
                <FaArrowRight 
                  className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
  
        <style jsx global>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
  
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
  
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
  
          .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    );
  };
  
  export default ShopCategories;