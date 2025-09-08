import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  deleteJob,
} from "../controllers/hiringchannel_postjob.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();

// POST a new job
router.post("/createjob", secureRoute, createJob);

// GET all jobs
router.get("/", getJobs);

// GET a single job by ID
router.get("/:id", getJobById);

// DELETE a job by ID
router.delete("/:id", deleteJob);

export default router;
