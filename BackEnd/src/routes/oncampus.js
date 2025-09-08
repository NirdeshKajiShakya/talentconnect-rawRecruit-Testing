import express from "express";
import {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  duplicateJob,
  getJobDetails,
} from "../controllers/manageOnCampusController.js";

const router = express.Router();

// POST: Create a job
router.post("/", createJob);

// GET: Fetch all jobs with optional search, filter, pagination
router.get("/", getJobs);

// GET: Get a single job's details
router.get("/:jobId", getJobDetails);

// PUT: Update a job
router.put("/:jobId", updateJob);

// DELETE: Delete a job
router.delete("/:jobId", deleteJob);

// POST: Duplicate a job
router.post("/duplicate/:jobId", duplicateJob);

export default router;
