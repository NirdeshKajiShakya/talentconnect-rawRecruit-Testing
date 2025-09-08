import express from "express";

const router = express.Router();

import { getSavedJobsAndInternships } from "../controllers/savedjobsandinternships.js";
import { validatesavedjobsandinternships } from "../middlewares/validatesavedjobsandinternships.js";
router.get(
  "/getsavedjobsandinternships",
  validatesavedjobsandinternships,
  getSavedJobsAndInternships
);

export default router;
