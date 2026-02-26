/*
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["applicant", "recruiter"],
      required: true
    },
    skills: [String],
    education: String,
    resume: String,
    companyName: String
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
*/
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["applicant", "recruiter"],
    required: true,
  },
});

export default mongoose.model("User", userSchema);
