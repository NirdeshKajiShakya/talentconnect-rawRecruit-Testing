import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// DB & Socket
import Connection from "../config/Db.js";
import { app, server } from "./socketIO/server.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - This must be the first logic that needs env vars
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// dotenv.config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.PORT || 5000;


// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth and Profile Routes
import authRoutes from "./routes/authRoute.js";
import uploadRoutes from "./routes/uploadRoutesRoute.js";
import studentProfileRoutes from "./routes/studentProfileRoutes.js";
import fresherProfileRoutes from "./routes/fresherProfileRoutes.js";
import professionalProfileRoutes from "./routes/professionalProfileRoutes.js";
import companyProfileRoutes from "./routes/companyDashboard/companyProfileRoutes.js";
import collegeProfileRoutes from "./routes/collegeDashboard/collegeProfileRoutes.js";
import collegeOnboardingRoutes from "./routes/collegeDashboard/collegeOnboardingRoutes.js";
//import employerProfileRoutes from "./routes/employerProfileRoutes.js";
import employerProfileRoutes from './routes/employerDashboard/employerProfileRoute.js'
import messageRoute from "./routes/messageRoute.js";

// Main Features
import Jobs from "./routes/jobsRoute.js";
import Internship from "./routes/internshipRoute.js";
import Application from "./routes/applicationRoute.js";
import Resume from "./routes/resumeRoute.js";
import Hackathon from "./routes/hackathonRoute.js";
import EmployerDashboard from "./routes/employerDahsboardRoute.js";
import Company from "./routes/companyRoute.js";

// RawRecruit APIs
// import savedJobsRouter from "./routes/savedjobsandinternshipsRoute.js";
import serviceRequestRouter from "./routes/servicerequestRoute.js";
import servicerequestinterview from "./routes/servicerequestInterviewRoute.js";
import servicerequestreferraljobs from "./routes/servicerequestReferraljobsRoute.js";
import servicerequest_offcampusinfo from "./routes/servicerequestOffcampusinfoRoute.js";
import servicerequest_offcampusregister from "./routes/servicerequestOffcampusregisterRoute.js";
import servicerequest_oncampusinfo from "./routes/servicerequestOncampusinfoRoute.js";
import servicerequest_oncampusregister from "./routes/servicerequestOncampusregisterRoute.js";
import servicerequest_ondemandtraining from "./routes/servicerequestOndemandtrainingRoute.js";
import servicerequest_oncampusplacement from "./routes/servicerequestOncampusplacementRoute.js";
import servicerequest_studenttraining from "./routes/servicerequestStudenttrainingRoute.js";
import studentroute from "./routes/studentRoute.js";
import application_to_admin from "./routes/applicationToAdminRoute.js";
import uploadResumeRoute from "./routes/uploadresumeRoute.js";
// import manage_application from "./routes/manage_applicationRoute.js";
// import jobapplication from "./routes/jobApplication.js";
// import registeroncampus from "./controllers/registeredcandidates_oncampusapplication.js";
import servicerequest from "./routes/servicerequestCompanyWorkforcesolutionsRoute.js";
import employeetraining from "./routes/servicerequestCompanyEmployeetrainingRoute.js";
import branding from "./routes/servicerequestCompanyBrandingRoute.js";
import employeerbranding from "./routes/servicerequestCompanyEmployeerbrandingRoute.js";
import oncampushiring from "./routes/hiringChannelsOncampusRoute.js";
import oncampusregister from "./routes/hiringChannelsOncampusRegisterRoute.js";
import internship from "./routes/hiringChannelsPostinternshipsRoute.js";
import jobs from "./routes/hiringChannelsPostjobRoute.js";
import seminars from "./routes/servicerequestCollegeSeminarsRoute.js";
import requestinfo from "./routes/servicerequestCollegeStudenttrainingRequestinfoRoute.js";
import collegeoncampus from "./routes/servicerequestCollegeOncampusRoute.js";
import collegerequestinfo from "./routes/servicerequestCollegeOncampusrequestRoute.js";
// import additionalinfo from "./routes/onboardingAdditionalinfoRoute.js";
// import preferences from "./routes/onboardingPreferencesRoute.js";
// import education from "./routes/onboardingEducationRoute.js";
import basicdetails from "./routes/onboardingBasicdetailsRoute.js";
// import resume from "./routes/onboardingResumeRoute.js";
import CollegeApplication from './routes/collegeApplicationRoute.js';
// import jobinterest from "./routes/onboardingJobinterestsRoute.js";
import student_onboardingroutes from "./routes/studentOnboardingRoutes.js";
import hiringOffCampus from "./routes/hiringChannelsOffCampusRoute.js";
import HiringChannelPoolCampusRoute from "./routes/hiringChannelPoolCapusRoute.js";
import JobManagement from "./routes/jobManagementRoute.js"
import poolCampusRoute from "./routes/jobManagement/poolCampusRoute.js";
import OncampusJobmanagement from "./routes/jobManagement/onCampusRoute.js"
import TeamMemberRoute from "./routes/teamMemberRoute.js";
import notificationRoute from "./routes/notificationRoute.js"

// import onCampusHiring from './routes/employerHiringChannel/hiringChannel.route.js'
import jobPosting from './routes/jobPostingsRoute.js' ;
import studentDashboardRoute from './routes/studentDashboard/studentDashboardRoute.js';
import EmployerHiringChannelRoute from './routes/employerHiringChannel/hiringChannelRoute.js'
import CollegeJobManagement from "./routes/collegeJobManageRoute.js" ;

app.use("/api/auth", authRoutes);
app.use("/api", student_onboardingroutes);
app.use("/api/hiring-channels", jobPosting);
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

//student dashboard
app.use("/api/student-dashboard", studentDashboardRoute);

// employer Hiring channel
app.use("/api/employer/hiring-channel", EmployerHiringChannelRoute);
//app.use("/api/HiringChannels" , onCampusHiring) ;
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
app.use('/college/jobmanagement',CollegeJobManagement) ;

// RawRecruit API Mounts
app.use("/api/rawrecruit", [
  // savedJobsRouter,
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
  // manage_application,
  // jobapplication,
  // registeroncampus,
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
  // additionalinfo,
  // preferences,
  // education,
  // resume,
]);
app.use("/api/rawrecruit/resume", uploadResumeRoute);
app.use("/rawrecruit/link", basicdetails);
// app.use("/rawrecruit", jobinterest);

// Start the server
server.listen(PORT, async () => {
  console.log(`Server is running on PORT: ${PORT}`);
  await Connection();
});
