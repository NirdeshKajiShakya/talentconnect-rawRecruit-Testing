import express from "express";
import { fetchInternshipOpportunities, findOpportunityById } from "../controllers/job.controller.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();

// api '.../internship'
router.get('/', secureRoute, fetchInternshipOpportunities);
router.get('/getInternshipDetail/:jobId', findOpportunityById);

export default router;