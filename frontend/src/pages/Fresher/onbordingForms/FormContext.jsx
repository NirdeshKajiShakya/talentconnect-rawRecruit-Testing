import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormContext = createContext();

function useForm() {
  return useContext(FormContext);
}

const FormProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resume: null,
    name: '',
    email: '',
    mobile: '',
    profileType: '',
    education: {
      college: '',
      degree: '',
      graduationYear: '',
      fieldOfStudy: '',
      gpa: '',
      certificate: null
    },
    careerGoals: {
      industry: [],
      jobRoles: [],
      locations: [],
      salary: '',
      lookingFor: [],
      employmentType: '',
      internships: '',
      jobRole: '',
      startDate: '',
      endDate: '',
      description: ''
    },
    finalDetails: {
      skills: [],
      certifications: '',
      linkedinProfile: '',
      githubProfile: '',
      portfolio: '',
      project: null,
      referralSource: ''
    },
    agreedToTerms: false
  });

  const updateFormData = (section, data) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof data === 'object' && !Array.isArray(data)
        ? { ...prev[section], ...data }
        : data
    }));
  };

  const steps = [
    { path: '/fresher/welcome', label: 'Welcome' },
    { path: '/fresher/upload-resume', label: 'Resume Upload' },
    { path: '/fresher/basic-details', label: 'Basic Details' },
    { path: '/fresher/education', label: 'Education' },
    { path: '/fresher/career-goals', label: 'Career Goals' },
    { path: '/fresher/final-details', label: 'Final Details' },
    { path: '/fresher/agreement', label: 'Agreement' }
  ];

  const progressSteps = steps.filter(
    step => !['/fresher/welcome', '/fresher/agreement'].includes(step.path)
  );

  const getCurrentStepIndex = () => {
    const currentPath = window.location.pathname;
    return steps.findIndex(step => step.path === currentPath);
  };

  const getCurrentStep = () => {
    const index = getCurrentStepIndex();
    return index >= 0 ? index + 1 : 0;
  };

  const goToNextStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const goToPrevStep = () => {
    const currentIndex = getCurrentStepIndex();
    if (currentIndex > 0) {
      navigate(steps[currentIndex - 1].path);
    }
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      getCurrentStep,
      steps,
      progressSteps,
      goToNextStep,
      goToPrevStep
    }}>
      {children}
    </FormContext.Provider>
  );
};

export { useForm };
export default FormProvider;
