import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMoolContext } from '../context/MoolContext';
import axios from 'axios';
import { Search, ShoppingCart, Filter, X } from 'lucide-react';

const Shop = () => {
  const { addToCart, user } = useMoolContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Puja', 'Puja Items'];

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // SORT
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'lowToHigh') return a.price - b.price;
    if (sortBy === 'highToLow') return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login first");
      return navigate('/login', { state: { from: location } });
    }
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0],
    });
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
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sacred Shop</h1>
          <p className="text-lg text-orange-100 max-w-2xl">
            Discover authentic spiritual products for your puja and meditation needs
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* FILTERS & SEARCH BAR */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
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

            {/* SORT */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white cursor-pointer transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap gap-3 mt-6">
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
        </div>

        {/* RESULTS COUNT */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-orange-600">{sortedProducts.length}</span> products
          </p>
        </div>

        {/* PRODUCTS GRID */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square">
                  <img
                    src={product.images?.[0] || '/no-image.png'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400/F97316/FFFFFF?text=No+Image';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{product.price.toLocaleString()}
                    </p>
                    {product.category && (
                      <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    )}
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
        )}
      </div>
    </div>
  );
};

export default Shop;