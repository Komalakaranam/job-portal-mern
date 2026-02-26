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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
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
          />

          <input
            name="email"
            type="email"
            placeholder="Email ID"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md"
          />

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


          <button className="w-full bg-blue-600 text-white py-3 rounded-md">
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
