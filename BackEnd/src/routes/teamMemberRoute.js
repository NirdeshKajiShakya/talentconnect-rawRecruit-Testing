import express from 'express';
import secureRoute from '../middlewares/secureRoute.js';
import { acceptInvitation, declineInvitation, getCompanyMember, getMyActiveCompanies, getPendingInvitations, getTeamMembers, inviteTeamMember, leaveCompany, removeTeamMember, searchEmployers, switchActiveProfile } from '../controllers/teamMember.controller.js';


const router = express.Router() ;

router.get('/search-employers' , secureRoute, searchEmployers);

router.post('/invite' , secureRoute , inviteTeamMember) ;

router.post('/accept-invitation' , secureRoute , acceptInvitation) ;
router.get('/list-members', secureRoute,  getTeamMembers);
router.get('/pending-invitations' , secureRoute , getPendingInvitations)

router.get('/my-companies' , secureRoute , getMyActiveCompanies) ;
router.post('/switch-profile' , secureRoute , switchActiveProfile) ;

router.get('/companies-member', secureRoute, getCompanyMember);
router.delete('/leave/:companyId', secureRoute, leaveCompany) ;
router.delete('/remove/:memberId' , secureRoute , removeTeamMember) ;
router.post('/invitations/:id/decline', secureRoute, declineInvitation);
export default router ;