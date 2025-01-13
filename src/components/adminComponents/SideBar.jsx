import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaPlus, FaShoppingCart, FaStar, FaBox } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { title: 'Home', icon: <FaHome size={20} />, path: '/admin/Home' },
    { title: 'Products', icon: <FaBox  size={20} />, path: '/admin/products' },
    { title: 'Add Product', icon: <FaPlus size={20} />, path: '/admin/add-a-product' },
    { title: 'Orders', icon: <FaShoppingCart size={20} />, path: '/admin/orders' },
    { title: 'Reviews', icon: <FaStar size={20} />, path: '/admin/reviews' },
  ];

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-200 lg:hidden"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-gray-900 to-gray-800 
        transition-all duration-300 ease-in-out shadow-xl
        ${isOpen ? 'translate-x-0 w-72' : '-translate-x-full w-72 lg:translate-x-0'}
        lg:w-72 z-40`}
      >
        {/* Logo Area */}
        <div className="flex flex-col items-center justify-center h-24 border-b border-gray-700/50">
          <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
          <div className="w-32 h-1 bg-indigo-600 mt-2 rounded-full"></div>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    <span className={`mr-3 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.title}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-gray-700/50 pt-4">
            <div className="text-center text-gray-400 text-sm">
              Welcome, Admin
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Push */}
      <div className="lg:ml-72 min-h-screen">
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;