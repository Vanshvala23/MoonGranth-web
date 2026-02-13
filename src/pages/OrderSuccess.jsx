import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the order object passed from the Checkout page
  const orderData = location.state?.order;

  // Safety Check: If user accesses this page directly without an order, redirect home
  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  if (!orderData) return null; // Prevent flicker before redirect

  // Format date safely
  const formattedDate = new Date(orderData.date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-brand-cream min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-green/10">
        
        {/* Header with Green Checkmark */}
        <div className="bg-brand-green p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-white mb-4 animate-bounce">
            <svg className="h-10 w-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-bold text-white">Order Confirmed!</h2>
          <p className="text-brand-cream/80 mt-2">Thank you for your devotion.</p>
        </div>

        {/* Order Details Body */}
        <div className="px-8 py-6">
          <div className="text-center mb-8">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-xl font-bold text-brand-dark tracking-wider">{orderData.id}</p>
          </div>

          <div className="border-t border-b border-gray-100 py-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-brand-dark">{formattedDate}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Payment Method</span>
              <span className="font-medium text-brand-dark uppercase">{orderData.payment.method}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Amount</span>
              <span className="font-bold text-brand-green text-lg">₹{orderData.total}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide font-bold">Shipping To:</p>
            <p className="text-sm font-medium text-brand-dark">
              {orderData.shipping.firstName} {orderData.shipping.lastName}
            </p>
            <p className="text-sm text-gray-600">{orderData.shipping.address}</p>
            <p className="text-sm text-gray-600">
              {orderData.shipping.city}, {orderData.shipping.pincode}
            </p>
          </div>

          <p className="text-xs text-center text-gray-400 mb-6">
            A confirmation email has been sent to {orderData.shipping.email}
          </p>

          <button
            onClick={() => navigate('/')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-brand-green hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;