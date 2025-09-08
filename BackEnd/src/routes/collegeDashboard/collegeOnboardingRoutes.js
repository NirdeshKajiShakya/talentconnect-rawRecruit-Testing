import express from 'express';
import multer from 'multer';
import { getCollegeOnboardingByUserId, submitCollegeOnboarding } from '../../controllers/collegeDashboard/collegeOnboardingController.js';
import secureRoute from '../../middlewares/secureRoute.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/submit-onboarding',
  secureRoute, // Apply your authentication middleware
  upload.fields([
    { name: 'collegeBrochure', maxCount: 1 },
    { name: 'profileImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 }
  ]),
  submitCollegeOnboarding
);

router.get('/profile-data', secureRoute , getCollegeOnboardingByUserId);

export default router;
