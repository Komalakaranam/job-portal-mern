/*import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,   // IMPORTANT
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
    },
    description: {
      type: String,
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
*/
import express from "express";
import Job from "../models/Job.js";
import jwt from "jsonwebtoken";

const router = express.Router();

/* =======================
   AUTH MIDDLEWARE
======================= */
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* =======================
   CREATE JOB (RECRUITER)
======================= */
router.post("/", protect, async (req, res) => {
  try {
    if (req.user.role !== "recruiter") {
      return res.status(403).json({ message: "Access denied" });
    }

    const job = await Job.create({
      ...req.body,
      recruiter: req.user.id,
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* =======================
   GET ALL JOBS (APPLICANT)
======================= */
router.get("/", async (req, res) => {
  const jobs = await Job.find().populate("recruiter", "name");
  res.json(jobs);
});

/* =======================
   GET MY JOBS (RECRUITER)
======================= */
router.get("/my", protect, async (req, res) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Access denied" });
  }

  const jobs = await Job.find({ recruiter: req.user.id });
  res.json(jobs);
});

export default router;
