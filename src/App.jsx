import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useMoolContext } from './context/MoolContext';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import MyAccount from './pages/MyAccount';



function App() {
  const { userRole } = useMoolContext(); // Only need this for Admin protection

  return (
    <div className="bg-brand-cream min-h-screen font-sans flex flex-col">
      <ScrollToTop />
      
      {/* Global Header */}
      <Navbar />

      {/* Global Cart (Controlled via Context now) */}
      <CartDrawer />

      {/* ROUTING LOGIC */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-account" element={<MyAccount />} />
        
        {/* Checkout Flow */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<OrderSuccess />} />

        {/* Protected Routes */}
        <Route path="/admin" element={
          userRole === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />
        } />
        
        {/* 404 Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;