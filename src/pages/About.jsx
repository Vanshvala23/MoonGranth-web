import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-brand-cream min-h-screen font-sans animate-fade-in">
      
      {/* 1. HERO SECTION: IMMERSIVE PARALLAX STYLE */}
      <div className="relative py-32 bg-brand-green overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1545559053-1c3902a7b233?auto=format&fit=crop&q=80&w=1600" 
            alt="Indian Cow in nature" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/80 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="block text-brand-saffron font-bold tracking-widest uppercase text-sm mb-4">Est. 2026</span>
          <h1 className="text-5xl font-serif font-bold text-white tracking-wide sm:text-6xl mb-6">
            Mool Granth
          </h1>
          <p className="mt-4 text-2xl text-brand-cream font-light max-w-3xl mx-auto leading-relaxed">
            "Returning to the Root." <br/>
            Bridging ancient Vedic wisdom with modern sustainable technology.
          </p>
        </div>
      </div>

      {/* 2. THE DEEP DIVE STORY */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Column: Text */}
          <div className="lg:col-span-7 opacity-0-start delay-200">
            <h2 className="text-brand-saffron font-bold uppercase tracking-widest text-sm mb-3">Our Origin</h2>
            <h3 className="text-4xl font-serif font-bold text-brand-dark mb-8">Why We Exist</h3>
            
            <div className="prose prose-lg text-gray-600 space-y-6 text-justify">
              <p>
                In an era of artificial fragrances and chemical substitutes, the sanctity of our daily rituals has diminished. The ancient texts <strong>(Granths)</strong> speak of the profound purificatory power of <em>Panchgavya</em>—the five sacred gifts from the indigenous Indian Cow (Desi Gau).
              </p>
              <p>
                Mool Granth was born from a desire to reclaim that purity. We realized that true spirituality cannot coexist with synthetic chemicals. When you light a Havan Cup, you are not just burning incense; you are performing a mini-yagna, purifying the atmosphere and your own consciousness.
              </p>
              <p>
                Our name, <strong>"Mool Granth"</strong>, signifies our commitment to the original scriptures. We do not innovate; we preserve. We strictly source raw materials from local Gaushalas that care for non-milking, old, and indigenous cows, ensuring that your devotion supports their protection.
              </p>
            </div>
            
            {/* Signature / Quote */}
            <div className="mt-10 border-l-4 border-brand-green pl-6 italic text-gray-700">
              "We believe that a product is only as pure as the intention behind it. Every item here is hand-crafted with the chanting of mantras."
            </div>
          </div>

          {/* Right Column: Image Grid */}
          <div className="lg:col-span-5 mt-12 lg:mt-0 space-y-6 opacity-0-start delay-300">
             <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1605218427360-1437146e2552?auto=format&fit=crop&q=80&w=800" 
                 alt="Vedic Rituals" 
                 className="w-full h-64 object-cover"
               />
             </div>
             <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
               <img 
                 src="https://images.unsplash.com/photo-1599827670987-da113d077b96?auto=format&fit=crop&q=80&w=800" 
                 alt="Making Process" 
                 className="w-full h-64 object-cover"
               />
             </div>
          </div>
        </div>
      </div>

      {/* 3. PLATFORM FEATURES (THE TECHNICAL SHOWCASE) */}
      <div className="bg-brand-dark py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 opacity-0-start">
            <h2 className="text-brand-saffron font-bold uppercase tracking-widest text-sm mb-2">Platform Capabilities</h2>
            <h3 className="text-3xl font-serif font-bold text-white">Modern Tech for Ancient Tradition</h3>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              We have built a state-of-the-art e-commerce experience to ensure that accessing these sacred items is seamless, secure, and transparent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-brand-saffron/50 transition-colors opacity-0-start delay-100">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Smart Search & Filter</h4>
              <p className="text-gray-400 text-sm">
                Instantly find what you need. Filter products by categories like Rituals, Eco-Fuel, or Gardening, or use our real-time search engine.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-brand-saffron/50 transition-colors opacity-0-start delay-200">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Dynamic Cart System</h4>
              <p className="text-gray-400 text-sm">
                A persistent slide-over cart that remembers your selection. Features auto-deduplication, real-time total calculation, and quantity management.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-brand-saffron/50 transition-colors opacity-0-start delay-300">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Secure Checkout Flow</h4>
              <p className="text-gray-400 text-sm">
                A multi-step checkout process that adapts to your payment choice. Whether you choose UPI, Card, or COD, the form dynamically adjusts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-brand-saffron/50 transition-colors opacity-0-start delay-400">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-3">User Roles & Security</h4>
              <p className="text-gray-400 text-sm">
                Dedicated interfaces for Customers and Admins. Protected routes ensure that sensitive business data is accessible only to authorized personnel.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-brand-saffron/50 transition-colors opacity-0-start delay-500">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Admin Dashboard</h4>
              <p className="text-gray-400 text-sm">
                A powerful backend view for business owners to track real-time revenue, view order history, monitor shipment status, and analyze customer trends.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white/5 p-8 rounded-xl border border-white/10 hover:border-brand-saffron/50 transition-colors opacity-0-start delay-600">
              <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <h4 className="text-xl font-bold mb-3">Responsive Design</h4>
              <p className="text-gray-400 text-sm">
                Built with a "Mobile-First" approach using Tailwind CSS. The interface adapts fluidly from desktops to smartphones.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* 4. THE PROMISE (Values) */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center opacity-0-start">
          <h2 className="text-3xl font-serif font-bold text-brand-dark mb-12">The Mool Granth Promise</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-brand-cream/30 rounded-2xl border border-brand-green/10">
              <span className="text-5xl mb-4 block">🌿</span>
              <h4 className="text-xl font-bold text-brand-dark mb-2">100% Indigenous</h4>
              <p className="text-gray-600">Strictly using by-products from Desi Cows, supporting local Gaushalas.</p>
            </div>
            <div className="p-8 bg-brand-cream/30 rounded-2xl border border-brand-green/10">
              <span className="text-5xl mb-4 block">✨</span>
              <h4 className="text-xl font-bold text-brand-dark mb-2">Chemical Free</h4>
              <p className="text-gray-600">No charcoal, no artificial fragrances. Just pure herbs and nature.</p>
            </div>
            <div className="p-8 bg-brand-cream/30 rounded-2xl border border-brand-green/10">
              <span className="text-5xl mb-4 block">♻️</span>
              <h4 className="text-xl font-bold text-brand-dark mb-2">Sustainable</h4>
              <p className="text-gray-600">Plastic-free packaging. Our products return to the earth as manure.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CTA SECTION */}
      <div className="py-20 bg-brand-cream text-center opacity-0-start">
        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-6">Experience purity in every click.</h2>
        <div className="flex justify-center gap-4">
          <Link 
            to="/shop"
            className="px-8 py-4 bg-brand-green text-white text-lg font-bold rounded-xl hover:bg-brand-dark shadow-lg transition-all transform hover:-translate-y-1"
          >
            Explore Products
          </Link>
          <Link 
            to="/"
            className="px-8 py-4 bg-white text-brand-green border-2 border-brand-green text-lg font-bold rounded-xl hover:bg-brand-green hover:text-white shadow-lg transition-all"
          >
            Back Home
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;