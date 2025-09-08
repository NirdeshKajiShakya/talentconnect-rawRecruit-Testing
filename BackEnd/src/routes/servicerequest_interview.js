import express from "express";
import { scheduleInterview } from "../controllers/servicerequest_interviewcontroller.js";

const router = express.Router();

router.post("/schedule-interview", scheduleInterview);

export default router;
