import express from "express";
import {
    resumeSearch,
    // saveParsedResume 
} from "../controllers/resume.controller.js";

const router = express.Router();

// api '.../company/dashboard/resume'

// search resume
router.get('/', resumeSearch);
// router.post('/', saveParsedResume); 

export default router;