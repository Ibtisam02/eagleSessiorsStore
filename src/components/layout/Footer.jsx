import React from 'react';

const Footer = () => {
  const footerLinks = [
    { title: "About us", href: "#" },
    { title: "Privacy Policy", href: "#" },
    { title: "Shipping Policy", href: "#" },
    { title: "Refund policy", href: "#" },
    { title: "Terms of Service", href: "#" },
    { title: "Do not sell or share my personal information", href: "#" },
  ];

  return (
    <footer className="bg-black text-white py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Links Section */}
          <div className="space-y-3">
            {footerLinks.map((link) => (
              <div key={link.title}>
                <a href={link.href} className="hover:text-gray-300 transition-colors">
                  {link.title}
                </a>
              </div>
            ))}
          </div>

          {/* Brand Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold mb-4">BRAND INFORMATION</h2>
            <h3 className="font-medium">Eagle Scissors</h3>
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
                <img src="https://cdn1.iconfinder.com/data/icons/simplicity-payment-methods/512/direct_debit-128.png" alt="Bank Transfer" className="w-full h-full object-contain scale-150" />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-4 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span>© 2025, Eagle Scissors</span>
              {/*<a href="#" className="hover:text-gray-300">Powered by Shopify</a>*/}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <a href="#" className="hover:text-gray-300">Refund policy</a>
              <a href="#" className="hover:text-gray-300">Privacy policy</a>
              <a href="#" className="hover:text-gray-300">Terms of service</a>
              <a href="#" className="hover:text-gray-300">Shipping policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;