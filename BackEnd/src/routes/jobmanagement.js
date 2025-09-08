// routes/offCampusApplicationRoutes.js

import express from "express";
import {
  getAllOffCampusApplications,
  getSingleOffCampusApplication,
  shortlistOffCampusCandidate,
  rejectOffCampusCandidate,
} from "../controllers/offCampusApplicationController.js";

const router = express.Router();

// ✅ GET all applications
router.get("/", getAllOffCampusApplications);

// ✅ GET single application by ID
router.get("/:applicationId", getSingleOffCampusApplication);

// ✅ Shortlist a candidate
router.put("/shortlist/:applicationId", shortlistOffCampusCandidate);

// ✅ Reject a candidate
router.put("/reject/:applicationId", rejectOffCampusCandidate);

export default router;
