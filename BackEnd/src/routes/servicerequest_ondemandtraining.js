// routes/onDemandRoutes.js
import express from "express";
import { submitOnDemandTrainingRequest } from "../controllers/servicerequest_ondemandtraining.js";

const router = express.Router();

// POST route to submit on-demand training request
router.post("/on-demand-training", submitOnDemandTrainingRequest);

export default router;
