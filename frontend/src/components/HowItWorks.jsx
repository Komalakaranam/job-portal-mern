/*export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-2">How It Works</h2>
        <p className="text-gray-600 mb-12">
          Get started in three simple steps
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["1", "Register & Login", "Create account and complete profile"],
            ["2", "Apply or Post Jobs", "Browse or post job openings"],
            ["3", "Track & Succeed", "Monitor applications and hire"],
          ].map(([num, title, desc]) => (
            <div key={num}>
              <div className="w-14 h-14 mx-auto bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                {num}
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
*/
export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Easy Steps To Get Your Dream Job
        </h2>

        <p className="text-gray-600 mb-14 text-lg">
          Simple process. Powerful results.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            ["1", "Create Account", "Register and complete your profile in minutes."],
            ["2", "Upload Resume", "Add your resume and showcase your skills."],
            ["3", "Apply or Hire", "Apply for jobs or hire top candidates."],
          ].map(([num, title, desc]) => (
            <div
              key={num}
              className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-6 shadow-lg">
                {num}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {title}
              </h3>

              <p className="text-gray-600">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
