import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import FormProvider from "./pages/fresher/onbordingForms/FormContext";
import { AppProvider } from "./pages/fresher/editAndReview/AppContext";
// Layout
import Layout from "./components/layout/Layout";

// Pages - Auth
import RoleSelection from "./pages/auth/GetStarted";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";


// Pages - Dashboard
import Dashboard from "./pages/students/Dashboard";
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
import HostHackathon from "./pages/company/hosting/HostHackathon";


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
import OffCampus from "./pages/company/hiringChannels/offCampusHiring/OffCampus";
import EmployerOffCampus from "./pages/employer/hiringChannels/offCampusHiring/OffCampus";
import PoolCampus from "./pages/company/hiringChannels/poolCampusHiring/PoolCampus";
import PostIntership from "./pages/company/hiringChannels/postInternship/CreateIntership";
import JobRoutes from "./components/student/savedJob/JobRoutes";
import ContactUs from "./pages/contact/ContactUs";
import NotificationSettings from "./pages/profileDropdown/Notification";
import FAQPage from "./pages/profileDropdown/FaqPage";
import ResumeApp from "./components/company/employerDashboard/resumeSearch/ResumeApp";

import Hackathon from "./pages/students/studentDashboard/hackathon/Hackthon";
import Detail from "./pages/students/studentDashboard/hackathon/Detail";
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
import HackthonStatus from "./components/student/applicationStatus/hackthon/HackthonStatus";
import AIDrivenJob from "./components/student/aiDrivenJobSearch/AIDrivenJob";
import Workforce from "./pages/company/serviceRequest/workforceSolution/workforce";
import EmployeeTraining from "./pages/company/serviceRequest/employeeTraining/EmployeeTraining";
import Branding from "./pages/company/serviceRequest/branding/Branding";
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
import EmployerResumeApp from "./components/employer/employerDashboard/ResumeSearch/ResumeApp";
import EmployerInterviewScheduler from "./components/employer/interview/InterviewSchedule";
import EmployerListingPage from "./pages/employer/employerDashboard/CollegeListingPage";
import EmployerDetailsPage from "./pages/employer/employerDashboard/CollegeDetailPage";
import EmployerPoolEmployeeListing from "./pages/employer/employerDashboard/poolCampus/PoolEmployeeListing";
import EmployerPoolCampus from "./pages/employer/employerDashboard/poolCampus/PoolCampusEmployerDash";
import EmployerWorkforce from "./pages/employer/serviceRequest/workforceSolution/workforce";
import EmployerTraining from "./pages/employer/serviceRequest/employeeTraining/EmployeeTraining";
import EmployerBranding from "./pages/employer/serviceRequest/branding/Branding";
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
import EmployerOffCampus from "./pages/employer/hiringChannels/offCampusHiring/OffCampus";
import ChatLayout from "./home/chatLayout";
import { useAuth } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";
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
// Create query client
const queryClient = new QueryClient();
function AppRoutes() {
   const [authUser] = useAuth() ;
   
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/mock" element={<PostIntership/>} />
      <Route path="/" element={<RoleSelection />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
      <Route path= "/invitations" element={<InvitationsPage/>} />
      <Route path ="/invitation-accepted" element ={<ConfirmationPage/>} />
      <Route path='/student-form' element={<Index/>} />
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

      <Route path="OnboardingflowForm" element={<OnboardingFlowForm/>} />



      {/* Student */}  
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>

              {/* student */}
              <Route path="/home" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/student-dashboard/job-listing" element={<JobListings />} />
              <Route path="/student-dashboard/job-listing/:jobId" element={<JobDetails />} />
              <Route path="/student-dashboard/internship-opportunities" element={<InternJobListings />} />
              <Route path="/student-dashboard/internship-opportunities/:jobId" element={<InternJobDetails />} />
              <Route path="/student-dashboard/off-campus-listings" element={<OffCampusJobListings />} />
              <Route path="/student-dashboard/off-campus-listings/:jobId" element={<OffCampusJobDetail/>} />
              <Route path="/student-dashboard/hackathon" element={<Hackathon/>} />
              <Route path="/student-dashboard/hackathon/:id" element={<Detail />} />
              <Route path="/student-dashboard/Referral-Jobs" element={<StudentReferralJobs/>} />
              <Route path="/student-dashboard/Referral-Jobs/:jobId" element={<StudentRefferalJobDetails />} />
              {/* service request  */}
              <Route path ='service-request/career-craft' element={<CareerCraft/>}/>
              <Route path ='service-request/mock-interview' element={<MockInterview/>}/>
              <Route path ='service-request/counselling' element={<Counselling/>}/>
              {/* Application status  */}
              <Route path="/application-status/job-listing" element={<JobTracker/>} />
              <Route path="/application-status/off-campus-listing" element={<OffcampusStatus/>} />
              <Route path="/application-status/internship-opportunities" element={<InternshipStatus/>} />
              <Route path="/application-status/referral-jobs" element={<RefferralJobStatus/>} />
              <Route path="/application-status/hackathon" element={<HackthonStatus/>} />
              <Route path='/notifications' element={<NotificationSettings/>} />
              <Route path='/Faq' element={<FAQPage/>} />
              <Route path="/saved-jobs/*" element={<JobRoutes/>} />
              <Route path="/ai-driven-job-search" element={<AIDrivenJob/>} />
              <Route path="settings" element={<Settings />} />
              <Route path="ContactUs" element={<ContactUs/>} />
              <Route path="*" element={<NotFound />} />

              
                {/* Fresher */}
              <Route path="/fresherhome" element={<FresherDashboard />} />
              <Route path="/fresherprofile" element={<Fresher_Profile />} />

              <Route path="/fresher-dashboard/job-listing" element={<FJobListings />} />
              <Route path="/fresher-dashboard/job-listing/:jobId" element={<FJobDetails />} />

              <Route path="/fresher-dashboard/internship-opportunities" element={<FInternJobListings />} />
              <Route path="/fresher-dashboard/internship-opportunities/:jobId" element={<FInternJobDetails />} />

              <Route path="/fresher-dashboard/off-campus-listings" element={<FOffCampusJobListings />} />
              <Route path="/fresher-dashboard/off-campus-listings/:jobId" element={<FOffCampusJobDetail/>} />

              <Route path= "/fresher-dashboard/Referral-Jobs" element={<RefferalJobPosting/>} />
              <Route path="/fresher-dashboard/Referral-Jobs/:jobId" element= {<RefferalJobDetail/>} />
              
              <Route path="/fresher-dashboard/hackathon" element={<FresherHackathon/>} />
              <Route path="/fresher-dashboard/hackathon/:id" element={<FresherDetail />} />
              {/* service request  */}
              <Route path ='/fresher-dashboard/service-request/career-craft' element={<FresherCareerCraft/>}/>
              <Route path ='/fresher-dashboard/service-request/mock-interview' element={<FresherMockInterview/>}/>
              <Route path ='/fresher-dashboard/service-request/counselling' element={<FresherCounselling/>}/>
              {/* Application status  */}
              {/* <Route path="fresher/application-status/job-listing" element={<JobTracker/>} />
              <Route path="/application-status/off-campus-listing" element={<OffcampusStatus/>} />
              <Route path="/application-status/internship-opportunities" element={<InternshipStatus/>} />
              <Route path="/application-status/referral-jobs" element={<RefferralJobStatus/>} />
              <Route path="/application-status/hackathon" element={<HackthonStatus/>} /> */}



              {/* proffesional routes */}
              <Route path="/profhome" element={<ProfDashboard/>} />
              <Route path="/profprofile" element={<ProfProfile />} />
              <Route path="/professional-dashboard/job-listing" element={<ProfessionalJobListings />} />
              <Route path="/professional-dashboard/job-listing/:jobId" element={<ProfessionalJobDetails />} />
              <Route path="/professional-dashboard/hackathon" element={<ProfessionalHackathon/>} />
              <Route path="/professional-dashboard/hackathon/:id" element={<ProfessionalDetail />} />
               <Route path= "/professional-dashboard/referral-jobs" element={<RefferalPosting/>} />
              <Route path="/professional-dashboard/referral-jobs/:jobId" element= {<RefferalDetail/>} />

              <Route path ='professional/service-request' element={<RefPostingPage/>}/>
              <Route path ='professional/service-request/post' element={<PostReferralJobPage/>}/>
              <Route path ='professional/service-request/referral' element={<ManageReferralJobs/>}/>
              <Route path ='professional/service-request/totalapplicants' element={<TotalApplicantsPage/>}/>
              <Route path ='professional/service-request/applicant' element={<OffCampusApplicant/>}/>
              
              
              
              {/* Company  */}
              <Route path="home" element={<Dashboard />} />
              <Route path="/company-profile" element={<CompanyProfile />}/> 
              <Route path="/company/hosting/host-hackathon" element={<HostHackathon />}/>

              <Route path="/employer-dashboard/resume-search" element={<ResumeApp />} />
              <Route path="/interviews" element={<InterviewScheduler />} />

              <Route path="/employer-dashboard/on-campus-request" element={<CollegeListingPage />} />
              <Route path="/employer-dashboard/on-campus-request/:id" element={<CollegeDetailsPage />} />

              <Route path="/employer-dashboard/pool-campus-requests" element={<PoolEmployeeListing/>} />
              <Route path="/employer-dashboard/pool-campus-requests/:id" element={<PoolCampusEmployeeDash />} />

              {/* service request  */}
              <Route path="/service-request/workforce-solution" element={<Workforce/>} />
              <Route path="/service-request/employee-training" element={<EmployeeTraining/>} />
              <Route path="/service-request/branding" element={<Branding/>} />

              {/* application status */}
              <Route path="/company/application-status/oncampus" element={<OncampusApplicationStatus />} />
              <Route path="/company/application-status/poolcampus" element={<PoolcampusApplicationStatus />} />
              
                {/* Job Management   */}
             <Route path="/job-management/on-campus-listings" element={<OnCampusJobManagement/>} />
             <Route path="/job-management/pool-campus-listings" element={<PoolCampusJobManagement/>} />
             <Route path="/job-management/off-campus-listings" element={<OffCampusJobManagement/>} />
             <Route path="/job-management/job-listings" element={<JobListingJobManagement/>} />

              
              {/* Accepted college / candidates  */}
              <Route path="/accepted/on-campus-listings" element={<AcceptedShortlistDrive/>} />
              <Route path="/accepted/on-campus-listings/:driveId" element={<AcceptedDriveDetail/>} />

              <Route path="/accepted/pool-campus-listings" element={<AcceptedPoolShortlist/>} />
              <Route path="/accepted/pool-campus-listings/:driveId" element={<AcceptedPoolDriveDetail/>} />
    
              <Route path="/acceptedJobList" element={<AcceptedJobList/>} />
              <Route path="/accepted/off-campus-listings" element={<AcceptedOffCampusList/>} />

              
              {/* shortlisted candidate  */}
                  
              <Route path="/shortlisted/on-campus-listings" element={<ShortlistedDrivesPage/>} />
              <Route path="/shortlisted/on-campus-listings/:driveId" element={<DriveDetailPage/>} />
      
              <Route path="/shortlisted/pool-campus-listings" element={<PoolCampusShortlistDrive/>} />
              <Route path="/shortlisted/pool-campus-listings/:driveId" element={<PoolCampusDetailPage/>} />
      
              <Route path="/shortlisted/off-campus-listings" element={<OffCampusListingPage/>} />
              <Route path="/joblistingPage" element={<JobListingPage/>} />

              {/* Hiring Channel  */}
              
              <Route path='hiring-channels/post-a-job' element={<PostJob/>} />
              <Route path='hiring-channels/post-an-internship' element={<PostIntership/>} />
              <Route path='hiring-channels/on-campus-hiring' element={<OnCampusHiring/>} />
              <Route path='hiring-channels/pool-campus-hiring' element={<PoolCampus/>} />
              <Route path='hiring-channels/off-campus-hiring' element={<OffCampus/>} />



              {/* Employer Dashboard  */}
              
              <Route path="home" element={<Dashboard />} />
              <Route path="/employer-profile" element={<EmployerProfile />}/> 

              <Route path="/interviews" element={<EmployerInterviewScheduler />} />
              <Route path="/employer-dashboard/resume-search" element={<EmployerResumeApp />} />
              <Route path="/employer-dashboard/on-campus-request" element={<EmployerListingPage />} />
              <Route path="/employer-dashboard/on-campus-request/:id" element={<EmployerDetailsPage />} />

              <Route path="/employer-dashboard/pool-campus-requests" element={<EmployerPoolEmployeeListing/>} />
              <Route path="/employer-dashboard/pool-campus-requests/:id" element={<EmployerPoolCampus />} />

              {/* service request  */}
              <Route path="/service-request/workforce-solution" element={<EmployerWorkforce/>} />
              <Route path="/service-request/employee-training" element={<EmployerTraining/>} />
              <Route path="/service-request/branding" element={<EmployerBranding/>} />
              
                {/* Job Management   */}
             <Route path="/job-management/on-campus-listings/employer" element={<EmployerOnCampusJobManagement/>} />
             <Route path="/job-management/pool-campus-listings/employer" element={<EmployerPoolCampusJobManagement/>} />
             <Route path="/job-management/off-campus-listings/employer" element={<EmployerOffCampusJobManagement/>} />
             <Route path="/job-management/job-listings/employer" element={<EmployerJobListingJobManagement/>} />

              
               {/* Accepted college / candidates  */}
              <Route path="/Employeeaccepted/on-campus-listings" element={<EmployerAcceptedShortlistDrive/>} />
              <Route path="/Employeeaccepted/on-campus-listings/:driveId" element={<EmployerAcceptedDriveDetail/>} />

               <Route path="/accepted/pool-campus-listings" element={<EmployerAcceptedPoolShortlist/>} />
              <Route path="/accepted/pool-campus-listings/:driveId" element={<EmployerAcceptedPoolDriveDetail/>} />
    
              <Route path="/Employee/acceptedJobList" element={<EmployerAcceptedJobList/>} />
              <Route path="/Employee/accepted/off-campus-listings" element={<EmployerAcceptedOffCampusList/>} /> 

              
              {/* shortlisted candidate  */}
                  
              <Route path="/shortlisted/on-campus-listings/employer" element={<EmployerShortlistedDrivesPage/>} />
              <Route path="/shortlisted/on-campus-listings/employer/:driveId" element={<EmployerDriveDetailPage/>} />
      
              <Route path="/shortlisted/pool-campus-listings/employer" element={<EmployerPoolCampusShortlistDrive/>} />
              <Route path="/shortlisted/pool-campus-listings/employer/:driveId" element={<EmployerPoolCampusDetailPage/>} />
      
              <Route path="/shortlisted/off-campus-listings/employer" element={<EmployerOffCampusListingPage/>} />
              <Route path="/joblistingPage/employer" element={<EmployerJobListingPage/>} />

              {/* Hiring Channel  */}
              
              <Route path='/hiring-channels/post-a-job/employer' element={<EmployerPostJob/>} />
              <Route path='/hiring-channels/post-an-internship/employer' element={<EmployerPostIntership/>} />
              <Route path='/hiring-channels/on-campus-hiring/employer' element={<EmployerOnCampusHiring/>} />
              <Route path='/hiring-channels/pool-campus-hiring/employer' element={<EmployerPoolCampuses/>} />
              <Route path='/hiring-channels/off-campus-hiring/employer' element={<EmployerOffCampus/>} />

  

              
              
              {/* College  */}
              <Route path="home" element={<Dashboard />} />
              <Route path="college-profile" element={<CollegeProfile />} />

              {/* college Dashboard  */}

              <Route path="/college-dashboard/on-campus-opportunities" element={<JobsListingPage/>} />
              <Route path="/college-dashboard/on-campus-opportunities/:id" element={<JobDetailPage />} />
        
              <Route path="/college-dashboard/internship-opportunities" element={<InternJobsListingPage/>} />
              <Route path="/college-dashboard/internship-opportunities/:id" element={<InternJobDetailPage />} />
        
              <Route path="/college-dashboard/pool-campus-opportunities" element={<PoolJobListingPage />} />
              <Route path="/college-dashboard/pool-campus-opportunities/:id" element={<PoolJobDetailsPage />} />

              {/* service request  */}
              <Route path= 'service-request/campus-placement' element={<CampusPlacement/>} />
              <Route path= 'service-request/poolcampus-placement' element={<PoolCampusPlacement/>} />
              <Route path= 'service-request/student-training-programs' element={<StudentTraining/>} />
              <Route path= 'service-request/seminars' element={<Seminar/>} />

              {/* job management  */}

              <Route path="/manage-application/campus-placement" element={<JobProvider><JobManagementApplication/> </JobProvider> }/>
              <Route path="/manage-application/campus-placement/:jobId" element={<JobProvider><JobDetail /> </JobProvider>}/>

              <Route path="/application-status/oncampus" element={<CollegeOncampusApplicationStatus />}/>
              <Route path="/application-status/poolcampus" element={<CollegePoolcampusApplicationStatus />}/>

              <Route path="/registered/on-campus-opportunities" element={
                <ApplicationProvider>
                  <ApplicationsPage />
                </ApplicationProvider>
              } />
              <Route path="/registered/on-campus-opportunities/:id" element={
                <ApplicationProvider>
                  <ApplicationDetailPage />
                </ApplicationProvider>
              } />
        
              <Route path="/registered/internship-opportunities" element={
                <ApplicationProvider>
                  <InternApplicationsPage />
                </ApplicationProvider>
              } />
              <Route path="/registered/internship-opportunities/:id" element={
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
                  <PoolApplicationDetailPage/>
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
          <FormProvider>  {/* Form-specific state */}
            <AppRoutes />
          </FormProvider>
    </AppProvider>
    {/* </Router> */}
   
  </TooltipProvider>
</QueryClientProvider>
);

export default App;