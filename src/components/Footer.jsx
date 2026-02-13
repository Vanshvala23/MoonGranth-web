import React from 'react';
import { Link } from 'react-router-dom'; // <--- Import Link for routing

const Footer = () => {
  return (
    <footer className="bg-brand-green text-white mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand Info */}
          <div>
            <span className="text-2xl font-serif font-bold">MOOL GRANTH</span>
            <p className="mt-4 text-brand-cream/80 text-sm leading-relaxed">
              Connecting you to the divine through sustainable, cow-based products.
              Made with love and devotion.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-brand-saffron tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/shop" className="text-base text-gray-100 hover:text-brand-saffron transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-base text-gray-100 hover:text-brand-saffron transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-100 hover:text-brand-saffron transition-colors">
                  Bulk / Export Inquiry
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-base text-gray-100 hover:text-brand-saffron transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-sm font-semibold text-brand-saffron tracking-wider uppercase">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-brand-cream">support@moolgranth.com</span>
              </li>
              <li className="flex items-center gap-2">
                 <svg className="w-5 h-5 text-brand-saffron" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-brand-cream">+91 98765 43210</span>
              </li>
              <li>
                <p className="text-xs text-brand-cream/60 mt-4">
                  © {new Date().getFullYear()} Mool Granth. All rights reserved.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;