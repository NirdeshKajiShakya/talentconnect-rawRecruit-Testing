import express from 'express' ;

import { getCompanyOnCampusHiringWithApplications, getCollegesForOnCampusJob } from '../../controllers/hiringchannels_oncampusregister.js';
import secureRoute from '../../middlewares/secureRoute.js';     

const router = express.Router() ;

// Route to get all on-campus hiring drives for a company with application counts
router.get('/on-campus-drives', secureRoute, getCompanyOnCampusHiringWithApplications);
// Route to get colleges for a specific on-campus job
router.get('/on-campus-drives/:jobId/colleges', secureRoute, getCollegesForOnCampusJob);

export default router; 