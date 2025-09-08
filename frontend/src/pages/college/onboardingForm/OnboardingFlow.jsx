


import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import {useAuth} from '../../../context/AuthProvider'

// Import Page Components
import Welcome from './Welcome';
import CollegeDetails from './CollegeDetails';
import CoordinatorDetails from './CoordinatorDetails';
import RecruitmentDetails from './RecruitmentDetails';
import ProfileAchievements from './ProfileAchievements';
import TermsAndConditions from './TermsAndConditions';


import ProgressStepper from './ProgressStepper';

// Define step configuration with proper route paths
const steps = [
  { path: '/college-onboarding', name: 'Welcome', component: Welcome, stepNumber: 1 },
  { path: '/college-onboarding/college-details', name: 'College', component: CollegeDetails, stepNumber: 2 },
  { path: '/college-onboarding/coordinator-details', name: 'Coordinator', component: CoordinatorDetails, stepNumber: 3 },
  { path: '/college-onboarding/recruitment-details', name: 'Recruitment', component: RecruitmentDetails, stepNumber: 4 },
  { path: '/college-onboarding/profile-achievements', name: 'Profile', component: ProfileAchievements, stepNumber: 5 },
  { path: '/college-onboarding/terms-conditions', name: 'Terms', component: TermsAndConditions, stepNumber: 6 },
];

// Step names for the visual stepper
const stepperSteps = ['College', 'Coordinator', 'Recruitment', 'Profile'];
const totalVisibleStepperSteps = stepperSteps.length;

function OnboardingFlow() {
  const location = useLocation();
  const navigate = useNavigate();
  const [authUser , setAuthUser] = useAuth() ;

  const [formData, setFormData] = useState({
    collegeName: '',
    collegeLocation: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    coordinatorName: '',
    designation: '',
    officialEmail: '',
    officialMobile: '',
    linkedinProfile: '', 
    programsOffered: '', // Changed to string for single select dropdown
    popularCoursesForRecruitment: '', // Changed to string for single select dropdown
    preferredHiringCompanies: '', // Changed to string for single select dropdown
    recruitmentServicesRequired: '', // Changed to string for single select button
    collegeBrochure: null, // Storing the File object directly
    collegeWebsite: '', // This will be used for ProfileAchievements
    unicefinProfile: '', // This is likely a typo and should be linkedinProfile for ProfileAchievements
    workshops: [],
    volunteering: [],
    awards: [],
    acceptedTerms: false,
  });

  const updateFormData = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentStepConfig = steps.find(step => step.path === location.pathname);
  const currentOverallStepNumber = currentStepConfig ? currentStepConfig.stepNumber : 0;
  const showStepper = currentOverallStepNumber >= 2 && currentOverallStepNumber <= 5;
  const stepperCurrentActiveIndex = showStepper ? currentOverallStepNumber - 2 : 0;

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.path === location.pathname);
    if (currentIndex !== -1 && currentIndex + 1 < steps.length) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const handlePrev = () => {
    const currentIndex = steps.findIndex(s => s.path === location.pathname);
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].path);
    }
  };

  const handleSubmit = async () => {
    try {
      const backendUrl = import.meta.env.VITE_Backend_URL; // Using environment variable

      const data = new FormData();

      // Append collegeUniversityDetails
      data.append('collegeUniversityDetails', JSON.stringify({
        collegeName: formData.collegeName,
        collegeLocation: formData.collegeLocation,
        state: formData.state,
        city: formData.city,
        country: formData.country,
        pincode: formData.pincode,
      }));

   
      data.append('placementCoordinatorDetails', JSON.stringify({
        coordinatorName: formData.coordinatorName,
        designation: formData.designation,
        officialEmail: formData.officialEmail,
        officialMobile: formData.officialMobile,
        linkedinUrl: formData.linkedinProfile, // Mapped to linkedinUrl as per backend schema
      }));

      // Append placementRecruitmentDetails
      // Note: collegeBrochure is handled separately as a file
      data.append('placementRecruitmentDetails', JSON.stringify({
        programsOffered: formData.programsOffered ? [formData.programsOffered] : [], // Convert to array as per schema
        popularCoursesForRecruitment: formData.popularCoursesForRecruitment ? [formData.popularCoursesForRecruitment] : [], // Convert to array
        preferredHiringCompanies: formData.preferredHiringCompanies ? [formData.preferredHiringCompanies] : [], // Convert to array
        recruitmentServicesRequired: formData.recruitmentServicesRequired ? [formData.recruitmentServicesRequired] : [], // Convert to array
        // collegeBrochureUrl will be handled on the backend
      }));

      // Append profileAchievements
      data.append('profileAchievements', JSON.stringify({
        collegeWebsite: formData.collegeWebsite,
        linkedinProfile: formData.unicefinProfile, // Mapped to linkedinProfile as per backend schema
      }));

      // Append workshops, volunteering, awards as JSON strings
      data.append('workshops', JSON.stringify(formData.workshops.map(w => ({
        workshopName: w.name,
        startDate: w.startDate,
        endDate: w.endDate,
        description: w.executor, // Backend schema has 'description', frontend has 'executor'
      }))));

      data.append('volunteering', JSON.stringify(formData.volunteering.map(v => ({
        eventName: v.name,
        startDate: v.startDate,
        endDate: v.endDate,
        description: v.executor, // Backend schema has 'description', frontend has 'executor'
      }))));
      
      data.append('awards', JSON.stringify(formData.awards.map(a => ({
        awardTitle: a.name,
        startDate: a.startDate,
        endDate: a.endDate,
        awardingOrganization: a.organization, // Backend schema has 'awardingOrganization', frontend has 'organization'
      }))));


      // Append collegeBrochure file if it exists
      if (formData.collegeBrochure) {
        data.append('collegeBrochure', formData.collegeBrochure);
      }

      const response = await axios.post(`${backendUrl}/api/college-onboarding/submit-onboarding`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true ,
      });

     if (response.data && response.data.user) {
        const updatedUserFromServer = response.data.user;

       
        const finalUser = {
          ...authUser.user,
          ...updatedUserFromServer, 
        };

        
        setAuthUser({ user: finalUser });
      }

    
      alert('College onboarding form submitted successfully!');
      navigate('/home'); 
    } catch (error) {
      console.error('Submission failed:', error.response ? error.response.data : error.message);
      alert('Submission failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      {showStepper && (
        <ProgressStepper
          currentStep={stepperCurrentActiveIndex}
          totalSteps={totalVisibleStepperSteps}
          stepNames={stepperSteps}
        />
      )}

      <Routes>
        {steps.map(({ path, component: Component }) => (
          <Route
            key={path}
            path={path.replace('/college-onboarding', '')} 
            element={
              <Component
                formData={formData}
                updateFormData={updateFormData}
                nextStep={handleNext}
                prevStep={handlePrev}
                // Pass handleSubmit only to the final step (TermsAndConditions) if needed there,
                // otherwise, it's triggered internally by OnboardingFlow
                handleSubmit={path === '/college-onboarding/terms-conditions' ? handleSubmit : undefined}
              />
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default OnboardingFlow;
