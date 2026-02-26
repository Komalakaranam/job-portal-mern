import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    jobType: {
      type: String,
      enum: ["Internship", "Full-time"],
      required: true
    },
    skills: [String],
    description: { type: String, required: true },
    salary: String,
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
