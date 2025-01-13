import React, { useEffect, useState, useRef } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20 mt-14"
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Image Section */}
        <div className={`w-full md:w-1/2 transform transition-all duration-1000 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}>
          <div className="relative aspect-[4/3] w-full">
            <img
              src="https://www.sakurascissors.com/cdn/shop/files/185A4678_1_-Photoroom.jpg?v=1734046260&width=750"
              alt="Japanese Steel Scissors Collection"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className={`w-full md:w-1/2 transform transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-16 opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            JAPANESE STEEL SCISSORS
          </h1>

          <div className="space-y-6">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                We're clearing stock to make room for new collections! Get
                <span className="font-semibold text-black"> 75% off </span>
                premium Japanese scissors without sacrificing quality. Once they're gone, they're gone—don't miss out!
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Crafted from <span className="font-medium">high-quality Japanese steel</span>, our scissors are:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  <span>corrosion-resistant</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  <span>designed for precision</span>
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                  <span>long-lasting sharpness</span>
                </li>
              </ul>

              <p className="text-gray-700">
                Perfect for professionals and enthusiasts alike!
              </p>
            </div>

            <button className="bg-black text-white px-8 py-3 rounded-full font-medium transform transition-transform hover:scale-105 active:scale-95">
              SHOP 75% OFF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;