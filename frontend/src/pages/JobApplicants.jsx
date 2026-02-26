import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

const JobApplicants = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch(`https://job-portal-mern-6.onrender.com/api/applications/job/${jobId}`)
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error(err));
  }, [jobId]);

  const updateStatus = async (appId, status) => {
    await fetch(`https://job-portal-mern-6.onrender.com/api/applications/${appId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    alert(`Application ${status}`);

    // refresh list
    const res = await fetch(
      `https://job-portal-mern-6.onrender.com/api/applications/job/${jobId}`
    );
    const data = await res.json();
    setApplications(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Applicants</h2>
          <Button onClick={() => navigate(-1)}>⬅ Back</Button>
        </div>

        {applications.length === 0 ? (
          <p>No applicants yet</p>
        ) : (
          applications.map((app) => (
            <div
              key={app._id}
              className="bg-white p-4 rounded shadow mb-4"
            >
              <p className="font-semibold">
                {app.applicantId.username}
              </p>
              <p>{app.applicantId.email}</p>
              <p>Status: <b>{app.status}</b></p>

              <div className="mt-3">
                <Button
                  onClick={() => updateStatus(app._id, "Accepted")}
                >
                  Accept
                </Button>
                <Button
                  className="ml-2"
                  onClick={() => updateStatus(app._id, "Rejected")}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobApplicants;
