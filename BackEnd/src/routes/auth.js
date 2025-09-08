// src/routes/auth.js
import express from 'express';
import { signup, login, allUsers, logout } from '../controllers/authentication/manualAuth.js';
import { googleAuth } from '../controllers/authentication/googleAuthController.js';
import {  handleLinkedInCallback, redirectToLinkedIn } from '../controllers/authentication/LinkedInAuth.js';
import {
  sendResetLink,
  resetPassword
} from '../controllers/authentication/forgotPasswordController.js';
import secureRoute from "../middlewares/secureRoute.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/linkedin', redirectToLinkedIn);
router.get('/linkedin/callback', handleLinkedInCallback)
router.post('/forgot-password', sendResetLink);
router.post('/reset-password/:token', resetPassword);
router.get("/allusers" , secureRoute , allUsers) ;
router.post("/logout", logout) ;

// // routes/auth.js
// router.get("/current-user",secureRoute, (req, res) => {
//   res.json({ user: req.user });
// });


export default router;
