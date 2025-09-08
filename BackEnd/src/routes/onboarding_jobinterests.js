import express from "express";
import {
  createJobPreference,
  getAllJobPreferences,
} from "../controllers/onboarding_jobinterest.js";

const router = express.Router();

router.post("/job-preference", createJobPreference);
router.get("/getjob-preference", getAllJobPreferences);

export default router;
