import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Form data state
  const [formData, setFormData] = useState({
    // Resume Upload
    resume: null,
    
    // Basic Details
    name: '',
    email: '',
    mobile: '',
    profileType: '',
    
    // Education Background
    college: '',
    degree: '',
    graduationYear: '',
    fieldOfStudy: '',
    cgpa: '',
    degreeCertificate: null,
    
    // Career Goals
    interestedIndustry: [],
    interestedJobRoles: [],
    preferredLocations: [],
    expectedSalary: '',
    lookingFor: [],
    employmentType: [],
    internshipTrainings: '',
    jobRole: '',
    startDate: '',
    endDate: '',
    roleDescription: '',
    
    // Final Details
    skills: [],
    certifications: '',
    linkedinProfile: '',
    githubProfile: '',
    portfolio: '',
    referralSource: '',
  });

  // Update form data
  const updateFormData = (newData) => {
    setFormData(prevData => ({ ...prevData, ...newData }));
  };

  // Track edit mode for each step
  const [editMode, setEditMode] = useState({
    resumeUpload: false,
    basicDetails: false,
    education: false,
    careerGoals: false,
    finalDetails: false
  });

  // Toggle edit mode for a specific step
  const toggleEditMode = (step) => {
    setEditMode(prev => ({
      ...prev,
      [step]: !prev[step]
    }));
  };

  // Reset all edit modes to false
  const resetEditModes = () => {
    setEditMode({
      resumeUpload: false,
      basicDetails: false,
      education: false,
      careerGoals: false,
      finalDetails: false
    });
  };

  return (
    <AppContext.Provider value={{ 
      formData, 
      updateFormData, 
      editMode, 
      toggleEditMode,
      resetEditModes
    }}>
      {children}
    </AppContext.Provider>
  );
};