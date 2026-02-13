import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useMoolContext } from "../context/MoolContext";
import api from "../utils/axios"; // Axios instance with token

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

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    { user: "Aditi S.", text: "Absolutely divine." },
    { user: "Rahul M.", text: "Authentic Vedic feeling." },
  ]);

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get product by ID
        const res = await api.get(`/products/${id}`);
        const prod = res.data;
        setProduct(prod);
        setMainImage(prod.images?.[0] || "/no-image.png");

        // 2️⃣ Get related products
        const all = await api.get("/products");
        const related = all.data
          .filter(p => p.category === prod.category && p._id !== prod._id)
          .slice(0, 3);
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

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!product) return <div className="p-20 text-center">Product not found</div>;

  // ================= ADD TO CART API =================
  const addToCartAPI = async () => {
    if (!user) {
      alert("Login required");
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      await api.post("/cart", { productId: product._id, quantity });
      contextAddToCart(product, quantity); // Update frontend context/cart
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
    setReviews([{ user: user?.name || "User", text: reviewText }, ...reviews]);
    setShowReviewForm(false);
    setReviewText("");
  };

  return (
    <div className="bg-brand-cream min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-12">
        {/* LEFT IMAGE */}
        <div>
          <div className="relative rounded-xl overflow-hidden border">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                onClick={() => setMainImage(img)}
                className="w-20 h-20 object-cover cursor-pointer border rounded"
              />
            ))}
          </div>
        </div>

        {/* RIGHT INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-2xl text-green-700 font-bold mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border"
            >-</button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border"
            >+</button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={addToCartAPI}
              className="bg-green-600 text-white px-6 py-3 rounded"
            >Add to Cart</button>

            <button
              onClick={handleBuyNow}
              className="bg-yellow-500 px-6 py-3 rounded"
            >Buy Now</button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>

        {!showReviewForm ? (
          <button
            onClick={() => setShowReviewForm(true)}
            className="border px-4 py-2 mb-6"
          >Write Review</button>
        ) : (
          <form onSubmit={handleSubmitReview}>
            <textarea
              required
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              className="border w-full p-3 mb-3"
            />
            <button className="bg-green-600 text-white px-5 py-2">Submit</button>
          </form>
        )}

        {reviews.map((r, i) => (
          <div key={i} className="border p-4 mb-4">
            <b>{r.user}</b>
            <p>{r.text}</p>
          </div>
        ))}
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto mt-20">
          <h2 className="text-2xl font-bold mb-8 text-center">Related Products</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedProducts.map(p => (
              <div
                key={p._id}
                onClick={() => navigate(`/product/${p._id}`)}
                className="border rounded p-4 cursor-pointer"
              >
                <img
                  src={p.images?.[0] || "/no-image.png"}
                  className="h-48 w-full object-cover mb-3"
                  alt={p.name}
                />
                <h3>{p.name}</h3>
                <p className="text-green-700 font-bold">₹{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
