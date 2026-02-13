import React, { useState, useEffect } from "react";
import { useMoolContext } from "../context/MoolContext";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios"; // Axios instance with token interceptor

const MyAccount = () => {
  const { user, logout } = useMoolContext();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("orders");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [orders, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
    else {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user, navigate]);

  // Fetch Orders
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const res = await api.get(`/orders/${user.phone}`);
        setOrders(res.data || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Fetch Cart
  useEffect(() => {
    if (!user) return;

    const fetchCart = async () => {
      try {
        setLoadingCart(true);
        const res = await api.get(`/cart/user/${user._id}`);
        setCartItems(res.data?.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
        setCartItems([]);
      } finally {
        setLoadingCart(false);
      }
    };

    fetchCart();
  }, [user]);

  // Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${user._id}`, formData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      alert("Failed to update profile");
    }
  };

  // Remove item from cart
  const handleRemoveCartItem = async (productId) => {
    try {
      const res = await api.delete(`/cart/${productId}`);
      setCartItems(res.data?.items || []);
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item from cart");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-brand-cream py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-brand-green rounded-2xl shadow-xl p-8 mb-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif font-bold">Namaste, {user.name}</h1>
            <p className="text-brand-cream/80 mt-1">Welcome to your personal dashboard.</p>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-all"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Tabs */}
          <div className="md:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === "orders"
                  ? "bg-white text-brand-green shadow-md"
                  : "text-gray-500 hover:bg-white/50"
              }`}
            >
              📦 My Orders
            </button>
            <button
              onClick={() => setActiveTab("cart")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === "cart"
                  ? "bg-white text-brand-green shadow-md"
                  : "text-gray-500 hover:bg-white/50"
              }`}
            >
              🛒 My Cart
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === "profile"
                  ? "bg-white text-brand-green shadow-md"
                  : "text-gray-500 hover:bg-white/50"
              }`}
            >
              👤 Edit Profile
            </button>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
                <h2 className="text-xl font-bold text-brand-dark mb-6">Order History</h2>
                {loadingOrders ? (
                  <div className="text-center py-12 text-gray-400">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>You haven't placed any orders yet.</p>
                    <button
                      onClick={() => navigate("/shop")}
                      className="mt-4 text-brand-green font-bold underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-xs font-bold text-gray-400 uppercase">
                              Order ID
                            </span>
                            <p className="font-mono font-bold text-brand-dark">{order._id}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-bold text-gray-400 uppercase">
                              Total
                            </span>
                            <p className="font-bold text-brand-green">₹{order.total}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Cart Tab */}
            {activeTab === "cart" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[400px]">
                <h2 className="text-xl font-bold text-brand-dark mb-6">My Cart Items</h2>
                {loadingCart ? (
                  <div className="text-center py-12 text-gray-400">Loading cart...</div>
                ) : cartItems.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">
                    <p>Your cart is empty.</p>
                    <button
                      onClick={() => navigate("/shop")}
                      className="mt-4 text-brand-green font-bold underline"
                    >
                      Go Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow flex justify-between items-center"
                      >
                        <div>
                          <p className="font-bold">{item.product?.name}</p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-bold text-green-700">
                            ₹{item.product?.price}
                          </p>
                          <button
                            onClick={() => handleRemoveCartItem(item.product._id)}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs hover:bg-red-200 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-brand-dark mb-6">Edit Profile</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-6 max-w-md">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border-gray-300 focus:ring-brand-green focus:border-brand-green"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      disabled
                      className="w-full rounded-lg border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Mobile number cannot be changed.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg border-gray-300 focus:ring-brand-green focus:border-brand-green"
                      placeholder="Add your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-dark transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
