// routes/placementRoutes.js
import express from "express";
import { registerCampusPlacement } from "../controllers/campusPlacement.controller.js";

const router = express.Router();

// POST /api/placements/register
router.post("/registeroncampus", registerCampusPlacement);

export default router;
