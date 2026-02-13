import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-serif font-bold text-brand-green/20">404</h1>
      <h2 className="text-3xl font-serif font-bold text-brand-dark mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 max-w-md mx-auto">
        The path you are looking for has been lost in the sands of time (or just doesn't exist).
      </p>
      <Link 
        to="/" 
        className="mt-8 px-8 py-3 bg-brand-green text-white font-bold rounded-xl shadow-lg hover:bg-brand-dark transition-all transform hover:-translate-y-1"
      >
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;