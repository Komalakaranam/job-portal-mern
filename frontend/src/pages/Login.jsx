
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await axios.post(
      "https://job-portal-mern-6.onrender.com/api/auth/login",
      { email, password }
    );

    const { token, user } = res.data;

    // 🔥 STORE TOKEN + USER
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // 🔥 UPDATE CONTEXT
    login(user);

    // 🔥 ROLE BASED REDIRECT
    if (user.role === "recruiter") {
      navigate("/recruiter/dashboard");
    } else {
      navigate("/applicant/dashboard");
    }

  } catch (err) {
    setError("Invalid email or password");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
