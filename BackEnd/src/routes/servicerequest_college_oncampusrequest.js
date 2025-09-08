import express from "express";
import { submitRequestInfo } from "../controllers/servicerequqest_college_oncampusrequest.js";

const router = express.Router();

router.post("/submit", submitRequestInfo);

export default router;
