import React from 'react';

// Import all sub-sections
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductSection from '../components/ProductSection';
import RitualGuide from '../components/RitualGuide';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section (Top Banner) */}
      <Hero />

      {/* 2. Key Features (Icons) */}
      <Features />

      {/* 3. Product Showcase */}
      <ProductSection />

      {/* 4. Ritual/How-to Guide */}
      <RitualGuide />

      {/* 5. Customer Reviews */}
      <Testimonials />
    </div>
  );
};

export default Home;