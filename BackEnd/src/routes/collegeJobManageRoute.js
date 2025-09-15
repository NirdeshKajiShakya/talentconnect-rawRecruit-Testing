import express from "express";
import { getCollegePostedJobs } from "../controllers/collegeJobManagementController.js";
import secureRoute from '../middlewares/secureRouteMiddleware.js';

const router = express.Router();


router.get('/:jobType', secureRoute, getCollegePostedJobs);


export default router; 