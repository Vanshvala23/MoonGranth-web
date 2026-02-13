import React from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Import Hook
import logo from '../assets/logo.jpg' // <--- Import Logo

const Hero = () => {
  const navigate = useNavigate(); // <--- Initialize Hook

  return (
    <div className="relative bg-brand-cream overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-brand-cream sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          {/* Internal Hero Nav */}
          <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start pt-6 px-4">
             <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-green/20 shadow-sm">
                  <img src={logo} alt="Mool Granth" className="w-full h-full object-cover" />
                </div>
                <span className="font-serif text-2xl font-bold text-brand-green">Mool Granth</span>
             </div>
          </nav>

          {/* MAIN HERO CONTENT - Animated */}
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left opacity-0-start">
              <h1 className="text-4xl tracking-tight font-extrabold text-brand-dark sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Pure Cow Dung,</span>{' '}
                <span className="block text-brand-saffron xl:inline">Pure Devotion</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Authentic Vedic products for your rituals and sustainable living. Sourced directly from indigenous cows, crafted with care.
              </p>
              
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                {/* Primary Button -> Shop */}
                <div className="rounded-md shadow">
                  <button 
                    onClick={() => navigate('/shop')} // <--- Navigate to Shop
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-green hover:bg-opacity-90 md:py-4 md:text-lg transition duration-300"
                  >
                    Browse Products
                  </button>
                </div>

                {/* Secondary Button -> Contact */}
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button 
                    onClick={() => navigate('/contact')} // <--- Navigate to Contact
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-green bg-brand-cream border-brand-green hover:bg-brand-earth hover:text-white md:py-4 md:text-lg transition duration-300"
                  >
                    Bulk Inquiry
                  </button>
                </div>
              </div>

            </div>
          </main>
        </div>
      </div>
      
      {/* Hero Image Section */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full animate-fade-in"
          src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=1600"
          alt="Vedic Ritual Havan"
        />
      </div>
    </div>
  );
};

export default Hero;