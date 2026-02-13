import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const MoolContext = createContext();

export const MoolProvider = ({ children }) => {
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("moolGranthCart");
    return saved ? JSON.parse(saved) : [];
  });

  const [allOrders, setAllOrders] = useState(() => {
    const saved = localStorage.getItem("moolGranthOrders");
    return saved ? JSON.parse(saved) : [];
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("moolGranthUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("moolGranthRole") || null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  /* ================= EFFECTS ================= */

  useEffect(() => {
    localStorage.setItem("moolGranthCart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("moolGranthOrders", JSON.stringify(allOrders));
  }, [allOrders]);

  /* ================= ACTIONS ================= */

  const login = (role, userData) => {
    setUser(userData);
    setUserRole(role);

    localStorage.setItem("moolGranthUser", JSON.stringify(userData));
    localStorage.setItem("moolGranthRole", role);
  };

  const logout = () => {
    setUser(null);
    setUserRole(null);

    localStorage.removeItem("moolGranthUser");
    localStorage.removeItem("moolGranthRole");
    localStorage.removeItem("token"); // JWT

    navigate("/");
  };

  /* ================= CART ================= */

  const addToCart = (product, qty = 1, openCart = true) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      return existing
        ? prev.map((i) =>
            i.id === product.id
              ? { ...i, quantity: i.quantity + qty }
              : i
          )
        : [...prev, { ...product, quantity: qty }];
    });

    if (openCart) setIsCartOpen(true);
  };

  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, quantity: Math.max(1, i.quantity + change) }
          : i
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  /* ================= ORDERS ================= */

  const placeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Pending",
    };

    setAllOrders((prev) => [newOrder, ...prev]);
    setCartItems([]);
    localStorage.removeItem("moolGranthCart");

    navigate("/success", { state: { order: newOrder } });
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setAllOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: newStatus } : o
      )
    );
  };

  /* ================= UI ================= */

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  /* ================= PROVIDER VALUE ================= */

  const value = {
    cartItems,
    allOrders,
    user,
    userRole,
    isCartOpen,

    login,
    logout,

    addToCart,
    updateQuantity,
    removeFromCart,

    placeOrder,
    updateOrderStatus,

    toggleCart,
  };

  return (
    <MoolContext.Provider value={value}>
      {children}
    </MoolContext.Provider>
  );
};

export const useMoolContext = () => useContext(MoolContext);
