import express from "express";
import { submitRequest } from "../controllers/servicerequest_college_seminar.js";

const router = express.Router();

// GET /api/applications
router.post("/seminars", submitRequest);

export default router;
