import express from 'express';
import multer from 'multer';
import { createProfessionalProfile } from '../controllers/professionalProfileController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'degreeCertificate', maxCount: 1 },
    // Dynamic: workExperience_0, workExperience_1, etc.
    // Dynamic: internationalWorkExperience_0, leadershipExperience_0, etc.
  ]),
  createProfessionalProfile
);

export default router;
