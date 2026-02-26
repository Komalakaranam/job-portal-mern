import { useEffect, useState } from "react";
import axios from "axios";
import PostJobModal from "../components/PostJobModal";

export default function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [showPostJob, setShowPostJob] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= FETCH MY JOBS ================= */
  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://job-portal-mern-6.onrender.com/api/jobs/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setJobs(res.data);
    } catch (err) {
      console.error("Jobs error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    if (token) fetchJobs();
  }, [token]);

  /* ================= VIEW APPLICANTS ================= */
  const viewApplicants = async (job) => {
    try {
      const res = await axios.get(
        `https://job-portal-mern-6.onrender.com/api/applications/job/${job._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedJob(job);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load applicants");
    }
  };

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (applicationId, status) => {
    try {
      await axios.put(
        `https://job-portal-mern-6.onrender.com/api/applications/${applicationId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI instantly
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId
            ? { ...app, status }
            : app
        )
      );
    } catch (err) {
      console.error("Update status error:", err.response?.data);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>

        <button
          onClick={() => setShowPostJob(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          + Post Job
        </button>
      </div>

      {/* JOB LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs posted yet</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded shadow"
            >
              <h2 className="font-semibold text-lg">
                {job.title}
              </h2>
              <p className="text-gray-500">{job.location}</p>

              <button
                onClick={() => viewApplicants(job)}
                className="mt-4 bg-blue-600 text-white w-full py-2 rounded"
              >
                View Applicants
              </button>
            </div>
          ))
        )}
      </div>

      {/* APPLICANTS */}
      {selectedJob && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Applicants for {selectedJob.title}
          </h2>

          {applications.length === 0 ? (
            <p className="text-gray-500">No applicants yet</p>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-5 rounded shadow mb-4 flex justify-between items-center"
              >
                {/* LEFT */}
                <div>
                  <p className="font-semibold text-lg">
                    {app.applicant?.name}
                  </p>
                  <p className="text-gray-600">
                    {app.applicant?.email}
                  </p>

                  <p className="mt-1">
                    Status:{" "}
                    <span className="font-semibold">
                      {app.status}
                    </span>
                  </p>

                  {/* 🔥 VIEW RESUME */}
                  {app.resume && (
  <a
    href={`https://job-portal-mern-6.onrender.com/${app.resume}`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline mt-1 block"
  >
    View Resume (PDF)
  </a>
)}

                </div>

                {/* RIGHT */}
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      updateStatus(app._id, "Accepted")
                    }
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(app._id, "Rejected")
                    }
                    className="bg-red-600 text-white px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* POST JOB MODAL */}
      {showPostJob && (
        <PostJobModal
          onClose={() => setShowPostJob(false)}
          onJobAdded={fetchJobs}
        />
      )}
    </div>
  );
}
