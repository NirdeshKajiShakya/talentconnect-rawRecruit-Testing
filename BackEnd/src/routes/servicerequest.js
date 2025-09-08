import express from "express";

const router = express.Router();

import { validateServiceRequest } from "../middlewares/validateservicerequest.js";
import { createServiceRequest } from "../controllers/servicerequest.js";

router.post("/servicerequest", createServiceRequest);

export default router;
