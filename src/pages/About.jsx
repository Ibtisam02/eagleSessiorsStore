import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);
 useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // We're only observing one element, so we can use entries[0]
      if (entries[0].isIntersecting) {
        // Add delay to the animation
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
        // Once we've triggered the animation, we can stop observing
        observer.unobserve(domRef.current);
      }
    }, { threshold: 0.15 }); // Trigger when 15% of the element is visible

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`transform transition-all duration-1000 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  );
};

const About = () => {
  return (
    <div className="w-full bg-white">
      {/* Mission Statement */}
      <FadeIn>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Crafting Excellence in Every Cut
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that every stylist deserves tools that match their expertise and passion. Our journey began with a simple mission to create scissors that combine traditional Japanese craftsmanship with modern innovation.
            </p>
          </div>
        </div>
      </FadeIn>

      {/* Story Section */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={200}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
                  Founded by master craftsmen with over three decades of experience, our products emerged from a dedication to perfection. Our founders spent years studying traditional Japanese blade-making techniques, combining them with contemporary precision engineering.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Each pair of scissors is meticulously crafted in our workshop, where traditional skills meet modern technology. Our artisans spend countless hours ensuring every detail meets our exacting standards.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="relative h-[400px]">
                <img 
                  src="https://res.cloudinary.com/dsilhases/image/upload/v1737296604/982f4b90-3293-4ded-bf99-e109a41e137d_20250119_142013_0000_a3jrih.jpg"
                  alt="Crafting process" 
                  className="w-full h-full object-cover rounded-lg shadow-xl"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <FadeIn delay={200}>
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Craftsmanship",
              description: "Every pair of scissors is handcrafted with meticulous attention to detail, ensuring unparalleled quality and durability."
            },
            {
              title: "Innovation",
              description: "We continuously research and develop new techniques to improve our products while maintaining traditional quality standards."
            },
            {
              title: "Service",
              description: "Our commitment to customer satisfaction extends beyond the sale, with lifetime support for every product we create."
            }
          ].map((value, index) => (
            <FadeIn key={index} delay={200 * (index + 1)}>
              <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Quality Section */}
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn delay={200}>
              <div className="relative h-[400px]">
                <img 
                  src="https://res.cloudinary.com/dsilhases/image/upload/v1737295974/86202c1c-35af-4e0e-801d-369f47d88319_20250119_014602_0000_uddrpl.jpg"
                  alt="Quality inspection" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </FadeIn>
            <FadeIn delay={400}>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">The Standard And Quality</h2>
                <p className="leading-relaxed">
                  Every pair of Scissors undergoes rigorous quality control, including:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    <span>Multiple stages of precision testing</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    <span>Individual inspection by master craftsmen</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="h-1.5 w-1.5 bg-white rounded-full"></span>
                    <span>Comprehensive performance evaluation</span>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <FadeIn delay={200}>
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
            <p className="text-gray-600 mb-8">
              Have questions about our products or our services? We'd love to hear from you.
            </p>
            <Link to={"/contact"} className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default About;