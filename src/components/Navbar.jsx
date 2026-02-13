import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { useMoolContext } from "../context/MoolContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cartItems, toggleCart, user, logout } = useMoolContext();

  // Safely calculate cart count only if user exists
  const cartCount = user
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  const navLinkClass =
    "text-brand-cream hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10";

  const handleMobileNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <nav className="bg-brand-green sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-brand-cream shadow-sm">
              <img
                src={logo}
                alt="Mool Granth Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <span className="block text-brand-cream font-serif text-xl font-bold tracking-wide leading-none">
                MOOL GRANTH
              </span>
              <span className="block text-brand-saffron text-[10px] tracking-wider uppercase mt-1">
                Pure Cow Dung, Pure Devotion
              </span>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
              <Link to="/shop" className={navLinkClass}>
                Shop
              </Link>
              <Link to="/about" className={navLinkClass}>
                About Us
              </Link>
              <Link to="/contact" className={navLinkClass}>
                Contact
              </Link>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-4">
            {/* Desktop User/Login */}
            <div className="hidden md:flex items-center">
              {user ? (
                <>
                  {/* My Account */}
                  <Link
                    to="/my-account"
                    className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                  >
                    <span className="text-lg font-medium text-brand-cream group-hover:text-white transition-colors">
                      {user.name.split(" ")[0]}
                    </span>
                    <svg
                      className="h-7 w-7 text-brand-cream group-hover:text-brand-saffron transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </Link>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="ml-3 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold text-brand-cream transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                // Logged out: show login
                <Link
                  to="/login"
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10"
                >
                  <span className="text-lg font-medium text-brand-cream group-hover:text-white transition-colors">
                    Login
                  </span>
                  <svg
                    className="h-7 w-7 text-brand-cream group-hover:text-brand-saffron transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                </Link>
              )}
            </div>

            <div className="h-6 w-px bg-brand-cream/30 hidden md:block"></div>

            {/* Cart Button */}
            <button
              onClick={user ? toggleCart : () => navigate("/login")}
              className="relative p-2 text-brand-cream hover:text-white transition-colors"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-brand-green transform translate-x-1/4 -translate-y-1/4 bg-brand-saffron rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-cream p-2"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => handleMobileNav("/")}
            className="text-brand-saffron block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Home
          </button>
          <button
            onClick={() => handleMobileNav("/shop")}
            className="text-brand-saffron block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Shop
          </button>
          <button
            onClick={() => handleMobileNav("/about")}
            className="text-brand-saffron block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            About
          </button>
          <button
            onClick={() => handleMobileNav("/contact")}
            className="text-brand-saffron block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Contact
          </button>

          {user ? (
            <>
              <button
                onClick={() => handleMobileNav("/my-account")}
                className="text-brand-saffron block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                My Account
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-red-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleMobileNav("/login")}
              className="text-brand-saffron block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
