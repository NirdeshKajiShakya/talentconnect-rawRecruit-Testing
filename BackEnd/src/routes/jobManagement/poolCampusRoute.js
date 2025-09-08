import express from 'express' ;

import secureRoute from '../../middlewares/secureRoute.js';
import { getCollegesForJob, getCompanyPoolCampusHiringWithApplications } from '../../controllers/hiringChannelPoolCampus.controller.js';

const router = express.Router() ;

 router.get('/jobmanagement/pool-campus-drives',secureRoute , getCompanyPoolCampusHiringWithApplications) ;
// routes/hiringChannelPoolCampus.route.js
router.get('/jobmanagement/pool-campus-drives/:jobId/colleges', secureRoute, getCollegesForJob);
export default router ;