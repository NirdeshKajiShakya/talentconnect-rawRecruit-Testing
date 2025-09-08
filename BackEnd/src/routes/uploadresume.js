import express from "express";

import { uploadResume } from "../controllers/uploadresume.js";

const router = express.Router();
router.post("/upload-resume", uploadResume);

export default router;
