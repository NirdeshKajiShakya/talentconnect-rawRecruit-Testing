import express from "express";
import {
  getAllOnboardingForms,
  submitOnboardingForm,
  getOnboardingForm,
  updateOnboardingForm,
} from "../controllers/studentOnboardingController.js";
import secureRoute from "../middlewares/secureRoute.js"; // Import your secureRoute middleware
import multer from "multer"; // Assuming you are using multer for file uploads

const router = express.Router();

// Configure Multer for file uploads (still needed to parse incoming files as buffers)
const storage = multer.memoryStorage(); // Store files in memory temporarily
const upload = multer({ storage: storage });

// Apply secureRoute to routes that require authentication
router.get("/onboarding", secureRoute, getAllOnboardingForms);

router.post(
  "/onboarding",
  secureRoute, // Apply secureRoute here
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "project", maxCount: 1 },
    // { name: "experienceCertificate", maxCount: 5 }, // Allow multiple experience certificates
    { name: "profileImage", maxCount: 1 }, // Added for profile image upload
    { name: "backgroundImage", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 10 },
    { name: "leadershipCertificate", maxCount: 10 },
    { name: "internationalExperienceCertificate", maxCount: 10 },
      { name: "awardCertificate", maxCount: 10 }, // Added for background image upload
  ]),
  submitOnboardingForm
);

router.get("/onboarding/me", secureRoute, getOnboardingForm);

router.put(
  "/onboarding/update",
  secureRoute, // Apply secureRoute here
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "degreeCertificate", maxCount: 1 },
    { name: "project", maxCount: 2 },
    { name: "experienceCertificate", maxCount: 5 },
    { name: "profileImage", maxCount: 1 }, // Added for profile image update
    { name: "backgroundImage", maxCount: 1 },
    { name: "experienceCertificate", maxCount: 10 },
    { name: "leadershipCertificate", maxCount: 10 },
    { name: "internationalExperienceCertificate", maxCount: 10 }, // Added for background image update
  ]),
  updateOnboardingForm
);



export default router;