import express from "express";
import { submitPreferences } from "../controllers/onboarding_preferences.js";

const router = express.Router();

router.post("/submit", submitPreferences);

export default router;
