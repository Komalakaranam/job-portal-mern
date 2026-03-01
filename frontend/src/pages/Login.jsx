import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      // Save token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Role-based redirect
      if (res.data.user.role === "recruiter") {
        navigate("/recruiter/dashboard");
      } else {
        navigate("/applicant/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="email"
            type="email"
            placeholder="Email ID"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
            required
          />

          {/* 🔐 Password Field with Toggle */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md pr-12"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          {/* 🔴 Error Message */}
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}