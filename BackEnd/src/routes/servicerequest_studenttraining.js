// routes/studentTrainingRoutes.js
import express from "express";
import { registerStudentTraining } from "../controllers/servicerequest_studenttraining.js";

const router = express.Router();

router.post("/student-training/register", registerStudentTraining);

export default router;
