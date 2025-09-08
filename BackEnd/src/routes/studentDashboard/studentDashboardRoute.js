import express from 'express';
import { getInternshipPostings, getIntershipById, getJobPostings, getOffCampusPostings, getOnCampusPostingForCollegebyID, getOnCampusPostingForCompanybyID, getOnCampusPostings, getOnCampusPostingsForCollege, getOnCampusPostingsForCompany, getPoolCampusForCollege, getPoolCampusForCompany, getPoolCampusJobByIdForCollege, getPoolCampusJobByIdForCompany, getReferralJobById, getReferralJobs } from '../../controllers/studentDashboard/studentDashboardController.js';
import secureRoute from '../../middlewares/secureRoute.js';

const router = express.Router(); 

router.get('/off-campus' ,secureRoute , getOffCampusPostings);
router.get('/on-campus', secureRoute ,getOnCampusPostingsForCompany);
router.get('/on-campus/company/:id', secureRoute, getOnCampusPostingForCompanybyID);

router.get('/on-campus/college' , secureRoute , getOnCampusPostingsForCollege)
router.get("/oncampus/college/:id", getOnCampusPostingForCollegebyID);
// router.get('/pool-campus',secureRoute , getPoolCampusPostings); 

router.get('/getAllPoolCampusJobs', getPoolCampusForCollege);
router.get('/getPoolCampusJob/:id', getPoolCampusJobByIdForCollege);

router.get('/pool-campus/company' , secureRoute , getPoolCampusForCompany) ;
router.get('/pool-campus/company/:id', secureRoute, getPoolCampusJobByIdForCompany);

router.get('/job-postings', secureRoute, getJobPostings);
router.get('/internship-postings', secureRoute,getInternshipPostings);
router.get('/getInternshipDetail/:id',secureRoute , getIntershipById)

router.get('/referral-jobs', secureRoute , getReferralJobs) ;
router.get('/referral-jobs/:id', secureRoute , getReferralJobById) ;
export default router;