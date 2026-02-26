import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function RecruiterApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    const res = await axios.get(
      `https://job-portal-mern-6.onrender.com/api/applications/job/${jobId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setApplications(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `https://job-portal-mern-6.onrender.com/api/applications/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchApplicants();
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Applicants</h1>

      {applications.map((app) => (
        <div
          key={app._id}
          className="border p-4 rounded mb-3 shadow"
        >
          <p className="font-semibold">{app.applicant.name}</p>
          <p className="text-sm text-gray-600">{app.applicant.email}</p>

          <p className="mt-2">
            Status:{" "}
            <span className="font-bold">{app.status}</span>
          </p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => updateStatus(app._id, "Reviewed")}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Reviewed
            </button>

            <button
              onClick={() => updateStatus(app._id, "Accepted")}
              className="bg-green-600 text-white px-3 py-1 rounded"
            >
              Accept
            </button>

            <button
              onClick={() => updateStatus(app._id, "Rejected")}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
