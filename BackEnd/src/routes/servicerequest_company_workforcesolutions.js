import express from "express";

const router = express.Router();

// import { validateServiceRequest } from "../middlewares/validateservicerequest.js";
import { createServiceRequest } from "../controllers/servicerequest_company_workforcesolutions.js";

router.post("/servicerequest-workforce", createServiceRequest);

export default router;
