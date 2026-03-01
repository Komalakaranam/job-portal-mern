import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSearch() {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      navigate("/login");
    } else if (user?.role === "recruiter") {
      navigate("/recruiter/dashboard");
    } else {
      navigate("/applicant/dashboard");
    }
  };

  return (
    <section className="relative overflow-hidden py-24 bg-[#f7f5fc]">

      {/* 🔵 Top Right Soft Blue Glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-200 opacity-30 rounded-full blur-3xl"></div>

      {/* 🔵 Bottom Left Soft Blue Glow */}
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-indigo-200 opacity-30 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight mb-6">
          Find Your{" "}
          <span className="text-blue-600">Dream Job</span>{" "}
          With Your Interest
          <br />
          And Skills
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
          Discover amazing career opportunities tailored to your skills and interests.
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-6 grid md:grid-cols-4 gap-4 text-gray-700 max-w-5xl mx-auto">

          <input
            className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Job title, skills, company"
          />

          <input
            className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Location (city or remote)"
          />

          <select className="border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option>Experience</option>
            <option>Fresher</option>
            <option>1-3 Years</option>
            <option>3+ Years</option>
          </select>

          <button
            onClick={handleSearchClick}
            className="bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            Search Jobs
          </button>

        </div>
      </div>
    </section>
  );
}