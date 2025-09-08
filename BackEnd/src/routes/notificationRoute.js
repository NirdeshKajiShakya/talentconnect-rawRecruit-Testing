import express from 'express' ;
import secureRoute from '../middlewares/secureRoute.js';
import { getNotifications, markAsRead } from '../controllers/teamMember.controller.js';



const router = express.Router() ;

router.get('/', secureRoute , getNotifications) ;
router.patch('/:id/read' , secureRoute , markAsRead) ;

export default router ;