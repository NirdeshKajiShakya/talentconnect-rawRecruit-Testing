import express from "express";
import multer from "multer";
import { submitEducationDetails } from "../controllers/onboarding_education.js";

const router = express.Router();

// Use memory storage to pass buffer to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/education", upload.single("certificate"), submitEducationDetails);

export default router;
