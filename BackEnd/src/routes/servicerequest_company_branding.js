// routes/servicerequest_company_branding.js
import express from "express";
import { createServiceRequest } from "../controllers/servicerequest_company_branding.js";

const router = express.Router();

router.post("/servicerequest-companybranding", createServiceRequest);

export default router;
