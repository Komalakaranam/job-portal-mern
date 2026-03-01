import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!passwordRegex.test(form.password)) {
      setError(
        "Password must be 8+ characters, include 1 uppercase and 1 special character."
      );
      return;
    }

    try {
      await API.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
            required
          />

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

            <p className="text-xs text-gray-500 mt-1">
              8+ characters, 1 uppercase, 1 special character
            </p>
          </div>

          <select
            name="role"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
            required
          >
            <option value="">Select Role</option>
            <option value="applicant">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>

          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          <button className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
            Register
          </button>

        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}