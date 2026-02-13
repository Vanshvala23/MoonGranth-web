import React from 'react';
import image from "../assets/Cups.jpg";

const steps = [
  { id: '01', title: 'Light the Shell', text: 'Hold the cup over a flame until the rim glows red.' },
  { id: '02', title: 'Place Carefully', text: 'Set it on the provided copper plate or heat-safe surface.' },
  { id: '03', title: 'Feel the Peace', text: 'Allow the smoke to purify your space and calm your mind.' },
];

const RitualGuide = () => {
  return (
    <div className="bg-brand-green py-20 text-brand-cream overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Text Content - Animated */}
          <div className="opacity-0-start delay-100">
            <h2 className="text-brand-saffron font-bold tracking-wide uppercase text-sm mb-2">Daily Practice</h2>
            <h3 className="text-4xl font-serif font-bold text-white mb-6">How to use our Havan Cups</h3>
            <p className="text-brand-cream/80 text-lg mb-10">
              Integrating ancient Vedic wisdom into your modern lifestyle takes just 5 minutes a day.
            </p>
            
            <div className="space-y-8">
              {steps.map((step) => (
                <div key={step.id} className="flex gap-4">
                  <span className="text-5xl font-serif text-brand-earth/50 font-bold">{step.id}</span>
                  <div>
                    <h4 className="text-xl font-bold text-white">{step.title}</h4>
                    <p className="text-brand-cream/70 mt-1">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section - Animated with Delay */}
          <div className="mt-12 lg:mt-0 relative opacity-0-start delay-300">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl border-4 border-brand-earth/30">
               <img 
                 src={image}
                 alt="Meditation Atmosphere" 
                 className="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-700 ease-out"
               />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-saffron rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualGuide;