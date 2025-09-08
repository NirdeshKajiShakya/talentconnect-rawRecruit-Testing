import express from 'express';
import multer from 'multer';
import { createFresherProfile } from '../controllers/fresherProfileController.js';

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
  ]),
  createFresherProfile
);

export default router;
