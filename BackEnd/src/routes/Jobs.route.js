import express from "express";

import { fetchOpportunitiesForCollegeStudent, findRelevantJoblistingOpportunity, findRelevantOpportunityById } from "../controllers/relevantJobs.controller.js";
import { fetchOnCampusOpportunities, findJobListingOpportunityById, findOffcampusOpportunityById, findOpportunityById } from "../controllers/job.controller.js";
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();

// api '.../jobs'

// company
// router.post('/:companyId', createJob);

// colleges
router.get('/oncampus', fetchOnCampusOpportunities);

// user
// find jobs to collegeStudents
router.get('/campus/:collegeId', fetchOpportunitiesForCollegeStudent);
// professional
// router.get('/professional');

router.get('/relevantjobs/offcampus', secureRoute, findRelevantOpportunityById);
router.get('/relevantjobs/joblisting', secureRoute, findRelevantJoblistingOpportunity);
router.get('/jobDetails/:jobId', findOffcampusOpportunityById);
router.get('/jobDetails/joblisting/:jobId', findJobListingOpportunityById);
// router.get('/campusopportunity', fetchCampusOpportunities);


export default router;