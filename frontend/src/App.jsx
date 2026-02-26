import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";


import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ApplicantDashboard from "./pages/ApplicantDashboard";
import RecruiterApplicants from "./pages/RecruiterApplicants";
import BrowseJobs from "./pages/BrowseJobs";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RECRUITER */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/job/:jobId/applicants"
          element={
            <ProtectedRoute role="recruiter">
              <RecruiterApplicants />
            </ProtectedRoute>
          }
        />

        {/* APPLICANT */}
        <Route
          path="/applicant/dashboard"
          element={
            <ProtectedRoute role="applicant">
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/jobs"
  element={
    <ProtectedRoute role="applicant">
      <BrowseJobs />
    </ProtectedRoute>
  }
/>

      </Routes>
    </>
  );
}
