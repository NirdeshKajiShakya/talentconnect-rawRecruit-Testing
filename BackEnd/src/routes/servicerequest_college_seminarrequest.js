import express from "express";
import { submitRequest } from "../controllers/servicerequest_college_seminarrequest.js";

const router = express.Router();

// GET /api/applications
router.post("/seminarrequest", submitRequest);

export default router;
