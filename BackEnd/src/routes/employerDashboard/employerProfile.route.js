import express from 'express';
import multer from 'multer';
import { createEmployerOnboarding, getEmployerOnboarding, updateEmployerOnboarding, uploadSingleImage } from '../../controllers/employerDashboard/employerProfileController.js';
import secureRoute from '../../middlewares/secureRoute.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Expected form fields with file
const fileFields = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]);

router.post('/employerOnboarding', secureRoute, fileFields, createEmployerOnboarding);
router.get('/employer-data', secureRoute, getEmployerOnboarding);
router.put('/update-employer', secureRoute, fileFields, updateEmployerOnboarding);
router.post('/upload-single-image', secureRoute, upload.single('image'), uploadSingleImage);
export default router;
