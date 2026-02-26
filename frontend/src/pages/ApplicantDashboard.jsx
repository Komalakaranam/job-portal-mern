import { useEffect, useState } from "react";
import axios from "axios";

export default function ApplicantDashboard() {
  const [activeTab, setActiveTab] = useState("browse");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ NEW STATES FOR SEARCH
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const token = localStorage.getItem("token");

  /* FETCH JOBS */
  const fetchJobs = async () => {
    const res = await axios.get("https://job-portal-mern-6.onrender.com/api/jobs");
    setJobs(res.data);
  };

  /* FETCH APPLICATIONS */
  const fetchApplications = async () => {
    const res = await axios.get(
      "https://job-portal-mern-6.onrender.com/api/applications/my",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setApplications(res.data);
  };

  useEffect(() => {
    const load = async () => {
      await fetchJobs();
      await fetchApplications();
      setLoading(false);
    };
    load();
  }, []);

  /* APPLY JOB */
  const applyJob = async (jobId) => {
    try {
      if (!resumeFile) {
        alert("Please upload resume (PDF)");
        return;
      }

      const formData = new FormData();
      formData.append("resume", resumeFile);

      await axios.post(
        `https://job-portal-mern-6.onrender.com/api/applications/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Applied successfully");
      setResumeFile(null);
      fetchApplications();
      setActiveTab("applications");
    } catch (err) {
      alert(err.response?.data?.message || "Apply failed");
    }
  };

  const alreadyApplied = (jobId) =>
    applications.some((a) => a.job && a.job._id === jobId);

  /* ✅ FILTER LOGIC */
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      locationFilter === "" ||
      job.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesSearch && matchesLocation;
  });

  if (loading) return <div className="p-10 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* TABS */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("browse")}
          className={`px-4 py-2 rounded ${
            activeTab === "browse"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          Browse Jobs
        </button>

        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded ${
            activeTab === "applications"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          My Applications
        </button>
      </div>

      {/* BROWSE JOBS */}
      {activeTab === "browse" && (
        <>
          {/* ✅ SEARCH BAR */}
          <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-lg flex-1"
            />

            <input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border px-4 py-2 rounded-lg flex-1"
            />

            <button
              onClick={() => {
                setSearch("");
                setLocationFilter("");
              }}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Clear
            </button>
          </div>

          {/* JOB LIST */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.length === 0 ? (
              <p className="text-gray-500">No jobs found</p>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white p-6 rounded-xl shadow"
                >
                  <h2 className="text-xl font-semibold">
                    {job.title}
                  </h2>

                  <p className="text-gray-600">
                    {job.companyName} • {job.location}
                  </p>

                  {alreadyApplied(job._id) ? (
                    <span className="text-green-600 font-semibold">
                      Applied
                    </span>
                  ) : (
                    <>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) =>
                          setResumeFile(e.target.files[0])
                        }
                        className="mt-3"
                      />

                      <button
                        onClick={() => applyJob(job._id)}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        Apply
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* MY APPLICATIONS */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          {applications.length === 0 ? (
            <p className="text-gray-500">
              You haven’t applied yet
            </p>
          ) : (
            applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h2 className="text-xl font-semibold">
                  {app.job?.title}
                </h2>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-yellow-100">
                  {app.status}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
