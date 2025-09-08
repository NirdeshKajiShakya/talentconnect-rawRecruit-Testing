import express from "express";

const router = express.Router();

// import { validateServiceRequest } from "../middlewares/validateservicerequest.js";
import { createServiceRequest } from "../controllers/servicereequest_company_employeetraining.js";

router.post("/servicerequest-employeetraining", createServiceRequest);

export default router;
