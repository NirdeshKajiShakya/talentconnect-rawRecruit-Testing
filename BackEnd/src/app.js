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
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import fresherProfileRoutes from "./routes/fresherProfileRoutes.js";
import professionalProfileRoutes from "./routes/professionalProfileRoutes.js";
import companyProfileRoutes from "./routes/companyDashboard/companyProfileRoutes.js";
import collegeProfileRoutes from "./routes/collegeDashboard/collegeProfileRoutes.js";
import collegeOnboardingRoutes from "./routes/collegeDashboard/collegeOnboardingRoutes.js";
//import employerProfileRoutes from "./routes/employerProfileRoutes.js";
import employerProfileRoutes from './routes/employerDashboard/employerProfile.route.js'
import messageRoute from "./routes/message.route.js";

// Main Features
import Jobs from "./routes/Jobs.route.js";
import Internship from "./routes/Internship.route.js";
import Application from "./routes/Application.route.js";
import Resume from "./routes/Resume.route.js";
import Hackathon from "./routes/Hackathon.route.js";
import EmployerDashboard from "./routes/EmployerDahsboard.route.js";
import Company from "./routes/Company.route.js";

// RawRecruit APIs
import savedJobsRouter from "./routes/savedjobsandinternships.js";
import serviceRequestRouter from "./routes/servicerequest.js";
import servicerequestinterview from "./routes/servicerequest_interview.js";
import servicerequestreferraljobs from "./routes/servicerequest_referraljobs.js";
import servicerequest_offcampusinfo from "./routes/servicerequest_offcampusinfo.js";
import servicerequest_offcampusregister from "./routes/servicerequest_offcampusregister.js";
import servicerequest_oncampusinfo from "./routes/servicerequest_oncampusinfo.js";
import servicerequest_oncampusregister from "./routes/servicerequest_oncampusregister.js";
import servicerequest_ondemandtraining from "./routes/servicerequest_ondemandtraining.js";
import servicerequest_oncampusplacement from "./routes/servicerequest_oncampusplacement.js";
import servicerequest_studenttraining from "./routes/servicerequest_studenttraining.js";
import studentroute from "./routes/student.route.js";
import application_to_admin from "./routes/application_to_admin.js";
import uploadResumeRoute from "./routes/uploadresume.js";
import manage_application from "./routes/manage_application.js";
import jobapplication from "./routes/jobapplication.js";
import registeroncampus from "./controllers/registeredcandidates_oncampusapplication.js";
import servicerequest from "./routes/servicerequest_company_workforcesolutions.js";
import employeetraining from "./routes/servicerequest_company_employeetraining.js";
import branding from "./routes/servicerequest_company_branding.js";
import employeerbranding from "./routes/servicerequest_company_employeerbranding.js";
import oncampushiring from "./routes/hiringchannels_oncampus.js";
import oncampusregister from "./routes/hiringchannels_oncampus_register.js";
import internship from "./routes/hiringchannels_postinternships.js";
import jobs from "./routes/hiringchannels_postjob.js";
import seminars from "./routes/servicerequest_college_seminars.js";
import requestinfo from "./routes/servicerequest_college_studenttraining_requestinfo.js";
import collegeoncampus from "./routes/servicerequest_college_oncampus.js";
import collegerequestinfo from "./routes/servicerequest_college_oncampusrequest.js";
import additionalinfo from "./routes/onboarding_additionalinfo.js";
import preferences from "./routes/onboarding_preferences.js";
import education from "./routes/onboarding_education.js";
import basicdetails from "./routes/onboarding_basicdetails.js";
import resume from "./routes/onboarding_resume.js";
import CollegeApplication from './routes/CollegeApplication.route.js';
import jobinterest from "./routes/onboarding_jobinterests.js";
import student_onboardingroutes from "./routes/student_onboardingroutes.js";
import hiringOffCampus from "./routes/hiringChannelsOffCampus.js";
import HiringChannelPoolCampusRoute from "./routes/hiringChannelPoolCapusRoute.js";
import JobManagement from "./routes/jobManagementRoute.js"
import poolCampusRoute from "./routes/jobManagement/poolCampusRoute.js";
import OncampusJobmanagement from "./routes/jobManagement/onCampusRoute.js"
import TeamMemberRoute from "./routes/teamMemberRoute.js";
import notificationRoute from "./routes/notificationRoute.js"
// employer Hiring channel
import onCampusHiring from './routes/employerHiringChannel/hiringChannel.route.js'
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
