import express from "express";
import Application from "../models/Application.js";
import Job from "../models/Job.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

/* ================= AUTH MIDDLEWARE ================= */
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ================= CLOUDINARY STORAGE ================= */

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "jobportal_resumes",
    resource_type: "raw", // Important for PDFs
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

/* ================= APPLY TO JOB ================= */

router.post(
  "/:jobId",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("Uploaded file object:", req.file);

      const job = await Job.findById(req.params.jobId);
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      const alreadyApplied = await Application.findOne({
        job: job._id,
        applicant: req.user.id,
      });

      if (alreadyApplied) {
        return res.status(400).json({
          message: "You already applied for this job",
        });
      }

      const application = await Application.create({
        job: job._id,
        applicant: req.user.id,
        resume: req.file ? req.file.path : null, // Cloudinary URL
        status: "Applied",
      });

      res.status(201).json(application);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= MY APPLICATIONS ================= */

router.get("/my", protect, async (req, res) => {
  const applications = await Application.find({
    applicant: req.user.id,
  }).populate("job");

  res.json(applications);
});

/* ================= VIEW APPLICANTS ================= */

router.get("/job/:jobId", protect, async (req, res) => {
  const applications = await Application.find({
    job: req.params.jobId,
  }).populate("applicant", "name email");

  res.json(applications);
});

/* ================= UPDATE STATUS ================= */

router.put("/:applicationId/status", protect, async (req, res) => {
  const application = await Application.findById(req.params.applicationId);
  application.status = req.body.status;
  await application.save();
  res.json(application);
});

export default router;