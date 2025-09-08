import express from "express";
import { submitBasicDetails } from "../controllers/onboarding_basicdetails.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();

router.post("/submit", submitBasicDetails);

export default router;
