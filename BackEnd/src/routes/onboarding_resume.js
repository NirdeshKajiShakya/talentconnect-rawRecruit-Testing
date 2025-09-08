import express from "express";
import { uploadResume } from "../controllers/onboarding_resume.js";

const router = express.Router();

router.post("/upload", uploadResume);

export default router;
