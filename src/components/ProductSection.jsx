import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoolContext } from '../context/MoolContext';
import axios from 'axios';
import { ShoppingCart, Package } from 'lucide-react';

// Helper function for fallback images
const getFallbackImage = (productName) => {
  const encodedName = encodeURIComponent(productName || 'Product');
  return `https://placehold.co/400x400/f97316/white?text=${encodedName}`;
};

// Sub-component for individual card
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, user } = useMoolContext();
  const [imageError, setImageError] = useState(false);

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

  // Get image with fallback
  const imageSrc = product.images && product.images.length > 0
    ? product.images[0]
    : getFallbackImage(product.name);

  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      
      {/* Image */}
      <div 
        className="h-64 w-full overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 relative cursor-pointer"
        onClick={handleView}
      >
        <img
          src={imageSrc}
          alt={product.name}
          className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          onError={(e) => { 
            if (!imageError) {
              setImageError(true);
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = getFallbackImage(product.name);
            }
          }}
        />
        
        {/* Badges */}
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-pulse">
            NEW
          </span>
        )}
        
        {product.stock < 10 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
            Only {product.stock} left
          </span>
        )}

        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
            <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-bold">
              Out of Stock
            </span>
          </div>
        )}
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-bold tracking-wide text-orange-700 uppercase bg-orange-50 px-2 py-1 rounded">
            {product.category}
          </p>
          <p className="text-xl font-bold text-orange-600">
            ₹{product.price?.toLocaleString() || product.price}
          </p>
        </div>

        <div onClick={handleView} className="cursor-pointer flex-1">
          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {product.description || 'Premium quality product for your spiritual needs.'}
          </p>
        </div>

        {/* Stock Info */}
        {product.stock > 0 && (
          <div className="mb-3">
            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
              <Package className="w-3 h-3" />
              In Stock ({product.stock} available)
            </p>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-4 py-3 rounded-xl font-semibold shadow-md hover:from-orange-700 hover:to-amber-700 hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          <button 
            onClick={(e) => {
               e.stopPropagation();
               navigate('/contact');
            }}
            className="w-full text-xs font-semibold text-orange-700 hover:text-orange-600 transition-colors uppercase tracking-wider py-2 border-t border-gray-100"
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://moon-granth-backend.vercel.app/api/products');
        setProducts(res.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading our sacred collection...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="flex flex-col justify-center items-center text-center px-4">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center opacity-0-start">
          <h2 className="text-base font-semibold text-orange-600 tracking-wide uppercase">
            Our Collection
          </h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Sacred Offerings
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-600">
            Handcrafted products sourced from indigenous cows, designed to purify your home and spirit.
          </p>
        </div>

        {/* Grid */}
        {featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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
        )}

        {/* View All Button */}
        {products.length > 4 && (
          <div className="text-center mt-12 opacity-0-start" style={{ animationDelay: '600ms' }}>
            <button
              onClick={() => window.location.href = '/shop'}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:from-orange-700 hover:to-amber-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;