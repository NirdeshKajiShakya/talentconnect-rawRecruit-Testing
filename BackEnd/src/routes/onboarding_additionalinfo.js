import express from "express";
import { submitAdditionalInfo } from "../controllers/onboarding_additionalinfo.js";

const router = express.Router();

router.post("/submitted", submitAdditionalInfo);

export default router;
