import express from "express";
import { createCompanyProfile } from "../controllers/company.controller.js";

const router = express.Router();

// api '.../company'

// create profile
router.post('/', createCompanyProfile);

export default router;