import React, { useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Import Page Components
import EditReview from './EditReview';
import EditCollegeDetails from './EditCollegeDetails';
import EditCoordinator from './EditCordinator';
import EditRecruitmentDetails from './EditRecruitmentDetails';
import EditProfileAchievements from './EditProfileAchievements';
import EditTermsAndCondition from './EditTermsAndCondition';

// Import Shared Component
import ProgressStepper from '../onboardingForm/ProgressStepper';

// Define step configuration with proper route paths
const steps = [
  { path: '/college-edit/edit-review', name: 'Review', component: EditReview, stepNumber: 1 },
  { path: '/college-edit/edit-college-details', name: 'College', component: EditCollegeDetails, stepNumber: 2 },
  { path: '/college-edit/edit-coordinator-details', name: 'Coordinator', component: EditCoordinator, stepNumber: 3 },
  { path: '/college-edit/edit-recruitment-details', name: 'Recruitment', component: EditRecruitmentDetails, stepNumber: 4 },
  { path: '/college-edit/edit-profile-achievements', name: 'Profile', component: EditProfileAchievements, stepNumber: 5 },
  { path: '/college-edit/edit-terms-conditions', name: 'Terms', component: EditTermsAndCondition, stepNumber: 6 },
];

// Step names for the visual stepper
const stepperSteps = ['College', 'Coordinator', 'Recruitment', 'Profile'];
const totalVisibleStepperSteps = stepperSteps.length;

function EditOnboardingFlow() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const updateFormData = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  const currentStepConfig = steps.find(step => location.pathname === step.path);
  const currentStepNumber = currentStepConfig ? currentStepConfig.stepNumber : 0;
  const showStepper = currentStepNumber >= 2 && currentStepNumber <= 5;
  const stepperCurrentActiveIndex = showStepper ? currentStepNumber - 2 : 0;

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
            path={path.replace('/college-edit', '')} // strip base path for internal match
            element={
              <Component
                formData={formData}
                updateFormData={updateFormData}
                isEditing={isEditing}
                toggleEdit={toggleEdit}
                nextStep={handleNext}
                prevStep={handlePrev}
              />
            }
          />
        ))}
      </Routes>
    </div>
  );
}

export default EditOnboardingFlow;
