import express from "express";
import Job from "../models/Job.js";
import InterviewSession from "../models/InterviewSession.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  generateInterviewQuestions,
  evaluateInterviewAnswer,
} from "../services/openaiService.js";

const router = express.Router();


// 🎭 GET Interview Questions
router.get("/mock-interview/:jobId", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const result = await generateInterviewQuestions(
      job.title,
      job.skills,
      job.companyName
    );

    res.json(result);
  } catch (error) {
    console.error("Mock Interview Error:", error.message);
    res.status(500).json({ message: "Failed to generate interview questions" });
  }
});


// 📝 POST Evaluate Answer
router.post("/mock-interview/:jobId/evaluate", protect, async (req, res) => {
  try {
    const { question, answer } = req.body;
    const jobId = req.params.jobId;

    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer required" });
    }

    const result = await evaluateInterviewAnswer(question, answer);

    // Save session to DB
    await InterviewSession.create({
      user: req.user._id,
      job: jobId,
      question,
      answer,
      totalScore: result.totalScore,
      rubric: result.rubric,
      confidence: result.confidence,
    });

    res.json(result);
  } catch (error) {
    console.error("Evaluation Error:", error.message);
    res.status(500).json({ message: "Failed to evaluate answer" });
  }
});


// 📊 GET Interview History
router.get("/interview/history", protect, async (req, res) => {
  try {
    const history = await InterviewSession.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

export default router;