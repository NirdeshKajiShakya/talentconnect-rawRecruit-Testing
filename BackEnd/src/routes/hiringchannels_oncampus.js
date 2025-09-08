import express from "express";
import { submitRequest } from "../controllers/hiringchannels_oncampus.js";

const router = express.Router();

// GET /api/applications
router.post("/oncampus", submitRequest);

export default router;
