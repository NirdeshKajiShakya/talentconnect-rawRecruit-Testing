
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import FormProvider from "./pages/fresher/onbordingForms/FormContext";
import { AppProvider } from "./pages/fresher/editAndReview/AppContext";
import { AdminProvider } from "./context/AdminProvider";
// Layout
import Layout from "./components/layout/Layout";
// ---------------------------> change from muhammad <---------------------------------------
// import AdminRoute from "./components/AdminRoute";
// ---------------------------> change from muhammad <---------------------------------------
import AdminRoutes from "./routes/Adminroutes";

// Pages - Auth
import RoleSelection from "./pages/auth/GetStarted";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
// ---------------------------> change from muhammad <---------------------------------------
// import AdminLogin from "./pages/admin/adminAuth/adminLogin";
// import AdminSignup from "./pages/admin/adminAuth/adminSignup";
// ---------------------------> change from muhammad <---------------------------------------

// Pages - Dashboard
// import AdminDashboard from "./pages/admin/dashboard/adminDashboard";
import Dashboard from "./pages/students/Dashboard";
import UnifiedDashboard from "./pages/UnifiedDashboard";
import Profile from "./pages/students/Profile";
// import SavedJobs from "./pages/students/SavedJobs";
// import StudentDashboard from "./pages/students/StudentDashboard";
// import ServiceRequests from "./pages/students/ServiceRequests";
// import ApplicationStatus from "./pages/students/ApplicationStatus";
// import JobSearch from "./pages/students/JobSearch";
import Settings from "./pages/Setting";
import NotFound from "./pages/NotFound";

// company
import CompanyRegistration from "./components/company/editform/CompanyRegistration";
import HiringPreferences from "./components/company/editform/HiringPreferences";
import CompanyVerification from "./components/company/editform/CompanyVerification";
import ReviewDetails from "./components/company/editform/ReviewDetails";
import EmployerIntroduction from "./components/company/editform/EmployerIntroduction";

import CompanyProfile from "./pages/company/dashboard/CompanyProfile";


import FormContainer from "./components/company/FormContainer";

// COllege 
import OnboardingFlow from "./pages/college/onboardingForm/OnboardingFlow";
import CollegeProfile from "./pages/college/dashboard/CollegeProfile";
import EditOnboardingFlow from "./pages/college/editForm/EditOnboardingFlow";

import CollegeDetailsPage from "./pages/company/employerDashboard/CollegeDetailPage";
import CollegeListingPage from "./pages/company/employerDashboard/CollegeListingPage";


import Index from "./pages/Index";


import WelcomePage from "./components/onboarding/editFormStep/ReviewEdit";
import { EditStepOne } from "./components/onboarding/editFormStep/EditStepOne";
import { EditStepTwo } from "./components/onboarding/editFormStep/EditStepTwo";
import { EditStepThree } from "./components/onboarding/editFormStep/EditStepThree";
import { EditStepFour } from "./components/onboarding/editFormStep/EditStepFour";
import { EditStepFive } from "./components/onboarding/editFormStep/EditStepFive";
import { Confirmation } from "./components/onboarding/editFormStep/confirmEdit";



// Fresher 
import formRoutes from "./pages/fresher/onbordingForms/route"
import EditRoutes from "./pages/fresher/editAndReview/route"
import OffCampus from "./pages/company/hiringChannels/offCampusHiring/OffCapus";
import PoolCampus from "./pages/company/hiringChannels/poolCampusHiring/PoolCampus";
import PostIntership from "./pages/company/hiringChannels/postInternship/CreateIntership";
import JobRoutes from "./components/common/savedJob/JobRoutes";
import ContactUs from "./pages/contact/ContactUs";
import NotificationSettings from "./pages/profileDropdown/Notification";
import FAQPage from "./pages/profileDropdown/FaqPage";
import ResumeApp from "./components/company/employerDashboard/resumeSearch/ResumeApp";

import Hackathon from "./pages/students/studentDashboard/hackathon/Hackthon";
import Detail from "./pages/students/studentDashboard/hackathon/Detail";
import HackathonRegistration from "./pages/students/studentDashboard/hackathon/HackathonRegistration";
import JobListings from "./pages/students/studentDashboard/jobListing/JobListings";
import JobDetails from "./pages/students/studentDashboard/jobListing/JobDetails";
import OffCampusJobListings from "./pages/students/studentDashboard/offCampusListing/offCampusJobListing";
import OffCampusJobDetail from "./pages/students/studentDashboard/offCampusListing/OffCampusJobDetail";
import JobTracker from "./components/student/applicationStatus/jobListings/JobTracker";
import InterviewScheduler from "./components/company/interview/InterviewSchedule";
// import JobManagement from "./pages/college/JobManagement/OnCampusListing/OnCampusJobManagement";
// import ShortlistedDrives from "./components/company/shortlistedCollege/onCampusListing/ShortlistedDrives";
import ShortlistedDrivesPage from "./pages/company/shortlistedCollege/onCampusListing/ShortlistedDrivesPage";
import DriveDetailPage from "./pages/company/shortlistedCollege/onCampusListing/DriveDetailPage";
import OffCampusListingPage from "./pages/company/shortlistedCollege/offCampusListing/OffCampusListingPage";
import JobListingPage from "./pages/company/shortlistedCollege/jobListing/JoblistingPage";
import PoolCampusShortlistDrive from "./pages/company/shortlistedCollege/poolCampusListing/PoolCampusShortlistDrive";
import PoolCampusDetailPage from "./pages/company/shortlistedCollege/poolCampusListing/PoolCampusDetailPage";
import AcceptedShortlistDrive from "./pages/company/acceptedCollegeOrCandidate/onCampus/AcceptedShortlistDrive";
import AcceptedDriveDetail from "./pages/company/acceptedCollegeOrCandidate/onCampus/AcceptedDriveDetail";
import AcceptedPoolShortlist from "./pages/company/acceptedCollegeOrCandidate/poolCampus/AcceptedPoolShortlist";
import AcceptedPoolDriveDetail from "./pages/company/acceptedCollegeOrCandidate/poolCampus/AcceptedPoolDriveDetail";
import EmployerAcceptedPoolShortlist from "./pages/employer/acceptedCollegeOrCandidate/poolCampus/AcceptedPoolShortlist";
import EmployerAcceptedPoolDriveDetail from "./pages/employer/acceptedCollegeOrCandidate/poolCampus/AcceptedPoolDriveDetail";
import AcceptedJobList from "./pages/company/acceptedCollegeOrCandidate/jobListings/AcceptedJobList";
import EmployerAcceptedJobList from "./pages/employer/acceptedCollegeOrCandidate/jobListings/AcceptedJobList";
import JobManagement from "./pages/company/jobManagement/onCampusListing/OnCampusJobManagement";
import AcceptedOffCampusList from "./pages/company/acceptedCollegeOrCandidate/offCampus/AcceptedOffCampusList";
import EmployerAcceptedOffCampusList from "./pages/employer/acceptedCollegeOrCandidate/offCampus/AcceptedOffCampusList";
import PoolCampusJobManagement from "./pages/company/jobManagement/poolCampusListing/PoolCampusJobManagement";
import OffCampusJobManagement from "./pages/company/jobManagement/offCampusListing/OffCampusJobmanagement";

import JobManagements from "./pages/college/manageApplication/CampusPlacement/JobManagement";
import JobDetail from "./pages/college/manageApplication/CampusPlacement/JobDetail";
import CollegeOncampusApplicationStatus from "./pages/college/applicationStatus/OncampusApplicationStatus";
import CollegePoolcampusApplicationStatus from "./pages/college/applicationStatus/PoolcampusApplicationStatus";
import { JobProvider } from "./context/College/JobManagement/JobContext";
import { ApplicationProvider } from "./context/College/Registered/ApplicationContext";
import ApplicationsPage from "./pages/college/registered/oncampus/ApplicationPage";
import PoolApplicationDetailPage from "./pages/college/registered/poolcampus/PoolApplicationDetailPage";
import InternApplicationsPage from "./pages/college/registered/internship/InternApplicationPage";
import InternDetailPage from "./pages/college/registered/internship/InternDetailPage";
import PoolApplicationsPage from "./pages/college/registered/poolcampus/PoolApplication";
import ApplicationDetailPage from "./pages/college/registered/oncampus/ApplicationDetailPage";
import JobsListingPage from "./pages/college/collegeDashboard/onCampusOpportunity/JobListingPage";
import JobDetailPage from "./pages/college/collegeDashboard/onCampusOpportunity/JobDetailPage";
import InternJobsListingPage from "./pages/college/collegeDashboard/intershipOpportunity/InternJobListingPage";
import InternJobDetailPage from "./pages/college/collegeDashboard/intershipOpportunity/InternJobDetailPage";
import PoolJobListingPage from "./pages/college/collegeDashboard/poolCampusOpportunity/PoolJobListingPage";
import PoolJobDetailsPage from "./pages/college/collegeDashboard/poolCampusOpportunity/PoolJobDetailPage";
import InternJobListings from "./pages/students/studentDashboard/internshipOpportunity/InternJobListing";
import InternJobDetails from "./pages/students/studentDashboard/internshipOpportunity/InternJobDetails";
import CareerCraft from "./pages/students/serviceRequest/CareerCraft";
import Counselling from "./pages/students/serviceRequest/Counselling";
import MockInterview from "./pages/students/serviceRequest/Mock_Interview";
import OffcampusStatus from "./components/student/applicationStatus/offCampusListing/OffcampusStatus";
import InternshipStatus from "./components/student/applicationStatus/intershipOpportunities/InternshipStatus";
import RefferralJobStatus from "./components/student/applicationStatus/referralJobs/RefferralJobStatus";
import EventStatus from "./components/student/applicationStatus/events/EventStatus";
import AIDrivenJob from "./components/student/aiDrivenJobSearch/AIDrivenJob";
import Workforce from "./pages/company/serviceRequest/workforceSolution/workforce";
import EmployeeTraining from "./pages/company/serviceRequest/employeeTraining/EmployeeTraining";
import Branding from "./pages/company/serviceRequest/branding/Branding";

import HostHackathon from "./pages/company/hosting/HostHackathon";
import HostWorkshop from "./pages/company/hosting/HostWorkshop";
import HostCasestudies from "./pages/company/hosting/HostCasestudies";

// Hosting Management
import HostingManagement from "./pages/company/hostingManagement/HostingManagement";
import HackathonRegistrations from "./pages/company/hostingManagement/HackathonRegistrations";
import CasestudyRegistrations from "./pages/company/hostingManagement/CasestudyRegistrations";

import OnCampusJobManagement from "./pages/company/jobManagement/onCampusListing/OnCampusJobManagement";
import JobListingJobManagement from "./pages/company/jobManagement/jobListing/JobListingJobManagement";
import CampusPlacement from "./pages/college/serviceRequest/campusPlacement/CampusPlacement";
import StudentTraining from "./pages/college/serviceRequest/studentTraining/StudentTaining";
import Seminar from "./pages/college/serviceRequest/seminars/Seminar";
import JobManagementApplication from "./pages/college/manageApplication/CampusPlacement/JobManagement";
import PostJob from "./pages/company/hiringChannels/postJob/CreateJob";
import OnCampusHiring from "./pages/company/hiringChannels/onCampusHiring/OnCampusHiring";
import PoolEmployeeListing from "./pages/company/employerDashboard/poolCampus/PoolEmployeeListing";
import PoolCampusEmployeeDash from "./pages/company/employerDashboard/poolCampus/PoolCampusEmployerDash";

import FresherCareerCraft from "./pages/fresher/serviceRequest/CareerCraft";
import FresherMockInterview from "./pages/fresher/serviceRequest/Mock_Interview";
import FresherCounselling from "./pages/fresher/serviceRequest/Counselling";
import FresherDashboard from "./pages/fresher/Dashboard";
import Fresher_Profile from "./pages/fresher/FresherProfile";
import FJobListings from "./pages/fresher/fresherDashboard/jobListing/JobListings";
import FJobDetails from "./pages/fresher/fresherDashboard/jobListing/JobDetails";
import FInternJobListings from "./pages/fresher/fresherDashboard/internshipOpportunity/InternJobListing";
import FInternJobDetails from "./pages/fresher/fresherDashboard/internshipOpportunity/InternJobDetails";
import FOffCampusJobDetail from "./pages/fresher/fresherDashboard/offCampusListing/OffCampusJobDetail";
import FOffCampusJobListings from "./pages/fresher/fresherDashboard/offCampusListing/offCampusJobListing";
import FresherHackathon from "./pages/fresher/fresherDashboard/hackathon/Hackthon";
import FresherDetail from "./pages/fresher/fresherDashboard/hackathon/Detail";
import ManageReferralJobs from "./pages/professional/serviceRequest/ManageReferralJobs";
import RefPostingPage from "./pages/professional/serviceRequest/refpostingpage";
import PostReferralJobPage from "./pages/professional/serviceRequest/postreferral";
import TotalApplicantsPage from "./pages/professional/serviceRequest/TotalApplicantsPage";
import OffCampusApplicant from "./pages/professional/serviceRequest/OffcampusApplicant";
import ProfDashboard from "./pages/professional/Dashboard";
import ProfProfile from "./pages/professional/ProfessionalProfile";
import ProfessionalJobListings from "./pages/professional/dashboard/jobListing/JobListings";
import ProfessionalJobDetails from "./pages/professional/dashboard/jobListing/JobDetails";
import ProfessionalHackathon from "./pages/professional/dashboard/hackathon/Hackthon";
import ProfessionalDetail from "./pages/professional/dashboard/hackathon/Detail";
import EmployerAcceptedShortlistDrive from "./pages/employer/acceptedCollegeOrCandidate/onCampus/AcceptedShortlistDrive";
import EmployerAcceptedDriveDetail from "./pages/employer/acceptedCollegeOrCandidate/onCampus/AcceptedDriveDetail";
import OnboardingFlowForm from "./pages/employer/onboarding/Main";
import EmployerResumeApp from "./components/employer/employerDashboard/resumeSearch/ResumeApp";
import EmployerInterviewScheduler from "./components/employer/interview/InterviewSchedule";
import EmployerListingPage from "./pages/employer/employerDashboard/CollegeListingPage";
import EmployerDetailsPage from "./pages/employer/employerDashboard/CollegeDetailPage";
import EmployerPoolEmployeeListing from "./pages/employer/employerDashboard/poolCampus/PoolEmployeeListing";
import EmployerPoolCampus from "./pages/employer/employerDashboard/poolCampus/PoolCampusEmployerDash";
import EmployerWorkforce from "./pages/employer/serviceRequest/workforceSolution/workforce";
import EmployerTraining from "./pages/employer/serviceRequest/EmployeeTraining/EmployeeTraining";
import EmployerBranding from "./pages/employer/serviceRequest/Branding/Branding";
import EmployerOnCampusJobManagement from "./pages/employer/jobManagement/onCampusListing/OnCampusJobManagement";
import EmployerPoolCampusJobManagement from "./pages/employer/jobManagement/poolCampusListing/PoolCampusJobManagement";
import EmployerOffCampusJobManagement from "./pages/employer/jobManagement/offCampusListing/OffCampusJobmanagement";
import EmployerJobListingJobManagement from "./pages/employer/jobManagement/jobListing/JobListingJobManagement";
import EmployerShortlistedDrivesPage from "./pages/employer/shortlistedCollege/onCampusListing/ShortlistedDrivesPage";
import EmployerDriveDetailPage from "./pages/employer/shortlistedCollege/onCampusListing/DriveDetailPage";
import EmployerPoolCampusShortlistDrive from "./pages/employer/shortlistedCollege/poolCampusListing/PoolCampusShortlistDrive";
import EmployerPoolCampusDetailPage from "./pages/employer/shortlistedCollege/poolCampusListing/PoolCampusDetailPage";
import EmployerOffCampusListingPage from "./pages/employer/shortlistedCollege/offCampusListing/OffCampusListingPage";
import EmployerJobListingPage from "./pages/employer/shortlistedCollege/jobListing/JoblistingPage";
import EmployerPostJob from "./pages/employer/hiringChannels/postJob/CreateJob";
import EmployerPostIntership from "./pages/employer/hiringChannels/postInternship/CreateIntership";
import EmployerOnCampusHiring from './pages/employer/hiringChannels/onCampusHiring/OnCampusHiring'
import EmployerPoolCampuses from './pages/employer/hiringChannels/poolCampusHiring/PoolCampus'
import EmployerOffCampus from "./pages/employer/hiringChannels/offCampusHiring/OffCapus";
import ChatLayout from "./home/chatLayout";
import { useAuth } from "./context/AuthProvider";
import EmployerProfile from "./pages/employer/dashboard/CompanyProfile";
import LinkedInCallback from "./pages/auth/LinkedInCallback";
import InvitationsPage from "./pages/InvitationsPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import PoolCampusPlacement from "./pages/college/serviceRequest/poolCampusPlacement/PoolCampus";
import RefferalJobPosting from './pages/fresher/fresherDashboard/refferalJobs/RefferalJobListing'
import RefferalJobDetail from './pages/fresher/fresherDashboard/refferalJobs/RefferalJobDetails'
import RefferalPosting from './pages/professional/dashboard/refferalJobs/RefferalJobListing'
import RefferalDetail from './pages/professional/dashboard/refferalJobs/RefferalJobDetails'
import StudentReferralJobs from './pages/students/studentDashboard/refferalJobs/RefferalJobListing'
import StudentRefferalJobDetails from './pages/students/studentDashboard/refferalJobs/RefferalJobDetails'
import OncampusApplicationStatus from "./pages/company/applicationStatus/OncampusApplicationStatus";
import PoolcampusApplicationStatus from "./pages/company/applicationStatus/PoolcampusApplicationStatus";
import JobManagementApplicationForPool from "./pages/college/manageApplication/PoolCampusPlacement/JobManagementForPool";
import JobDetailForPool from "./pages/college/manageApplication/PoolCampusPlacement/JobDetailForPool";
import InternshipListing from "./pages/company/jobManagement/internship/internahipListing";
import IntershipListingPage from "./pages/company/shortlistedCollege/internship/InternshipListingPage";
import AcceptedInternshipList from './pages/company/acceptedCollegeOrCandidate/internship/AcceptedInternshipList';
import EventList from './components/student/events/EventList';
import EventDetail from './components/student/events/EventDetail';
import EventRegistration from './pages/EventRegistration';
import AcceptedIntership from './pages/employer/acceptedCollegeOrCandidate/internship/AcceptedInternshipList'
import EmployerIntershipForShortlist from './pages/employer/shortlistedCollege/internship/InternshipListingPage'
// Create query client
const queryClient = new QueryClient();
function AppRoutes() {
  const [authUser] = useAuth();

  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/mock" element={<PostIntership />} />
      <Route path="/" element={<RoleSelection />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
      <Route path="/invitations" element={<InvitationsPage />} />
      <Route path="/invitation-accepted" element={<ConfirmationPage />} />
      <Route path='/student-form' element={<Index />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/step/1" element={<EditStepOne />} />
      <Route path="/step/2" element={<EditStepTwo />} />
      <Route path="/step/3" element={<EditStepThree />} />
      <Route path="/step/4" element={<EditStepFour />} />
      <Route path="/step/5" element={<EditStepFive />} />
      <Route path="/confirmation" element={<Confirmation />} />


      <Route path="/company-form" element={<FormContainer />} />
      <Route path="/company-onboarding/step-1" element={<ReviewDetails />} />
      <Route path="/company-onboarding/step-2" element={<EmployerIntroduction />} />
      <Route path="/company-onboarding/step-3" element={<CompanyRegistration />} />
      <Route path="/company-onboarding/step-4" element={<HiringPreferences />} />
      <Route path="/company-onboarding/step-5" element={<CompanyVerification />} />


      <Route path="/college-onboarding/*" element={<OnboardingFlow />} />
      <Route path="/college-edit/*" element={<EditOnboardingFlow />} />

      <Route path="OnboardingflowForm" element={<OnboardingFlowForm />} />
      
      
      


      {/* Student */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>

              {/* Universal Home Route - Renders based on user role */}
              <Route path="/home" element={<UnifiedDashboard />} />
              
              {/* student */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/student-dashboard/Job-listing" element={<JobListings />} />
              <Route path="/student-dashboard/Job-listing/:jobId" element={<JobDetails />} />
              <Route path="/student-dashboard/Internship" element={<InternJobListings />} />
              <Route path="/student-dashboard/Internship/:jobId" element={<InternJobDetails />} />
              <Route path="/student-dashboard/Off-campus" element={<OffCampusJobListings />} />
              <Route path="/student-dashboard/Off-campus/:jobId" element={<OffCampusJobDetail />} />
              <Route path="/student-dashboard/hackathon" element={<Hackathon />} />
              <Route path="/student-dashboard/hackathon/:id" element={<Detail />} />
              <Route path="/student-dashboard/hackathon/register/:event_ID" element={<HackathonRegistration />} />
              <Route path="/student-dashboard/Referral" element={<StudentReferralJobs />} />
              <Route path="/student-dashboard/Referral/:jobId" element={<StudentRefferalJobDetails />} />
              {/* Student Events Routes */}
              <Route path="/student-events/hackathon" element={<EventList event_name="hackathon" />} />
              <Route path="/student-events/workshop" element={<EventList event_name="workshop" />} />
              <Route path="/student-events/casestudy" element={<EventList event_name="casestudy" />} />
              <Route path="/student-events/:event_name/:id" element={<EventDetail />} />
              <Route path="/student-events/:event_name/register/:event_ID" element={<EventRegistration />} />
              {/* service request  */}
              <Route path='service-request/career-craft' element={<CareerCraft />} />
              <Route path='service-request/mock-interview' element={<MockInterview />} />
              <Route path='service-request/counselling' element={<Counselling />} />
              {/* Application status  */}
              <Route path="/application-status/Job-listing" element={<JobTracker />} />
              <Route path="/application-status/Off-campus" element={<OffcampusStatus />} />
              <Route path="/application-status/Internship" element={<InternshipStatus />} />
              <Route path="/application-status/Referral" element={<RefferralJobStatus />} />
              <Route path="/application-events/hackathon" element={<EventList event_name="hackathon" />} />
              <Route path="/application-events/workshop" element={<EventList event_name="workshop" />} />
              <Route path="/application-events/casestudy" element={<EventList event_name="casestudy" />} />
              <Route path="/application-status/event-status" element={<EventStatus />} />
              <Route path='/notifications' element={<NotificationSettings />} />
              <Route path='/Faq' element={<FAQPage />} />
              <Route path="/saved-jobs/*" element={<JobRoutes />} />
              <Route path="/ai-driven-job-search" element={<AIDrivenJob />} />
              <Route path="settings" element={<Settings />} />
              <Route path="ContactUs" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />


              {/* Fresher */}
              <Route path="/fresherprofile" element={<Fresher_Profile />} />

              <Route path="/fresher-dashboard/Job-listing" element={<FJobListings />} />
              <Route path="/fresher-dashboard/Job-listing/:jobId" element={<FJobDetails />} />

              <Route path="/fresher-dashboard/Internship" element={<FInternJobListings />} />
              <Route path="/fresher-dashboard/Internship/:jobId" element={<FInternJobDetails />} />

              <Route path="/fresher-dashboard/Off-campus" element={<FOffCampusJobListings />} />
              <Route path="/fresher-dashboard/Off-campus/:jobId" element={<FOffCampusJobDetail />} />

              <Route path="/fresher-dashboard/Referral" element={<RefferalJobPosting />} />
              <Route path="/fresher-dashboard/Referral/:jobId" element={<RefferalJobDetail />} />

              <Route path="/fresher-dashboard/hackathon" element={<FresherHackathon />} />
              <Route path="/fresher-dashboard/hackathon/:id" element={<FresherDetail />} />
              {/* Fresher Events Routes */}
              <Route path="/fresher-events/hackathon" element={<EventList event_name="hackathon" />} />
              <Route path="/fresher-events/workshop" element={<EventList event_name="workshop" />} />
              <Route path="/fresher-events/casestudy" element={<EventList event_name="casestudy" />} />
              <Route path="/fresher-events/:event_name/:id" element={<EventDetail />} />
              <Route path="/fresher-events/:event_name/:EventId/:regId" element={<EventDetail />} />
              <Route path="/fresher-events/:event_name/register/:event_ID" element={<EventRegistration />} />
              {/* service request  */}
              <Route path='/fresher-dashboard/service-request/career-craft' element={<FresherCareerCraft />} />
              <Route path='/fresher-dashboard/service-request/mock-interview' element={<FresherMockInterview />} />
              <Route path='/fresher-dashboard/service-request/counselling' element={<FresherCounselling />} />
              {/* Application status  */}
              {/* <Route path="fresher/application-status/Job-listing" element={<JobTracker/>} />
              <Route path="/application-status/Off-campus" element={<OffcampusStatus/>} />
              <Route path="/application-status/Internship" element={<InternshipStatus/>} />
              <Route path="/application-status/Referral" element={<RefferralJobStatus/>} />
              <Route path="/application-status/hackathon" element={<HackthonStatus/>} /> */}



              {/* proffesional routes */}
              <Route path="/profprofile" element={<ProfProfile />} />
              <Route path="/professional-dashboard/Job-listing" element={<ProfessionalJobListings />} />
              <Route path="/professional-dashboard/Job-listing/:jobId" element={<ProfessionalJobDetails />} />
              <Route path="/professional-dashboard/hackathon" element={<ProfessionalHackathon />} />
              <Route path="/professional-dashboard/hackathon/:id" element={<ProfessionalDetail />} />
              <Route path="/professional-dashboard/Referral" element={<RefferalPosting />} />
              <Route path="/professional-dashboard/Referral/:jobId" element={<RefferalDetail />} />

              <Route path='professional/service-request' element={<RefPostingPage />} />
              <Route path='professional/service-request/post' element={<PostReferralJobPage />} />
              <Route path='professional/service-request/referral' element={<ManageReferralJobs />} />
              <Route path='professional/service-request/totalapplicants' element={<TotalApplicantsPage />} />
              <Route path='professional/service-request/applicant' element={<OffCampusApplicant />} />
              {/* Professional Events Routes */}
              <Route path="/professional-events/hackathon" element={<EventList event_name="hackathon" />} />
              <Route path="/professional-events/workshop" element={<EventList event_name="workshop" />} />
              <Route path="/professional-events/casestudy" element={<EventList event_name="casestudy" />} />
              <Route path="/professional-events/:event_name/:id" element={<EventDetail />} />
              <Route path="/professional-events/:event_name/register/:event_ID" element={<EventRegistration />} />



              {/* Company  */}
              <Route path="/company-profile" element={<CompanyProfile />} />

              <Route path="/company/saved-jobs/*" element={<JobRoutes />} />

              <Route path="/company-dashboard/resume-search" element={<ResumeApp />} />
              <Route path="/interviews" element={<InterviewScheduler />} />

              <Route path="/company-dashboard/On-campus" element={<CollegeListingPage />} />
              <Route path="/company-dashboard/On-campus/:id" element={<CollegeDetailsPage />} />
              <Route path="/company-dashboard/pool-campus" element={<PoolEmployeeListing />} />
              <Route path="/company-dashboard/pool-campus/:id" element={<PoolCampusEmployeeDash />} />
              <Route path="/company-dashboard/Off-campus/:jobId" element={<OffCampusJobDetail />} />
              <Route path="/company-dashboard/Job-listing/:jobId" element={<JobDetails />} />
              <Route path="/company-dashboard/Internship/:jobId" element={<InternJobDetails />} />

              {/* service request  */}
              <Route path="/service-request/workforce-solution" element={<Workforce />} />
              <Route path="/service-request/employee-training" element={<EmployeeTraining />} />
              <Route path="/service-request/branding" element={<Branding />} />

              {/* hosting */}
              <Route path="/company/hosting/host-hackathon" element={<HostHackathon />} />
              <Route path="/company/hosting/host-workshop" element={<HostWorkshop />} />
              <Route path="/company/hosting/host-case-studies" element={<HostCasestudies />} />

              {/* hosting management */}
              <Route path="/hosting-management" element={<HostingManagement />} />
              <Route path="/hosting-management/hackathons" element={<HackathonRegistrations />} />
              <Route path="/hosting-management/case-studies" element={<CasestudyRegistrations />} />

              {/* application status */}
              <Route path="/company/application-status/oncampus" element={<OncampusApplicationStatus />} />
              <Route path="/company/application-status/poolcampus" element={<PoolcampusApplicationStatus />} />

              {/* Job Management   */}
              <Route path="/job-management/On-campus" element={<OnCampusJobManagement />} />
              <Route path="/job-management/Pool-campus" element={<PoolCampusJobManagement />} />
              <Route path="/job-management/Off-campus" element={<OffCampusJobManagement />} />
              <Route path="/job-management/Job-listings" element={<JobListingJobManagement />} />
              <Route path="job-management/Internship" element={<InternshipListing />} />


              {/* Accepted college / candidates  */}
              <Route path="/accepted/on-campus-listings" element={<AcceptedShortlistDrive />} />
              <Route path="/accepted/on-campus-listings/:driveId" element={<AcceptedDriveDetail />} />
              <Route path="/accepted/pool-campus-listings" element={<AcceptedPoolShortlist />} />
              <Route path="/accepted/pool-campus-listings/:driveId" element={<AcceptedPoolDriveDetail />} />

              <Route path="/accepted/jobs-listings" element={<AcceptedJobList />} />
              <Route path="/accepted/Off-campus" element={<AcceptedOffCampusList />} />

              <Route path="/accepted/internship-listings" element={<AcceptedInternshipList />} />


              {/* shortlisted candidate  */}

              <Route path="/shortlisted/on-campus-listings" element={<ShortlistedDrivesPage />} />
              <Route path="/shortlisted/on-campus-listings/:driveId" element={<DriveDetailPage />} />

              <Route path="/shortlisted/pool-campus-listings" element={<PoolCampusShortlistDrive />} />
              <Route path="/shortlisted/pool-campus-listings/:driveId" element={<PoolCampusDetailPage />} />

              <Route path="/shortlisted/Off-campus" element={<OffCampusListingPage />} />

              <Route path="/shortlisted/jobs-listings" element={<JobListingPage />} />

              <Route path="/shortlisted/internship-listings" element={<IntershipListingPage />} />

              {/* Hiring Channel  */}

              <Route path='hiring-channels/post-a-job' element={<PostJob />} />
              <Route path='hiring-channels/post-an-internship' element={<PostIntership />} />
              <Route path='hiring-channels/on-campus-hiring' element={<OnCampusHiring />} />
              <Route path='hiring-channels/pool-campus-hiring' element={<PoolCampus />} />
              <Route path='hiring-channels/off-campus-hiring' element={<OffCampus />} />



              {/* Employer Dashboard  */}

              <Route path="/employer-profile" element={<EmployerProfile />} />

              <Route path="/interviews" element={<EmployerInterviewScheduler />} />
              <Route path="/employer-dashboard/resume-search" element={<EmployerResumeApp />} />
              <Route path="/employer-dashboard/On-campus" element={<EmployerListingPage />} />
              <Route path="/employer-dashboard/On-campus/:id" element={<EmployerDetailsPage />} />

              <Route path="/employer-dashboard/pool-campus" element={<EmployerPoolEmployeeListing />} />
              <Route path="/employer-dashboard/pool-campus/:i" element={<EmployerPoolCampus />} />

              {/* service request  */}
              <Route path="/service-request/workforce-solution" element={<EmployerWorkforce />} />
              <Route path="/service-request/employee-training" element={<EmployerTraining />} />
              <Route path="/service-request/branding" element={<EmployerBranding />} />

              {/* Job Management   */}
              <Route path="/job-management/on-campus-listings/employer" element={<EmployerOnCampusJobManagement />} />
              <Route path="/job-management/pool-campus-listings/employer" element={<EmployerPoolCampusJobManagement />} />
              <Route path="/job-management/Off-campus/employer" element={<EmployerOffCampusJobManagement />} />
              <Route path="/job-management/job-listings/employer" element={<EmployerJobListingJobManagement />} />
              <Route path="/employer/job-management/Internship" element={<EmployerJobListingJobManagement />} />


              {/* Accepted college / candidates  */}
              <Route path="/employer/accepted/on-campus-listings" element={<EmployerAcceptedShortlistDrive />} />
              <Route path="/accepted/on-campus-listings/:driveId" element={<EmployerAcceptedDriveDetail />} />

              <Route path="/employer/accepted/pool-campus-listings" element={<EmployerAcceptedPoolShortlist />} />
              <Route path="/accepted/pool-campus-listings/:driveId" element={<EmployerAcceptedPoolDriveDetail />} />

              <Route path="/employee/acceptedJobList" element={<EmployerAcceptedJobList />} />
              <Route path="/employer/accepted/off-campus-listings" element={<EmployerAcceptedOffCampusList />} />

              <Route path="/employer/accepted/internship-listings" element={<AcceptedIntership/>} />


              {/* shortlisted candidate  */}

              <Route path="/employer/shortlisted/on-campus-listings" element={<EmployerShortlistedDrivesPage />} />
              <Route path="/shortlisted/on-campus-listings/:driveId" element={<EmployerDriveDetailPage />} />

              <Route path="/employer/shortlisted/pool-campus-listings" element={<EmployerPoolCampusShortlistDrive />} />
              <Route path="/shortlisted/pool-campus-listings/:driveId" element={<EmployerPoolCampusDetailPage />} />

              <Route path="/employer/shortlisted/Off-campus" element={<EmployerOffCampusListingPage />} />
              <Route path="/employer/shortlisted/jobs-listings" element={<EmployerJobListingPage />} />

              <Route path="/employer/shortlisted/internship-listings" element={<EmployerIntershipForShortlist />} />

              {/* Hiring Channel  */}

              <Route path='/hiring-channels/post-a-job/employer' element={<EmployerPostJob />} />
              <Route path='/hiring-channels/post-an-internship/employer' element={<EmployerPostIntership />} />
              <Route path='/hiring-channels/on-campus-hiring/employer' element={<EmployerOnCampusHiring />} />
              <Route path='hiring-channels/pool-campus-hiring/employer' element={<EmployerPoolCampuses />} />
              <Route path='/hiring-channels/off-campus-hiring/employer' element={<EmployerOffCampus />} />





              {/* College  */}
              <Route path="college-profile" element={<CollegeProfile />} />

              {/* college Dashboard  */}
              <Route path="/college/saved-jobs/*" element={<JobRoutes />} />

              <Route path="/college-dashboard/On-campus" element={<JobsListingPage />} />
              <Route path="/college-dashboard/On-campus/:id" element={<JobDetailPage />} />

              <Route path="/college-dashboard/Internship" element={<InternJobsListingPage />} />
              <Route path="/college-dashboard/Internship/:id" element={<InternJobDetailPage />} />

              <Route path="/college-dashboard/Pool-campus" element={<PoolJobListingPage />} />
              <Route path="/college-dashboard/Pool-campus/:id" element={<PoolJobDetailsPage />} />

              {/* service request  */}
              <Route path='service-request/campus-placement' element={<CampusPlacement />} />
              <Route path='service-request/poolcampus-placement' element={<PoolCampusPlacement />} />
              <Route path='service-request/student-training-programs' element={<StudentTraining />} />
              <Route path='service-request/seminars' element={<Seminar />} />

              {/* job management  */}

              <Route path="/manage-application/campus-placement" element={<JobProvider><JobManagementApplication /> </JobProvider>} />
              <Route path="/manage-application/campus-placement/:jobId" element={<JobProvider><JobDetail status="Applied"/> </JobProvider>} />

              <Route path="/manage-application/PoolCampus-placement" element={<JobProvider><JobManagementApplicationForPool /></JobProvider>} />
              <Route path="/manage-application/PoolCampus-placement/:jobId" element={<JobProvider><JobDetailForPool /> </JobProvider>} />


              <Route path="/application-status/oncampus" element={<CollegeOncampusApplicationStatus />} />
              <Route path="/application-status/poolcampus" element={<CollegePoolcampusApplicationStatus />} />

              <Route path="/registered/on-campus-opportunities" element={
                <ApplicationProvider>
                  <ApplicationsPage />
                </ApplicationProvider>
              } />
              <Route path="/registered/on-campus-opportunities/:jobId" element={<JobProvider><JobDetail status="Shortlisted"/> </JobProvider>}/>
              {/* <Route path="/registered/on-campus-opportunities/:id" element={
                <ApplicationProvider>
                  <ApplicationDetailPage />
                </ApplicationProvider>
              } /> */}

              <Route path="/registered/Internship" element={
                <ApplicationProvider>
                  <InternApplicationsPage />
                </ApplicationProvider>
              } />
              <Route path="/registered/Internship/:id" element={
                <ApplicationProvider>
                  <InternDetailPage />
                </ApplicationProvider>
              } />
              <Route path="/registered/pool-campus-opportunities" element={
                <ApplicationProvider>
                  <PoolApplicationsPage />
                </ApplicationProvider>
              } />
              <Route path="/registered/pool-campus-opportunities/:id" element={
                <ApplicationProvider>
                  <PoolApplicationDetailPage />
                </ApplicationProvider>
              } />

              {/* Professional  */}
              <Route
                path="/chat-application"
                element={
                  authUser ? <ChatLayout /> : <Navigate to="/login" />
                }
              />


            </Routes>
          </Layout>
        }
      />
{/* ---------------------------> change from muhammad <--------------------------------------- */}
      {/* Admin Routes - Independent from main layout */}
      {/* <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} /> */}
      {/* <Route 
        path="/admin/dashboard" 
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } 
      />
---------------------------> change from muhammad <---------------------------------------  */}
{/* Testing */}
        {/* Admin routes */}
      <Route path="admin/*" element={<AdminRoutes />} />


      {/* fresher  */}
      <Route path="/fresher/*">
        {formRoutes.map((route, index) => (
          <Route
            key={`form-${index}`}
            index={route.index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>

      <Route path="/edit/*">
        {EditRoutes.map((route, index) => (
          <Route
            key={`form-${index}`}
            index={route.index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Route>
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/*   
    <Router> */}
      <AppProvider>  {/* Global app state */}
        <AdminProvider>  {/* Admin state */}
          <FormProvider>  {/* Form-specific state */}
            <AppRoutes />
          </FormProvider>
        </AdminProvider>
      </AppProvider>
      {/* </Router> */}

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
