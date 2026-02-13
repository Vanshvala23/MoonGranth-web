import React, { useState } from "react";
import axios from "axios";
import { useMoolContext } from "../context/MoolContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const { login } = useMoolContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Only allow numbers and max 10 digits
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) setPhone(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // ---------------- ADMIN LOGIN ----------------
    if (isAdminMode) {
      if (secretKey === "admin123") {
        // Store admin as user with token
        const adminUser = { name: "Super Admin", phone: "9999999999", token: "ADMIN" };
        localStorage.setItem("token", "ADMIN");
        localStorage.setItem("user", JSON.stringify(adminUser));
        login("admin", adminUser);
        return navigate("/admin");
      }
      return setError("Invalid Admin Secret Key!");
    }

    // ---------------- CUSTOMER LOGIN ----------------
    if (phone.length !== 10) {
      return setError("Enter valid 10-digit mobile number");
    }
    if (!password) {
      return setError("Enter password");
    }

    try {
      setLoading(true);

      const res = await axios.post("https://moon-granth-backend.vercel.app/api/auth/login", {
        mobile: phone,
        password: password,
      });

      const { token, user } = res.data;

      // ---------------- FIX: Include token inside user ----------------
      const userWithToken = { ...user, token };

      // Save token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithToken));

      // Update context with token inside user
      login("customer", userWithToken);

      // Navigate to previous page or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-brand-green/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-serif font-bold text-brand-dark">
            {isAdminMode ? "Admin Portal" : "Customer Login"}
          </h2>

          <p className="mt-2 text-center text-sm text-gray-600">
            {location.state?.from ? (
              <span className="text-brand-green font-medium">
                Please login to continue shopping
              </span>
            ) : isAdminMode ? (
              "Enter your secret key."
            ) : (
              "Sign in with your mobile number."
            )}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setIsAdminMode(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              !isAdminMode ? "bg-white shadow text-brand-green" : "text-gray-500"
            }`}
          >
            Customer
          </button>

          <button
            onClick={() => setIsAdminMode(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              isAdminMode ? "bg-white shadow text-brand-green" : "text-gray-500"
            }`}
          >
            Admin
          </button>
        </div>

        {/* FORM */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isAdminMode ? (
              <input
                type="password"
                required
                placeholder="Secret Key"
                className="w-full px-3 py-3 border rounded-md"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
              />
            ) : (
              <>
                {/* Phone */}
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-gray-500 font-bold border-r pr-2">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    className="w-full pl-14 pr-3 py-3 border rounded-md"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </div>

                {/* Password */}
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full px-3 py-3 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-bold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-white bg-brand-green rounded-md hover:bg-brand-dark transition-colors"
          >
            {loading ? "Please wait..." : isAdminMode ? "Access Dashboard" : "Sign In"}
          </button>
        </form>

        {!isAdminMode && (
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-brand-green hover:text-brand-dark underline"
              >
                Sign up now
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
