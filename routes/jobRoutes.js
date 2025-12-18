import express from "express";
import Job from "../models/Job.js"; // Job schema
const router = express.Router();

// 1. Бүх ажлын мэдээлэл авах
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().populate("userId"); // userId-ийг автоматаар авах
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. ID-аар нэг job авах
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("userId");
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
