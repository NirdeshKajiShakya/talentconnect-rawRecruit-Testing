// routes/studentRegistrationRoutes.js
import express from "express";
import { registerStudent } from "../controllers/servicerequest_college_studenttraining_requestinfo.js";

const router = express.Router();

router.post("/student-training-requestinfo", registerStudent);

export default router;
