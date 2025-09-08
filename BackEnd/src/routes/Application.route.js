import express from "express";
import { createOffcampusApplication, createIntershipApplication, createJobListingApplication, saveJobByUser, getApplicationsByJob, getCollegeApplicationsByJob, createOncampusApplication, createPoolcampusApplication, shortlistApplicant, acceptApplicant, rejectApplicant, getShortlistedCandidatesByCompany, getAcceptedCandidatesByCompany, fetchSavedJobs, createCampusInternshipApplication } from "../controllers/application.controller.js";
import secureRoute from '../middlewares/secureRoute.js';

const router = express.Router();

// api '.../application'
// save opportunity
router.post("/saveopportunity", secureRoute, saveJobByUser);
router.get("/saveopportunity",secureRoute,fetchSavedJobs);

// offcampus
router.post('/candidate/offcampus', secureRoute, createOffcampusApplication);
// router.get('/candidate/offCampus', secureRoute, getOffcampusUserApplication);
// router.get('/offcampus/shortlisted', secureRoute, getShortlistedCandidatesByCompany);
// router.get('/offcampus/accepted', secureRoute, getAcceptedCandidatesByCompany);

// joblisting
router.post('/candidate/joblisting', secureRoute, createJobListingApplication);
// router.get('/candidate/joblisting', secureRoute, getJobListingUserApplication);

// internship
router.post('/candidate/internship', secureRoute, createIntershipApplication);
// router.get('/candidate/internship', secureRoute, getInternshipUserApplication);

// oncampus poolcampus campus-internship
router.post('/college/oncampus', secureRoute, createOncampusApplication);
router.post('/college/poolcampus', secureRoute, createPoolcampusApplication);
router.post('/college/internship', secureRoute, createCampusInternshipApplication);

// access only to company 

// shortlist
router.patch('/manage/shortlist/:applicationId', secureRoute, shortlistApplicant);
router.get('/manage/shortlist/', secureRoute, getShortlistedCandidatesByCompany);

// reject
router.patch('/manage/reject/:applicationId', secureRoute, rejectApplicant);

// accept
router.patch('/manage/accept/:applicationId', secureRoute, acceptApplicant);
router.get('/manage/accept/', secureRoute, getAcceptedCandidatesByCompany);

// get candidates by job
router.get('/manage', getApplicationsByJob);

// get college by job
router.get('/manage/college', getCollegeApplicationsByJob);

// accept offcampus
// router.get('/accept/:id', getAcceptedCandidatesByJob);

export default router;