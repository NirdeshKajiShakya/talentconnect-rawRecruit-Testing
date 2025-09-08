// import express from 'express';
// import { createEmployerProfile } from '../controllers/employerDashboard/employerProfileController.js';
// import {
//   updateEmployerUserDetails,
//   getTeamMembers,
//   addTeamMember,
//   getTeamMemberByEmail,
//   updateTeamMemberByEmail,
//   deleteTeamMemberByEmail,
// } from '../controllers/employerDashboard/EmployerUsers.js';
// import multer from 'multer';

// const router = express.Router();

// // Set multer to use memory storage (buffer)
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // 🏁 1. Create Employer Profile (initial registration + verification docs)
// router.post(
//   '/create',
//   upload.fields([
//     { name: 'verificationDocuments', maxCount: 5 }
//   ]),
//   createEmployerProfile
// );

// // 🛠 2. Update Employer User Details (Page 1 - includes images)
// router.put(
//   '/user-details',
//   upload.fields([
//     { name: 'backgroundImage', maxCount: 1 },
//     { name: 'profilePicture', maxCount: 1 }
//   ]),
//   updateEmployerUserDetails
// );

// // 👥 3. Team Members Routes (Page 2)
// router.get('/team-members', getTeamMembers);
// router.post('/team-members', addTeamMember);
// router.get('/team-members/:email', getTeamMemberByEmail); // ✅ Get one by email
// router.put('/team-members-by-email', updateTeamMemberByEmail); // 🔄 Update
// router.delete('/team-members-by-email', deleteTeamMemberByEmail); // ❌ Delete
// export default router;
// // 