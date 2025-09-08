// src/routes/studentProfileRoutes.js
import express from 'express';
import multer from 'multer';
import { createStudentProfile } from '../controllers/studentProfileController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define multiple file fields with optional files
const cpUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 },
  { name: 'resume', maxCount: 1 },
  { name: 'degreeCertificate', maxCount: 1 },
]);

router.post('/', cpUpload, createStudentProfile);

export default router;