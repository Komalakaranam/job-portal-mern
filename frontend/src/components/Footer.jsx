export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-white text-xl font-bold mb-3">
            HireSphere
          </h2>
          <p className="text-sm">
            Your trusted job portal to connect talent with opportunity.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">For Job Seekers</h3>
          <ul className="space-y-1 text-sm">
            <li>Browse Jobs</li>
            <li>Create Profile</li>
            <li>Job Alerts</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">For Recruiters</h3>
          <ul className="space-y-1 text-sm">
            <li>Post Jobs</li>
            <li>Search Candidates</li>
            <li>Manage Applications</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Company</h3>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

      </div>

      <div className="text-center text-sm text-gray-400 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} HireSphere. All rights reserved.
      </div>
    </footer>
  );
}
