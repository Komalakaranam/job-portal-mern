import mongoose from "mongoose";

const interviewSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    question: String,
    answer: String,
    totalScore: Number,
    rubric: {
      technicalAccuracy: Number,
      depth: Number,
      clarity: Number,
      examples: Number,
    },
    confidence: String,
  },
  { timestamps: true }
);

export default mongoose.model("InterviewSession", interviewSessionSchema);