import { useState } from "react";
import axios from "axios";

export default function PostJobModal({ onClose, onJobAdded }) {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login again");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "https://job-portal-mern-6.onrender.com/api/jobs",
        {
          title,
          companyName,
          location,
          jobType,
          skills: skills.split(",").map(s => s.trim()),
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onJobAdded(); // refresh jobs
      onClose();    // close modal
    } catch (err) {
      console.error("POST JOB ERROR:", err.response?.data || err.message);
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Post New Job</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Company Name"
            className="w-full border p-2 rounded"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <select
            className="w-full border p-2 rounded"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option>Full-time</option>
            <option>Internship</option>
          </select>

          <input
            type="text"
            placeholder="Skills (comma separated)"
            className="w-full border p-2 rounded"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <textarea
            placeholder="Job Description"
            className="w-full border p-2 rounded"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
