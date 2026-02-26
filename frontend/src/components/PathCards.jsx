import { Link } from "react-router-dom";

export default function PathCards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-3">Choose Your Path</h2>
        <p className="text-gray-600 mb-12">
          Whether you're seeking opportunities or hiring talent
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3">Job Seekers</h3>
            <p className="text-gray-600 mb-6">
              Apply to thousands of jobs and track applications
            </p>
            <Link
              to="/login"
              className="block bg-blue-700 text-white py-3 rounded-lg"
            >
              Applicant Login
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-3">Recruiters</h3>
            <p className="text-gray-600 mb-6">
              Post jobs, manage applicants, hire faster
            </p>
            <Link
              to="/login"
              className="block bg-teal-500 text-white py-3 rounded-lg"
            >
              Recruiter Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
