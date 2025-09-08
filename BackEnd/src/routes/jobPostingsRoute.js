import express from 'express';
import secureRoute from '../middlewares/secureRoute.js';

import { createOffCampusJobPosting, createOnCampusPosting, createPoolCampusPosting, createJobPosting, createInternshipPosting, createOnCampusCollegeRequest, createPoolCampusCollegeRequest, createRefferralPosting } from '../controllers/jobPostingController.js';

// api.. "/api/hiring-channels"

const router = express.Router();

router.post("/off-campus", secureRoute, createOffCampusJobPosting);

router.post("/on-campus", secureRoute, createOnCampusPosting);

router.post("/pool-campus", secureRoute, createPoolCampusPosting);

router.post("/pool-campus/college-request", secureRoute, createPoolCampusCollegeRequest); // Add route for college request

router.post("/job-posting", secureRoute, createJobPosting);

router.post("/internship-posting", secureRoute, createInternshipPosting);

router.post("/on-campus/college-request", secureRoute, createOnCampusCollegeRequest);
router.post("/pool-campus/college-request", secureRoute, createPoolCampusCollegeRequest); // Add route for college request

router.post("/referral-posting", secureRoute, createRefferralPosting);

export default router;
