import React, { useState, useEffect } from 'react';
import { useMoolContext } from '../context/MoolContext'; // Import Context
import axios from 'axios'; // Import Axios

const Contact = () => {
  const { user } = useMoolContext(); // get logged-in user

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // '', 'success', 'error'

  // Auto-fill user info if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || ''
      }));
    }
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(''); // reset status

    try {
      // Send POST request to backend
      await axios.post('https://moon-granth-backend.vercel.app/api/contact', formData);

      setStatus('success');

      // Reset message field after 3 seconds, keep user info
      setTimeout(() => {
        setStatus('');
        setFormData({
          name: user ? user.name : '',
          email: user ? user.email : '',
          message: ''
        });
      }, 3000);
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setStatus('error');

      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-brand-dark">Get in Touch</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Have questions about our products or want to place a bulk order for your temple or society? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* LEFT: Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-brand-green/10">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">Send us a Message</h2>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-center mb-6">
                <p className="font-bold">Message Sent!</p>
                <p className="text-sm">We will get back to you within 24 hours.</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl text-center mb-6">
                <p className="font-bold">Failed to Send</p>
                <p className="text-sm">Please try again later.</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                  placeholder="Arjun Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                  placeholder="arjun@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  required 
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-green focus:border-transparent outline-none transition-all"
                  placeholder="I am interested in bulk ordering..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-dark shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT: Contact Info */}
          <div className="space-y-10">
            {/* Info Cards */}
            <div className="grid gap-6">
              {/* Visit */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-saffron/10 text-brand-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Visit Us</h3>
                  <p className="text-gray-600">108, Gau Seva Path, Near Krishna Temple,<br/>Vrindavan, Uttar Pradesh, 281121</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-saffron/10 text-brand-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Email Us</h3>
                  <p className="text-gray-600">support@moolgranth.com</p>
                  <p className="text-gray-600">bulk@moolgranth.com</p>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-saffron/10 text-brand-saffron rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Call Us</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-sm text-gray-500">Mon - Sat, 9am - 6pm</p>
                </div>
              </div>
            </div>

            {/* Simulated Map */}
            <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden shadow-inner relative">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                alt="Map Location" 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="bg-white text-brand-dark px-4 py-2 rounded-lg shadow font-bold text-sm hover:bg-gray-100 transition-colors">View on Google Maps</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
