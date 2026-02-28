router.post("/ats-score/:jobId", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const resumePath = req.file.path;

    const result = await simulateAtsScore(
      resumePath,
      job.skills
    );

    res.json(result);

  } catch (error) {
    console.error("ATS Route Error:", error.message);
    res.status(500).json({ message: "ATS scoring failed" });
  }
});