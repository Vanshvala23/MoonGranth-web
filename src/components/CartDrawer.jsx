import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMoolContext } from '../context/MoolContext'; // <--- Import Context

const CartDrawer = () => {
  const navigate = useNavigate();
  
  // Get all cart data and actions from global context
  const { 
    isCartOpen, 
    toggleCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart 
  } = useMoolContext();

  // --- Scroll Locking Logic ---
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  // Calculate Total Safely
  const total = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.toString().replace(/[^0-9]/g, '')) || 0;
    return sum + (price * item.quantity);
  }, 0);

  // If closed, return nothing (or null)
  if (!isCartOpen) return null;

  const handleCheckout = () => {
    toggleCart(); // Close drawer
    navigate('/checkout'); // Go to checkout page
  };

  return (
    <div className="relative z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/60 transition-opacity backdrop-blur-sm"
        onClick={toggleCart}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-brand-cream shadow-2xl transition-transform border-l border-brand-green/20">

          <div className="flex h-full flex-col bg-brand-cream">
            
            {/* Header */}
            <div className="flex items-start justify-between px-4 py-6 border-b border-brand-green/10 bg-white/50">
              <h2 className="text-xl font-serif font-bold text-brand-dark">Your Cart ({cartItems.length})</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-brand-dark">Your cart is empty</p>
                    <p className="text-sm text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={() => { toggleCart(); navigate('/shop'); }} 
                    className="text-brand-saffron font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cartItems.map((item) => {
                    const unitPrice = parseInt(item.price.toString().replace(/[^0-9]/g, '')) || 0;
                    const itemTotal = unitPrice * item.quantity;

                    return (
                      <li key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        {/* Image */}
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-100">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h3 className="text-base font-bold text-brand-dark font-serif">{item.name}</h3>
                              <p className="text-base font-bold text-brand-green">₹{itemTotal}</p>
                            </div>
                            <p className="mt-1 text-xs text-brand-earth uppercase tracking-wide">
                              {item.category} • <span className="text-gray-400">@ {item.price}/unit</span>
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 border-r border-gray-300 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sm font-bold text-brand-dark w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100 border-l border-gray-300"
                              >
                                +
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs font-medium text-red-500 hover:text-red-700 underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer / Checkout Button */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                  <p>Subtotal</p>
                  <p className="text-xl font-bold text-brand-green">₹{total}</p>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 mb-6">
                  Shipping calculated at checkout. Bulk orders may require separate invoice.
                </p>
                <button
                  onClick={handleCheckout} 
                  className="w-full flex items-center justify-center rounded-xl border border-transparent bg-brand-green px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-brand-dark transition-all duration-300 hover:shadow-lg"
                >
                  Proceed to Checkout (₹{total})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;