import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMoolContext } from '../context/MoolContext';
import axios from 'axios';

const Shop = () => {
  const { addToCart, user } = useMoolContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [products, setProducts] = useState([]); // ✅ from backend
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['All', 'Puja', 'Puja Items'];

  // ✅ FETCH PRODUCTS
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

  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">

        {/* SEARCH + SORT */}
        <div className="flex gap-4 mb-8">
          <input
            placeholder="Search..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="border p-2"
          />

          <select onChange={e => setSortBy(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div
              key={product._id}
              className="border p-4 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-40 w-full object-cover"
              />

              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <button
                onClick={(e) => handleAddToCart(e, product)}
                className="bg-green-600 text-white px-4 py-2 mt-2"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Shop;
