import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  let date=new Date().getFullYear();
  
  const footerLinks = [
    { title: "About us", href: "/about" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Shipping Policy", href: "/shipping-policy" },
    { title: "Refund policy", href: "/refund-policy" },
    { title: "Terms of Service", href: "terms-of-service" },
    { /*title: "Do not sell or share my personal information", href: "#" */},
  ];

  return (
    <footer className="bg-black text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Links Section */}
          <div className="space-y-3">
            {footerLinks.map((link) => (
              <div key={link.title}>
                <Link to={link.href}  className="hover:text-gray-300 transition-colors">
                  {link.title}
                </Link>
              </div>
            ))}
          </div>

          {/* Brand Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold mb-4">BRAND INFORMATION</h2>
            <h3 className="font-semibold">Eagle Traders Uk Ltd</h3>
            <div>
              <p className="font-medium">Office hours:</p>
              <p>Monday - Saturday: 8AM - 8PM</p>
              <p>Sunday: 8AM - 4PM</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Payment Methods</h2>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white p-2 rounded-md w-12 h-8 flex items-center justify-center">
                <img src="https://cdn2.iconfinder.com/data/icons/social-media-and-payment/64/-23-128.png" alt="PayPal" className="w-full h-full object-contain scale-150" />
              </div>
              <div className="bg-white p-2 rounded-md w-12 h-8 flex items-center justify-center">
                <img src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Visa-128.png" alt="Visa" className="w-full h-full object-contain scale-150" />
              </div>
              <div className="bg-white p-2 rounded-md w-12 h-8 flex items-center justify-center">
                <img src="https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-128.png" alt="Mastercard" className="w-full h-full object-contain scale-150" />
              </div>
              <div className="bg-white p-2 rounded-md w-12 h-8 flex items-center justify-center">
                <img src="https://cdn1.iconfinder.com/data/icons/simplicity-payment-methods/512/bank_trasfer-128.png" alt="Bank Transfer" className="w-full h-full object-contain scale-150" />
              </div>
              <div className="bg-white p-2 rounded-md w-12 h-8 flex items-center justify-center">
                <img src="https://cdn.iconscout.com/icon/free/png-512/free-google-pay-logo-icon-download-in-svg-png-gif-file-formats--gpay-technology-social-media-vol-3-pack-logos-icons-2944906.png?f=webp&w=512" alt="Bank Transfer" className="w-full h-full object-contain scale-150" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-4 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>© {date}, Eagle Traders Uk Ltd</span>
              {/*<a href="#" className="hover:text-gray-300">Powered by Shopify</a>*/}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <Link to={"/refund-policy"} className="hover:text-gray-300">Refund policy</Link>
              <Link to={"/privacy-policy"} href="/privacy-policy" className="hover:text-gray-300">Privacy policy</Link>
              <Link to={"/terms-of-service"}  className="hover:text-gray-300">Terms of service</Link>
              <Link to={"/shipping-policy"}  className="hover:text-gray-300">Shipping policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;