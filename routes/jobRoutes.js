import express from "express";
import Job from "../models/Job.js"; // Job schema
const router = express.Router();

// 1. Бүх ажлын мэдээлэл авах (эсвэл userId-аар шүүх)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    
    let query = {};
    if (userId) {
      query.userId = userId;
    }
    
    const jobs = await Job.find(query).populate("userId"); // userId-ийг автоматаар авах
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

// 3. ШИНЭ ЗАР НЭМЭХ (POST /api/jobs)
router.post("/", async (req, res) => {
  try {
    const {
      title,
      salary,
      JobCategory,
      jobType,
      location,
      workDate,
      workTime,
      requiredWorkers,
      age,
      gender,
      experience,
      clothes,
      otherRequirements,
      food,
      transport,
      note,
      userId
    } = req.body;

    if (!title || !salary || !jobType || !location) {
      return res.status(400).json({ message: "Заавал бөглөх талбарууд дутуу" });
    }

    const newJob = new Job({
      userId,
      title,
      salary,
      JobCategory,
      jobType,
      location,
      workDate,
      workTime,
      requiredWorkers,
      hiredWorkers: 0,
      age,
      gender,
      experience,
      clothes,
      otherRequirements,
      food,
      transport,
      note
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Зар амжилттай нэмэгдлээ",
      job: savedJob
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
