
/*import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Accepted", "Rejected"],
      default: "Applied"
    }
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
*/
/*import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Accepted", "Rejected"],
      default: "Applied", // ✅ IMPORTANT
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
*/
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String, // PDF file path
    },
    status: {
      type: String,
      enum: ["Applied", "Reviewed", "Accepted", "Rejected"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
