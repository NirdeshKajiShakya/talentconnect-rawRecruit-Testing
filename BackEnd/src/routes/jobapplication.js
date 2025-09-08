import express from "express";
import { getAllApplications } from "../controllers/jobapplication.js";

const router = express.Router();

// GET /api/applications
router.get("/", getAllApplications);

export default router;
