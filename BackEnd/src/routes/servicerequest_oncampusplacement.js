// routes/campusPlacementRoutes.js
import express from "express";
import { registerCampusPlacement } from "../controllers/servicerequest_oncampusplacement.js";

const router = express.Router();

router.post("/campus-placement/register", registerCampusPlacement);

export default router;
