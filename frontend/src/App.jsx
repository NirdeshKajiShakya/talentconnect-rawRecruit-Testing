
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import FormProvider from "./pages/Fresher/onbordingForms/FormContext";
import { AppProvider } from "./pages/Fresher/EditAndReview/AppContext";
// Layout
import Layout from "./components/layout/Layout";

// Pages - Auth
import RoleSelection from "./pages/auth/GetStarted";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";


// Pages - Dashboard
import Dashboard from "./pages/Students/Dashboard";
import Profile from "./pages/Students/Profile";
import SavedJobs from "./pages/Students/SavedJobs";
import StudentDashboard from "./pages/Students/StudentDashboard";
import ServiceRequests from "./pages/Students/ServiceRequests";
import ApplicationStatus from "./pages/Students/ApplicationStatus";
import JobSearch from "./pages/Students/JobSearch";
import Settings from "./pages/Setting";
import NotFound from "./pages/NotFound";

// company
import CompanyRegistration from "./components/company/Editform/CompanyRegistration";
import HiringPreferences from "./components/company/Editform/HiringPreferences";
import CompanyVerification from "./components/company/Editform/CompanyVerification";
import ReviewDetails from "./components/company/Editform/ReviewDetails";
import EmployerIntroduction from "./components/company/Editform/EmployerIntroduction";

import CompanyProfile from "./pages/Company/Dashboard/CompanyProfile";

import FormContainer from "./components/company/FormContainer";

// COllege 
import OnboardingFlow from "./pages/college/onboardingForm/OnboardingFlow";
import CollegeProfile from "./pages/college/dashboard/CollegeProfile";
import EditOnboardingFlow from "./pages/college/EditForm/EditOnboardingFlow";

import CollegeDetailsPage from "./pages/Company/EmployerDashboard/CollegeDetailPage";
import CollegeListingPage from "./pages/Company/EmployerDashboard/CollegeListingPage";


import Index from "./pages/Index";


import WelcomePage from "./components/onboarding/EditFormStep/ReviewEdit";
import { EditStepOne } from "./components/onboarding/EditFormStep/EditStepOne";
import { EditStepTwo } from "./components/onboarding/EditFormStep/EditStepTwo";
import { EditStepThree } from "./components/onboarding/EditFormStep/EditStepThree";
import { EditStepFour } from "./components/onboarding/EditFormStep/EditStepFour";
import { EditStepFive } from "./components/onboarding/EditFormStep/EditStepFive";
import { Confirmation } from "./components/onboarding/EditFormStep/confirmEdit";



// Fresher 
import formRoutes from "./pages/Fresher/onbordingForms/route"
import EditRoutes from "./pages/Fresher/EditAndReview/route"
import OffCampus from "./pages/Company/HiringChannels/OffCampusHiring/OffCapus";
import PoolCampus from "./pages/Company/HiringChannels/PoolCampusHiring/PoolCampus";
import PostIntership from "./pages/Company/HiringChannels/PostInternship/CreateIntership";
import JobRoutes from "./components/Student/SavedJob/JobRoutes";
import ContactUs from "./pages/contact/ContactUs";
import NotificationSettings from "./pages/ProfileDropdown/Notification";
import FAQPage from "./pages/ProfileDropdown/FaqPage";
import ResumeApp from "./components/company/EmployerDashboard/ResumeSearch/ResumeApp";

import Hackathon from "./pages/Students/StudentDashboard/Hackathon/Hackthon";
import Detail from "./pages/Students/StudentDashboard/Hackathon/Detail";
import JobListings from "./pages/Students/StudentDashboard/JobListing/JobListings";
import JobDetails from "./pages/Students/StudentDashboard/JobListing/JobDetails";
import OffCampusJobListings from "./pages/Students/StudentDashboard/OffCampusListing/offCampusJobListing";
import OffCampusJobDetail from "./pages/Students/StudentDashboard/OffCampusListing/OffCampusJobDetail";
import JobTracker from "./components/Student/ApplicationStatus/JobListings/JobTracker";
import InterviewScheduler from "./components/company/Interview/InterviewSchedule";
// import JobManagement from "./pages/college/JobManagement/OnCampusListing/OnCampusJobManagement";
import ShortlistedDrives from "./components/company/ShortlistedCollege/OnCampusListing/ShortlistedDrives";
import ShortlistedDrivesPage from "./pages/Company/ShortlistedCollege/OnCampusListing/ShortlistedDrivesPage";
import DriveDetailPage from "./pages/Company/ShortlistedCollege/OnCampusListing/DriveDetailPage";
import OffCampusListingPage from "./pages/Company/ShortlistedCollege/OffCampusListing/OffCampusListingPage";
import JobListingPage from "./pages/Company/ShortlistedCollege/JobListing/JoblistingPage";
import PoolCampusShortlistDrive from "./pages/Company/ShortlistedCollege/PoolCampusListing/PoolCampusShortlistDrive";
import PoolCampusDetailPage from "./pages/Company/ShortlistedCollege/PoolCampusListing/PoolCampusDetailPage";
import AcceptedShortlistDrive from "./pages/Company/AcceptedCollegeOrCandidate/OnCampus/AcceptedShortlistDrive";
import AcceptedDriveDetail from "./pages/Company/AcceptedCollegeOrCandidate/OnCampus/AcceptedDriveDetail";
import AcceptedPoolShortlist from "./pages/Company/AcceptedCollegeOrCandidate/PoolCampus/AcceptedPoolShortlist";
import AcceptedPoolDriveDetail from "./pages/Company/AcceptedCollegeOrCandidate/PoolCampus/AcceptedPoolDriveDetail";
import AcceptedJobList from "./pages/Company/AcceptedCollegeOrCandidate/JobListings/AcceptedJobList";
import JobManagement from "./pages/Company/JobManagement/OnCampusListing/OnCampusJobManagement";
import AcceptedOffCampusList from "./pages/Company/AcceptedCollegeOrCandidate/OffCampus/AcceptedOffCampusList";
import PoolCampusJobManagement from "./pages/Company/JobManagement/PoolCampusListing/PoolCampusJobManagement";
import OffCampusJobManagement from "./pages/Company/JobManagement/OffCampusListing/OffCampusJobmanagement";

import JobManagements from "./pages/college/ManageApplication/CampusPlacement/JobManagement";
import JobDetail from "./pages/college/ManageApplication/CampusPlacement/JobDetail";
import { JobProvider } from "./context/College/JobManagement/JobContext";
import { ApplicationProvider } from "./context/College/Registered/ApplicationContext";
import ApplicationsPage from "./pages/college/Registered/Oncampus/ApplicationPage";
import PoolApplicationDetailPage from "./pages/college/Registered/Poolcampus/PoolApplicationDetailPage";
import InternApplicationsPage from "./pages/college/Registered/Internship/InternApplicationPage";
import InternDetailPage from "./pages/college/Registered/Internship/InternDetailPage";
import PoolApplicationsPage from "./pages/college/Registered/Poolcampus/PoolApplication";
import ApplicationDetailPage from "./pages/college/Registered/Oncampus/ApplicationDetailPage";
import JobsListingPage from "./pages/college/CollegeDashboard/OnCampusOpportunity/JobListingPage";
import JobDetailPage from "./pages/college/CollegeDashboard/OnCampusOpportunity/JobDetailPage";
import InternJobsListingPage from "./pages/college/CollegeDashboard/IntershipOpportunity/InternJobListingPage";
import InternJobDetailPage from "./pages/college/CollegeDashboard/IntershipOpportunity/InternJobDetailPage";
import PoolJobListingPage from "./pages/college/CollegeDashboard/PoolCampusOpportunity/PoolJobListingPage";
import PoolJobDetailsPage from "./pages/college/CollegeDashboard/PoolCampusOpportunity/PoolJobDetailPage";
import InternJobListings from "./pages/Students/StudentDashboard/InternshipOpportunity/InternJobListing";
import InternJobDetails from "./pages/Students/StudentDashboard/InternshipOpportunity/InternJobDetails";
import CareerCraft from "./pages/Students/Service_request/CareerCraft";
import Counselling from "./pages/Students/Service_request/Counselling";
import MockInterview from "./pages/Students/Service_request/Mock_Interview";
import OffcampusStatus from "./components/Student/ApplicationStatus/OffCampusListing/OffcampusStatus";
import InternshipStatus from "./components/Student/ApplicationStatus/IntershipOpportunities/InternshipStatus";
import RefferralJobStatus from "./components/Student/ApplicationStatus/ReferralJobs/RefferralJobStatus";
import HackthonStatus from "./components/Student/ApplicationStatus/Hackthon/HackthonStatus";
import AIDrivenJob from "./components/Student/AIDrivenJobSearch/AIDrivenJob";
import Workforce from "./pages/Company/Service_request/workforceSolution/workforce";
import EmployeeTraining from "./pages/Company/Service_request/EmployeeTraining/EmployeeTraining";
import Branding from "./pages/Company/Service_request/Branding/Branding";
import OnCampusJobManagement from "./pages/Company/JobManagement/OnCampusListing/OnCampusJobManagement";
import JobListingJobManagement from "./pages/Company/JobManagement/JobListing/JobListingJobManagement";
import CampusPlacement from "./pages/college/ServiceRequest/CampusPlacement/CampusPlacement";
import StudentTraining from "./pages/college/ServiceRequest/StudentTraining/StudentTaining";
import Seminar from "./pages/college/ServiceRequest/Seminars/Seminar";
import JobManagementApplication from "./pages/college/ManageApplication/CampusPlacement/JobManagement";
import PostJob from "./pages/Company/HiringChannels/PostJob/CreateJob";
import OnCampusHiring from "./pages/Company/HiringChannels/OnCampusHiring/OnCampusHiring";
import PoolEmployeeListing from "./pages/Company/EmployerDashboard/PoolCampus/PoolEmployeeListing";
import PoolCampusEmployeeDash from "./pages/Company/EmployerDashboard/PoolCampus/PoolCampusEmployerDash";

import  FresherCareerCraft from "./pages/Fresher/Service_request/CareerCraft";
import FresherMockInterview from "./pages/Fresher/Service_request/Mock_Interview";
import FresherCounselling from "./pages/Fresher/Service_request/Counselling";
import FresherDashboard from "./pages/Fresher/Dashboard";
import Fresher_Profile from "./pages/Fresher/FresherProfile";
import FJobListings from "./pages/Fresher/FresherDashboard/JobListing/JobListings";
import FJobDetails from "./pages/Fresher/FresherDashboard/JobListing/JobDetails";
import FInternJobListings from "./pages/Fresher/FresherDashboard/InternshipOpportunity/InternJobListing";
import FInternJobDetails from "./pages/Fresher/FresherDashboard/InternshipOpportunity/InternJobDetails";
import FOffCampusJobDetail from "./pages/Fresher/FresherDashboard/OffCampusListing/OffCampusJobDetail";
import FOffCampusJobListings from "./pages/Fresher/FresherDashboard/OffCampusListing/offCampusJobListing";
import FresherHackathon from "./pages/Fresher/FresherDashboard/Hackathon/Hackthon";
import FresherDetail from "./pages/Fresher/FresherDashboard/Hackathon/Detail";
import ManageReferralJobs from "./pages/Professional/ServiceRequest/ManageReferralJobs";
import RefPostingPage from "./pages/Professional/ServiceRequest/refpostingpage";
import PostReferralJobPage from "./pages/Professional/ServiceRequest/postreferral";
import TotalApplicantsPage from "./pages/Professional/ServiceRequest/TotalApplicantsPage";
import OffCampusApplicant from "./pages/Professional/ServiceRequest/OffcampusApplicant";
import ProfDashboard from "./pages/Professional/Dashboard";
import ProfProfile from "./pages/Professional/ProfessionalProfile";
import ProfessionalJobListings from "./pages/Professional/Dashboard/JobListing/JobListings";
import ProfessionalJobDetails from "./pages/Professional/Dashboard/JobListing/JobDetails";
import ProfessionalHackathon from "./pages/Professional/Dashboard/Hackathon/Hackthon";
import ProfessionalDetail from "./pages/Professional/Dashboard/Hackathon/Detail";
import EmployerAcceptedShortlistDrive from "./pages/Employer/AcceptedCollegeOrCandidate/OnCampus/AcceptedShortlistDrive";
import EmployerAcceptedDriveDetail from "./pages/Employer/AcceptedCollegeOrCandidate/OnCampus/AcceptedDriveDetail";
import OnboardingFlowForm from "./pages/Employer/Onboarding/Main";
import EmployerResumeApp from "./components/Employer/EmployerDashboard/ResumeSearch/ResumeApp";
import EmployerInterviewScheduler from "./components/Employer/Interview/InterviewSchedule";
import EmployerListingPage from "./pages/Employer/EmployerDashboard/CollegeListingPage";
import EmployerDetailsPage from "./pages/Employer/EmployerDashboard/CollegeDetailPage";
import EmployerPoolEmployeeListing from "./pages/Employer/EmployerDashboard/PoolCampus/PoolEmployeeListing";
import EmployerPoolCampus from "./pages/Employer/EmployerDashboard/PoolCampus/PoolCampusEmployerDash";
import EmployerWorkforce from "./pages/Employer/Service_request/workforceSolution/workforce";
import EmployerTraining from "./pages/Employer/Service_request/EmployeeTraining/EmployeeTraining";
import EmployerBranding from "./pages/Employer/Service_request/Branding/Branding";
import EmployerOnCampusJobManagement from "./pages/Employer/JobManagement/OnCampusListing/OnCampusJobManagement";
import EmployerPoolCampusJobManagement from "./pages/Employer/JobManagement/PoolCampusListing/PoolCampusJobManagement";
import EmployerOffCampusJobManagement from "./pages/Employer/JobManagement/OffCampusListing/OffCampusJobmanagement";
import EmployerJobListingJobManagement from "./pages/Employer/JobManagement/JobListing/JobListingJobManagement";
import EmployerShortlistedDrivesPage from "./pages/Employer/ShortlistedCollege/OnCampusListing/ShortlistedDrivesPage";
import EmployerDriveDetailPage from "./pages/Employer/ShortlistedCollege/OnCampusListing/DriveDetailPage";
import EmployerPoolCampusShortlistDrive from "./pages/Employer/ShortlistedCollege/PoolCampusListing/PoolCampusShortlistDrive";
import EmployerPoolCampusDetailPage from "./pages/Employer/ShortlistedCollege/PoolCampusListing/PoolCampusDetailPage";
import EmployerOffCampusListingPage from "./pages/Employer/ShortlistedCollege/OffCampusListing/OffCampusListingPage";
import EmployerJobListingPage from "./pages/Employer/ShortlistedCollege/JobListing/JoblistingPage";
import EmployerPostJob from "./pages/Employer/HiringChannels/PostJob/CreateJob";
import EmployerPostIntership from "./pages/Employer/HiringChannels/PostInternship/CreateIntership";
import EmployerOnCampusHiring from './pages/Employer/HiringChannels/OnCampusHiring/OnCampusHiring'
import EmployerPoolCampuses from './pages/Employer/HiringChannels/PoolCampusHiring/PoolCampus'
import EmployerOffCampus from "./pages/Employer/HiringChannels/OffCampusHiring/OffCapus";
import ChatLayout from "./home/chatLayout";
import { useAuth } from "./context/AuthProvider";
import { Navigate } from "react-router-dom";
import EmployerProfile from "./pages/Employer/Dashboard/CompanyProfile";
import LinkedInCallback from "./pages/auth/LinkedInCallback";
import InvitationsPage from "./pages/InvitationsPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import PoolCampusPlacement from "./pages/college/ServiceRequest/PoolCampusPlacement/PoolCampus";
import RefferalJobPosting from './pages/Fresher/FresherDashboard/RefferalJobs/RefferalJobListing'
import RefferalJobDetail from './pages/Fresher/FresherDashboard/RefferalJobs/RefferalJobDetails'
import RefferalPosting from './pages/Professional/Dashboard/RefferalJobs/RefferalJobListing'
import RefferalDetail from './pages/Professional/Dashboard/RefferalJobs/RefferalJobDetails'
// Create query client
const queryClient = new QueryClient();
function AppRoutes() {
   const [authUser] = useAuth() ;

  // const location = useLocation();
  // const [currentPage, setCurrentPage] = useState(1);
  
  // const nextPage = () => {
  //   setCurrentPage((prevPage) => {
  //     console.log("Next Page:", prevPage + 1); // Debugging
  //     return prevPage + 1;
  //   });
  // };

  // const prevPage = () => {
  //   setCurrentPage((prevPage) => {
  //     console.log("Prev Page:", prevPage - 1); // Debugging
  //     return prevPage - 1;
  //   }
  // );
  // };

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
             <Route path="/job-management/off-campus-listings" element={<EmployerOffCampusJobManagement/>} />
             <Route path="/job-management/job-listings" element={<EmployerJobListingJobManagement/>} />

              
               {/* Accepted college / candidates  */}
              <Route path="/Employeeaccepted/on-campus-listings" element={<EmployerAcceptedShortlistDrive/>} />
              <Route path="/accepted/on-campus-listings/:driveId" element={<EmployerAcceptedDriveDetail/>} />

               <Route path="/accepted/pool-campus-listings" element={<AcceptedPoolShortlist/>} />
              <Route path="/accepted/pool-campus-listings/:driveId" element={<AcceptedPoolDriveDetail/>} />
    
              <Route path="/Employee/acceptedJobList" element={<AcceptedJobList/>} />
              <Route path="/accepted/off-campus-listings" element={<AcceptedOffCampusList/>} /> 

              
              {/* shortlisted candidate  */}
                  
              <Route path="/shortlisted/on-campus-listings" element={<EmployerShortlistedDrivesPage/>} />
              <Route path="/shortlisted/on-campus-listings/:driveId" element={<EmployerDriveDetailPage/>} />
      
              <Route path="/shortlisted/pool-campus-listings" element={<EmployerPoolCampusShortlistDrive/>} />
              <Route path="/shortlisted/pool-campus-listings/:driveId" element={<EmployerPoolCampusDetailPage/>} />
      
              <Route path="/shortlisted/off-campus-listings" element={<EmployerOffCampusListingPage/>} />
              <Route path="/joblistingPage" element={<EmployerJobListingPage/>} />

              {/* Hiring Channel  */}
              
              <Route path='/hiring-channels/post-a-job/employer' element={<EmployerPostJob/>} />
              <Route path='/hiring-channels/post-an-internship/employer' element={<EmployerPostIntership/>} />
              <Route path='/hiring-channels/on-campus-hiring/employer' element={<EmployerOnCampusHiring/>} />
              <Route path='hiring-channels/pool-campus-hiring/employer' element={<EmployerPoolCampuses/>} />
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