import express from 'express';
import { getOffCampusRegistrations, offCampusRegister } from '../controllers/hiringChannelOffCampus.js';
import secureRoute from '../middlewares/secureRoute.js';


const router = express.Router();

router.post('/offCampusRegister', secureRoute , offCampusRegister);

router.get('/allOffCampusJobs' , getOffCampusRegistrations) ;

export default router;
