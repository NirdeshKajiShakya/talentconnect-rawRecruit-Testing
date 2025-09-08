import express from 'express';
import multer from 'multer';
import { createCollegeProfile } from '../../controllers/collegeDashboard/collegeProfileController.js'

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/college-profile',
  upload.fields([
    { name: 'collegeImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'coordinatorImage', maxCount: 1 },
    { name: 'collegeBrochure', maxCount: 1 }
  ]),
  createCollegeProfile
);

export default router;