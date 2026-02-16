import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMoolContext } from '../context/MoolContext';
import axios from 'axios';
import { Search, ShoppingCart, Filter, X, SlidersHorizontal, Grid3x3, List, Package, TruckIcon, Shield } from 'lucide-react';

// Helper function for fallback images
const getFallbackImage = (productName) => {
  const encodedName = encodeURIComponent(productName || 'Product');
  return `https://placehold.co/400x400/f97316/white?text=${encodedName}`;
};

const Shop = () => {
  const { addToCart, user } = useMoolContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = ['All', 'Puja', 'Puja Items'];

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://moon-granth-backend.vercel.app/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // FILTER
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    if (sortBy === 'nameAZ') return a.name.localeCompare(b.name);
    if (sortBy === 'nameZA') return b.name.localeCompare(a.name);
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    if (!user) {
      alert("Please login first");
      return navigate('/login', { state: { from: location } });
    }

    if (product.stock === 0) {
      alert("Product is out of stock");
      return;
    }

    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
      stock: product.stock
    });

    alert("Added to cart!");
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
    setPriceRange([0, 10000]);
    setSortBy('featured');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in-up">
              Sacred Shop
            </h1>
            <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto animate-fade-in-up delay-100">
              Discover authentic spiritual products for your puja, meditation, and daily rituals
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-200">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <TruckIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Package className="w-5 h-5" />
                <span className="text-sm font-medium">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* FILTERS & SEARCH BAR */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Top Row: Search, Sort, View Toggle */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            
            {/* SEARCH */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* SORT & FILTERS */}
            <div className="flex items-center gap-3 w-full lg:w-auto">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="flex-1 lg:flex-none px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="nameAZ">Name: A-Z</option>
                <option value="nameZA">Name: Z-A</option>
                <option value="newest">Newest First</option>
              </select>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-orange-500 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>

              {/* View Mode Toggle */}
              <div className="hidden sm:flex gap-2 border-2 border-gray-200 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex flex-wrap gap-3 mb-4">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* PRICE RANGE FILTER */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-semibold text-gray-700">Price Range</label>
                <span className="text-sm text-gray-600">
                  ₹{priceRange[0]} - ₹{priceRange[1]}
                </span>
              </div>
              <div className="flex gap-4">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Clear Filters */}
            {(activeCategory !== 'All' || searchQuery || priceRange[0] !== 0 || priceRange[1] !== 10000) && (
              <button
                onClick={clearFilters}
                className="mt-4 text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-orange-600">{sortedProducts.length}</span> of{' '}
            <span className="font-semibold">{products.length}</span> products
          </p>
        </div>

        {/* PRODUCTS GRID/LIST */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="bg-orange-600 text-white px-6 py-2 rounded-xl hover:bg-orange-700"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 aspect-square">
                  <img
                    src={product.images?.[0] || getFallbackImage(product.name)}
                    alt={product.name}
                    onError={(e) => {
                      if (!imageErrors[product._id]) {
                        setImageErrors(prev => ({ ...prev, [product._id]: true }));
                        e.target.onerror = null;
                        e.target.src = getFallbackImage(product.name);
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      New
                    </div>
                  )}
                  {product.stock < 10 && product.stock > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Only {product.stock} left
                    </div>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  {product.category && (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                      {product.category}
                    </span>
                  )}
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{product.price?.toLocaleString() || product.price}
                    </p>
                  </div>

                  {/* ADD TO CART BUTTON */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    disabled={product.stock === 0}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 hover:shadow-lg transform hover:-translate-y-0.5'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-4">
            {sortedProducts.map(product => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group flex"
              >
                <div className="w-48 h-48 relative overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 flex-shrink-0">
                  <img
                    src={product.images?.[0] || getFallbackImage(product.name)}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(product.name);
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      New
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {product.category && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
                        {product.category}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 mt-2 group-hover:text-orange-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-3xl font-bold text-orange-600">
                      ₹{product.price?.toLocaleString() || product.price}
                    </p>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={product.stock === 0}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        product.stock === 0
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-700 hover:to-amber-700 hover:shadow-lg'
                      }`}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;