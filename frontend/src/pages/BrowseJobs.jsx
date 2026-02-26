
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://job-portal-mern-6.onrender.com/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("Jobs error:", err));
  }, []);

  const applyJob = async (jobId) => {
    try {
      await axios.post(
        `https://job-portal-mern-6.onrender.com/api/applications/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Applied successfully");
      navigate("/applicant/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Already applied");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Browse Jobs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.companyName}</p>
            <p className="text-sm text-gray-500">
              {job.location} • {job.jobType}
            </p>

            <button
              onClick={() => applyJob(job._id)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
