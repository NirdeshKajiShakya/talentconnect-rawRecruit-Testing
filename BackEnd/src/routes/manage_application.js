import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/manage_application.js";

const router = express.Router();

router.post("/", createJob); // Create job
router.get("/", getAllJobs); // List all jobs
// router.get("/:id", getJobById); // Get single job
router.put("/:id", updateJob); // Update job
router.delete("/:id", deleteJob); // Delete job

export default router;
