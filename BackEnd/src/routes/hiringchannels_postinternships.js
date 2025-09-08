import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
} from "../controllers/hiringchannels_postinternships.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();

// api: ../api/rawrecruit

// POST a new job
router.post("/createinternship",secureRoute, createJob);

// GET all jobs
router.get("/internship", getJobs);

// GET a single job by ID
router.get("/internship/:id", getJobById);

// DELETE a job by ID
router.delete("/internship/:id", deleteJob);

export default router;
