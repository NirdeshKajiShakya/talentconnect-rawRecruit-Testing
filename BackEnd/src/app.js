import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// DB & Socket
import Connection from "../config/Db.js";
import { app, server } from "./SocketIO/server.js";
// *** IMPORTANT: Define __filename and __dirname BEFORE dotenv.config() ***
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - This must be the first logic that needs env vars
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// dotenv.config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.PORT || 5000;
// Load environment variables
// dotenv.config({ path: path.resolve(__dirname, '../.env') });
// const PORT = process.env.PORT || 5000;
// console.log('Backend server starting...');
// console.log(`DEBUG: process.env.JWT_SECRET is: ${process.env.JWT_SECRET ? 'DEFINED' : 'UNDEFINED'}`);
// console.log(`DEBUG: Length of JWT_SECRET: ${process.env.JWT_SECRET?.length || 'N/A'}`);
// console.log(`DEBUG: PORT is: ${process.env.PORT}`);

// Middleware
// The corrected configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth and Profile Routes
import authRoutes from "./Routes/auth.js";
import uploadRoutes from "./Routes/uploadRoutes.js";
import studentProfileRoutes from "./Routes/studentProfileRoutes.js";
import fresherProfileRoutes from "./Routes/fresherProfileRoutes.js";
import professionalProfileRoutes from "./Routes/professionalProfileRoutes.js";
import companyProfileRoutes from "./Routes/companyDashboard/companyProfileRoutes.js";
import collegeProfileRoutes from "./Routes/collegeDashboard/collegeProfileRoutes.js";
import collegeOnboardingRoutes from "./Routes/collegeDashboard/collegeOnboardingRoutes.js";
//import employerProfileRoutes from "./Routes/employerProfileRoutes.js";
import employerProfileRoutes from './Routes/employerDashboard/employerProfile.route.js'
import messageRoute from "./Routes/message.route.js";

// Main Features
import Jobs from "./Routes/Jobs.route.js";
import Internship from "./Routes/Internship.route.js";
import Application from "./Routes/Application.route.js";
import Resume from "./Routes/Resume.route.js";
import Hackathon from "./Routes/Hackathon.route.js";
import EmployerDashboard from "./Routes/EmployerDahsboard.route.js";
import Company from "./Routes/Company.route.js";

// RawRecruit APIs
import savedJobsRouter from "./Routes/savedjobsandinternships.js";
import serviceRequestRouter from "./Routes/servicerequest.js";
import servicerequestinterview from "./Routes/servicerequest_interview.js";
import servicerequestreferraljobs from "./Routes/servicerequest_referraljobs.js";
import servicerequest_offcampusinfo from "./Routes/servicerequest_offcampusinfo.js";
import servicerequest_offcampusregister from "./Routes/servicerequest_offcampusregister.js";
import servicerequest_oncampusinfo from "./Routes/servicerequest_oncampusinfo.js";
import servicerequest_oncampusregister from "./Routes/servicerequest_oncampusregister.js";
import servicerequest_ondemandtraining from "./Routes/servicerequest_ondemandtraining.js";
import servicerequest_oncampusplacement from "./Routes/servicerequest_oncampusplacement.js";
import servicerequest_studenttraining from "./Routes/servicerequest_studenttraining.js";
import studentroute from "./Routes/student.route.js";
import application_to_admin from "./Routes/application_to_admin.js";
import uploadResumeRoute from "./Routes/uploadresume.js";
import manage_application from "./Routes/manage_application.js";
import jobapplication from "./Routes/jobapplication.js";
import registeroncampus from "./controllers/registeredcandidates_oncampusapplication.js";
import servicerequest from "./Routes/servicerequest_company_workforcesolutions.js";
import employeetraining from "./Routes/servicerequest_company_employeetraining.js";
import branding from "./Routes/servicerequest_company_branding.js";
import employeerbranding from "./Routes/servicerequest_company_employeerbranding.js";
import oncampushiring from "./Routes/hiringchannels_oncampus.js";
import oncampusregister from "./Routes/hiringchannels_oncampus_register.js";
import internship from "./Routes/hiringchannels_postinternships.js";
import jobs from "./Routes/hiringchannels_postjob.js";
import seminars from "./Routes/servicerequest_college_seminars.js";
import requestinfo from "./Routes/servicerequest_college_studenttraining_requestinfo.js";
import collegeoncampus from "./Routes/servicerequest_college_oncampus.js";
import collegerequestinfo from "./Routes/servicerequest_college_oncampusrequest.js";
import additionalinfo from "./Routes/onboarding_additionalinfo.js";
import preferences from "./Routes/onboarding_preferences.js";
import education from "./Routes/onboarding_education.js";
import basicdetails from "./Routes/onboarding_basicdetails.js";
import resume from "./Routes/onboarding_resume.js";
import CollegeApplication from './Routes/CollegeApplication.route.js';
import jobinterest from "./Routes/onboarding_jobinterests.js";
import student_onboardingroutes from "./Routes/student_onboardingroutes.js";
import hiringOffCampus from "./Routes/hiringChannelsOffCampus.js";
import HiringChannelPoolCampusRoute from "./Routes/hiringChannelPoolCapusRoute.js";
import JobManagement from "./Routes/jobManagementRoute.js"
import poolCampusRoute from "./Routes/jobManagement/poolCampusRoute.js";
import OncampusJobmanagement from "./Routes/jobManagement/onCampusRoute.js"
import TeamMemberRoute from "./Routes/teamMemberRoute.js";
import notificationRoute from "./Routes/notificationRoute.js"
// employer Hiring channel
import onCampusHiring from './Routes/employerHiringChannel/hiringChannel.route.js'
// Core API Mounts
app.use("/api/auth", authRoutes);
app.use("/api", student_onboardingroutes);

app.use("/api/upload", uploadRoutes);
app.use("/api/student-profile", studentProfileRoutes);
app.use("/api/fresher-profile", fresherProfileRoutes);
app.use("/api/professional-profile", professionalProfileRoutes);
app.use("/api/companyDashboard", companyProfileRoutes);
app.use("/api/college", collegeProfileRoutes);
app.use("/api/college-onboarding", collegeOnboardingRoutes);
app.use("/api/dashboard", employerProfileRoutes);
app.use("/api/messages", messageRoute);
app.use("/api/company" , hiringOffCampus)
app.use("/api/hiringDrive", HiringChannelPoolCampusRoute);
app.use("/api/company" , poolCampusRoute);
app.use("/api/company/jobmanagement", OncampusJobmanagement);
app.use("/api/team-member" , TeamMemberRoute) ;
app.use("/api/notifications" , notificationRoute )

// employer Hiring channel
app.use("/api/HiringChannels" , onCampusHiring) ;
// Feature Routes
app.use("/jobs", Jobs);
app.use("/internship", Internship);
app.use("/application", Application);
app.use("/college/application",CollegeApplication);
app.use("/hackathon", Hackathon);
app.use("/company/dashboard", EmployerDashboard);
app.use("/company/dashboard/resume", Resume);
app.use("/company", Company);
app.use('/company/jobmanagement',JobManagement);

// RawRecruit API Mounts
app.use("/api/rawrecruit", [
  savedJobsRouter,
  serviceRequestRouter,
  servicerequestinterview,
  servicerequestreferraljobs,
  servicerequest_offcampusinfo,
  servicerequest_offcampusregister,
  servicerequest_oncampusinfo,
  servicerequest_oncampusregister,
  servicerequest_ondemandtraining,
  servicerequest_oncampusplacement,
  servicerequest_studenttraining,
  studentroute,
  application_to_admin,
  manage_application,
  jobapplication,
  registeroncampus,
  servicerequest,
  employeetraining,
  branding,
  employeerbranding,
  oncampushiring,
  oncampusregister,
  internship,
  jobs,
  seminars,
  requestinfo,
  collegeoncampus,
  collegerequestinfo,
  additionalinfo,
  preferences,
  education,
  resume,
]);
// app.use("/api/upload/resume", uploadResumeRoute);
// Remove /resume from the use() path
app.use("/api/upload", uploadResumeRoute);
app.use("/rawrecruit/link", basicdetails);
app.use("/rawrecruit", jobinterest);


// Start the server
server.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
  await Connection();
});
