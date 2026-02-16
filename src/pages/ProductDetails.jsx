import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMoolContext } from "../context/MoolContext";
import api from "../utils/axios";
import { ShoppingCart, Minus, Plus, Star, Package, TruckIcon, Shield, Heart, ChevronLeft, ImageOff } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, addToCart: contextAddToCart } = useMoolContext();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([
    { user: "Aditi S.", text: "Absolutely divine. The fragrance is pure and long-lasting!", rating: 5 },
    { user: "Rahul M.", text: "Authentic Vedic feeling. Perfect for daily puja.", rating: 5 },
    { user: "Priya K.", text: "High quality product. Highly recommend!", rating: 4 },
  ]);

  // ================= HELPER: Generate Fallback Image =================
  const getFallbackImage = (productName) => {
    const encodedName = encodeURIComponent(productName || 'Product');
    return `https://placehold.co/600x600/f97316/white?text=${encodedName}`;
  };

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/products/${id}`);
        const prod = res.data;
        setProduct(prod);
        
        // Set main image with fallback
        const firstImage = prod.images?.[0];
        setMainImage(firstImage || getFallbackImage(prod.name));

        const all = await api.get("/products");
        const related = all.data
          .filter(p => p.category === prod.category && p._id !== prod._id)
          .slice(0, 4);
        setRelatedProducts(related);

        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // ================= ADD TO CART API =================
  const addToCartAPI = async () => {
    if (!user) {
      alert("Login required");
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      await api.post("/cart", { productId: product._id, quantity });
      contextAddToCart(product, quantity);
      alert("Added to cart!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to add to cart");
    }
  };

  const handleBuyNow = async () => {
    await addToCartAPI();
    navigate("/checkout");
  };

  // ================= REVIEWS =================
  const handleSubmitReview = e => {
    e.preventDefault();
    setReviews([
      { user: user?.name || "User", text: reviewText, rating },
      ...reviews
    ]);
    setShowReviewForm(false);
    setReviewText("");
    setRating(5);
  };

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* BREADCRUMB / BACK BUTTON */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Back to Shop</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* LEFT: IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 shadow-xl group">
              {imageError ? (
                <div className="w-full h-[500px] flex flex-col items-center justify-center text-orange-600">
                  <ImageOff className="w-24 h-24 mb-4" />
                  <p className="text-xl font-semibold">{product.name}</p>
                </div>
              ) : (
                <img
                  src={mainImage}
                  alt={product.name}
                  onError={(e) => {
                    console.error("Image failed to load:", mainImage);
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = getFallbackImage(product.name);
                  }}
                  className="w-full h-[500px] object-cover"
                />
              )}
              
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                />
              </button>

              {/* Stock Badge */}
              {product.stock < 10 && product.stock > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Only {product.stock} left!
                </div>
              )}

              {/* New Badge */}
              {product.isNew && (
                <div className="absolute bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  New Arrival
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`View ${i + 1}`}
                    onClick={() => setMainImage(img)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(`${product.name} ${i + 1}`);
                    }}
                    className={`w-24 h-24 object-cover cursor-pointer rounded-xl transition-all ${
                      mainImage === img
                        ? 'ring-4 ring-orange-500 scale-105'
                        : 'ring-2 ring-gray-200 hover:ring-orange-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category && (
              <span className="inline-block bg-gradient-to-r from-orange-100 to-amber-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 font-medium">
                {averageRating} ({reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-6">
              <p className="text-sm text-gray-600 mb-1">Price</p>
              <p className="text-4xl font-bold text-orange-600">
                ₹{product.price?.toLocaleString() || product.price}
              </p>
            </div>

            {/* Stock Info */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Availability:</span>
                <span className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">Product Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {product.description || 'No description available.'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <label className="font-semibold text-gray-800 block mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={product.stock === 0}
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-orange-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={product.stock === 0}
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-orange-100 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addToCartAPI}
                disabled={product.stock === 0}
                className="flex-1 bg-white border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="flex-1 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.stock === 0 ? 'Unavailable' : 'Buy Now'}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <TruckIcon className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Free Shipping</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Secure Payment</p>
              </div>
              <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <Package className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 font-medium">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>
          </div>

          {/* Write Review Button */}
          {!showReviewForm ? (
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700 transition-all mb-8"
            >
              Write a Review
            </button>
          ) : (
            <form onSubmit={handleSubmitReview} className="bg-orange-50 rounded-xl p-6 mb-8">
              <label className="block font-semibold mb-2">Your Rating</label>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <label className="block font-semibold mb-2">Your Review</label>
              <textarea
                required
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none mb-4 min-h-[120px]"
              />
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-700 hover:to-amber-700"
                >
                  Submit Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((r, i) => (
              <div key={i} className="border-2 border-gray-100 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-lg text-gray-900">{r.user}</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-4 h-4 ${
                            starIdx < r.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900">You May Also Like</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <div
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100 aspect-square">
                    <img
                      src={p.images?.[0] || getFallbackImage(p.name)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={p.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getFallbackImage(p.name);
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-2xl font-bold text-orange-600">
                      ₹{p.price?.toLocaleString() || p.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;