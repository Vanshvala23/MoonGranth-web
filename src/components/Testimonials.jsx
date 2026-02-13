import React from 'react';
import { testimonials } from '../data/data'; // <--- Import from central data

const Testimonials = () => {
  return (
    <div className="bg-brand-cream py-20 border-t border-brand-earth/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header - Animated */}
        <div className="text-center mb-16 opacity-0-start">
          <h2 className="text-3xl font-serif font-bold text-brand-dark">Loved by Devotees</h2>
        </div>
        
        {/* Grid - Animated Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow opacity-0-start" 
              style={{ animationDelay: `${idx * 150}ms` }} // Staggered delay
            >
              <div className="flex text-brand-saffron mb-4">★★★★★</div>
              <p className="text-gray-600 italic mb-6">"{review.text}"</p>
              
              <div className="flex items-center gap-3">
                {/* Author Avatar (Using Image from Data) */}
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                   <img src={review.image} alt={review.name} className="w-full h-full object-cover" />
                </div>
                
                {/* Author Info */}
                <div>
                  <p className="font-bold text-brand-dark text-sm">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;