import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoolContext } from '../context/MoolContext';
import axios from 'axios';

// Sub-component for individual card
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, user } = useMoolContext();

  const handleView = () => {
    navigate(`/product/${product._id}`);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (user) {
      addToCart(product);
    } else {
      alert("Please log in to add items to your cart.");
      navigate('/login', { state: { from: { pathname: '/' } } });
    }
  };

  // ✅ Use first image from the array, fallback to placeholder
  const imageSrc = product.images && product.images.length > 0
    ? product.images[0]
    : "/no-image.png";

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      
      {/* Image */}
      <div 
        className="h-64 w-full overflow-hidden bg-gray-200 relative cursor-pointer"
        onClick={handleView}
      >
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          onError={(e)=> { e.target.src = "/no-image.png"; }}
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-brand-saffron text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full shadow-md z-10">
            NEW
          </span>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-bold tracking-wide text-brand-earth uppercase">{product.category}</p>
          <p className="text-lg font-serif font-bold text-brand-green">₹{product.price}</p>
        </div>

        <div onClick={handleView} className="cursor-pointer">
          <h3 className="text-lg font-serif font-bold text-brand-dark leading-tight mb-2 group-hover:text-brand-green transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
            {product.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-brand-green text-white px-4 py-3 rounded-xl font-medium shadow-md hover:bg-brand-dark hover:shadow-lg active:scale-95 transition-all duration-200 group/btn"
          >
            Add to Cart
          </button>

          <button 
            onClick={(e) => {
               e.stopPropagation();
               navigate('/contact');
            }}
            className="w-full text-xs font-bold text-brand-earth hover:text-brand-saffron transition-colors uppercase tracking-wider py-2 border-t border-gray-100 mt-1"
          >
            Request Bulk Quote (B2B)
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Section
const ProductSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://moon-granth-backend.vercel.app/api/products'); // Replace with your backend endpoint
        setProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading products...
      </div>
    );
  }

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-brand-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center opacity-0-start">
          <h2 className="text-base font-semibold text-brand-saffron tracking-wide uppercase">Our Collection</h2>
          <p className="mt-1 text-4xl font-extrabold text-brand-dark sm:text-5xl sm:tracking-tight lg:text-6xl font-serif">
            Sacred Offerings
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Handcrafted products sourced from indigenous cows, designed to purify your home and spirit.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-y-10 gap-x-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product._id} 
              className="opacity-0-start h-full"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
