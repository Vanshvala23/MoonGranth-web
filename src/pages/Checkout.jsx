import React, { useState } from 'react';
import { useMoolContext } from '../context/MoolContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, placeOrder, user } = useMoolContext();
  const navigate = useNavigate();

  // --- 1. Initialize Form with User Data ---
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '', 
    address: '',
    city: '',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  // --- 2. Calculate Totals ---
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseInt(String(item.price).replace(/[^0-9]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0);
  
  const shipping = subtotal > 499 ? 0 : 40;
  const total = subtotal + shipping;

  // --- 3. Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Payment Validation
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
        alert("Please enter valid card details.");
        return;
      }
    }
    if (paymentMethod === 'upi' && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }

    // Order Object
    const orderData = {
      items: cartItems,
      total: total,
      shipping: formData,
      payment: { 
        method: paymentMethod, 
        details: paymentMethod === 'card' ? '**** ' + cardDetails.number.slice(-4) : (paymentMethod === 'upi' ? upiId : 'COD')
      },
      customer: user ? { id: user.phone, name: user.name } : 'Guest'
    };

    placeOrder(orderData);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-brand-cream">
        <h2 className="text-2xl font-bold text-brand-dark mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/shop')} className="text-brand-green font-bold underline">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/shop')} className="flex items-center text-sm text-gray-500 hover:text-brand-green mb-8">
          ← Back to Shop
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          
          {/* LEFT COLUMN: FORM */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8">1. Shipping Information</h2>
            
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">First name</label>
                  <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 px-4" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Last name</label>
                  <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 px-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mobile Number</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-bold">+91</span>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 pl-12 pr-4 bg-gray-50" placeholder="98765 43210" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 px-4" />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Address</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 px-4" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 px-4" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Pincode</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-brand-green focus:ring-brand-green py-3 px-4" />
                </div>
              </div>

              {/* PAYMENT SECTION */}
              <div className="pt-8">
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">2. Payment Method</h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {['upi', 'card', 'cod'].map((method) => (
                    <div 
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${
                        paymentMethod === method 
                          ? 'border-brand-green bg-brand-green/5 ring-1 ring-brand-green' 
                          : 'border-gray-200 hover:border-brand-green/50'
                      }`}
                    >
                      <p className="font-bold uppercase text-sm text-brand-dark">{method}</p>
                    </div>
                  ))}
                </div>

                {/* Conditional Payment Fields */}
                <div className="p-6 bg-white border border-gray-200 rounded-xl animate-fade-in shadow-sm">
                  {paymentMethod === 'upi' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">UPI ID / VPA</label>
                      <input 
                        type="text" 
                        placeholder="username@okaxis" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full rounded-md border-gray-300 py-2 px-3 text-sm focus:ring-brand-green focus:border-brand-green" 
                      />
                      <p className="text-xs text-gray-400 mt-2">Open your UPI app to approve the request after clicking "Place Order".</p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          maxLength="19"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          className="w-full rounded-md border-gray-300 py-2 px-3 text-sm focus:ring-brand-green focus:border-brand-green" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            maxLength="5"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                            className="w-full rounded-md border-gray-300 py-2 px-3 text-sm focus:ring-brand-green focus:border-brand-green" 
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">CVV</label>
                          <input 
                            type="password" 
                            placeholder="123" 
                            maxLength="3"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                            className="w-full rounded-md border-gray-300 py-2 px-3 text-sm focus:ring-brand-green focus:border-brand-green" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="text-center py-2">
                      <p className="text-sm font-bold text-brand-dark">Cash on Delivery</p>
                      <p className="text-xs text-gray-500 mt-1">Please pay ₹{total} to the delivery agent upon receiving your order.</p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-2xl font-serif font-bold text-brand-dark mb-8">Order Summary</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <ul className="divide-y divide-gray-100 max-h-60 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <li key={item.id || index} className="py-4 flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="font-serif text-sm">{item.name}</h3>
                        <p className="ml-4 font-mono text-sm">{item.price}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Qty {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t border-gray-100 pt-6 mt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>₹{subtotal}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p className={shipping === 0 ? 'text-green-600 font-bold' : ''}>
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </p>
                </div>
                <div className="flex justify-between text-xl font-bold text-brand-dark border-t border-gray-100 pt-4">
                  <p>Total</p>
                  <p>₹{total}</p>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                className="w-full mt-8 bg-brand-dark text-white font-bold py-4 rounded-xl shadow-lg hover:bg-brand-green transition-all transform active:scale-95"
              >
                Pay ₹{total} & Place Order
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
