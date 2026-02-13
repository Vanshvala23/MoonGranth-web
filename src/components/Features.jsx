import React from 'react';
import { features } from '../data/data'; // <--- Import from central data file

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="lg:text-center opacity-0-start">
          <h2 className="text-base text-brand-saffron font-semibold tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl leading-8 font-serif font-extrabold tracking-tight text-brand-dark sm:text-4xl">
            Purity in Every Grain
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We don't just sell products; we preserve a tradition. Every item connects you back to your roots.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature, index) => (
              <div 
                key={feature.name} 
                className="relative opacity-0-start" // Animation Class
                style={{ animationDelay: `${index * 200}ms` }} // Staggered Delay for nice effect
              >
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-brand-green text-white">
                    {/* The icon is now coming directly from your data.jsx file */}
                    {feature.icon}
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-brand-dark font-serif">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;