import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, ShieldCheck } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LoginSignupPage = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const mode = urlParams.get("mode");

  const [isLogin, setIsLogin] = useState(mode !== "signup");

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "superadmin",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!isLogin && !formData.name.trim()) newErrors.name = "Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setMsg("");

    if (isLogin) {
      const res = await login(formData.email, formData.password);
      if (!res.success) setMsg(res.message);
    } else {
      setMsg("Signup simulated — backend connection pending.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-200 px-4">
      {/* ---------- GLASS CARD ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white/40 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-10"
      >
        {/* ---------- TOGGLE BUTTONS ---------- */}
        <div className="flex mb-8 bg-white/40 rounded-xl p-1 shadow-inner backdrop-blur-md">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              isLogin ? "bg-blue-600 text-white shadow-lg" : "text-gray-600"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-semibold transition ${
              !isLogin ? "bg-blue-600 text-white shadow-lg" : "text-gray-600"
            }`}
          >
            Signup
          </button>
        </div>

        {/* ---------- TITLE ---------- */}
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          {isLogin ? "Welcome Back 👋" : "Create Your Account 🎉"}
        </h2>

        {/* ---------- FORM ---------- */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name (Signup only) */}
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <label className="block text-sm text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 rounded-lg border outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Role Selection */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <label className="block text-sm text-gray-700">Select Role</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white outline-none shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="superadmin">Super Admin</option>
                <option value="hospitaladmin">Hospital Admin</option>
                <option value="nurse">Nurse</option>
                <option value="patient">Patient</option>
              </select>
            </div>
          </motion.div>

          {/* Error message */}
          {msg && <p className="text-red-500 text-center text-sm">{msg}</p>}

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginSignupPage;
