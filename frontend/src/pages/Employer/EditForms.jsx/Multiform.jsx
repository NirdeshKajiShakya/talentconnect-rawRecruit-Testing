import { useState } from 'react';
import StepIndicator from './StepIndicator';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import ReviewStep from './ReviewStep';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [editingStep, setEditingStep] = useState(null);

  const [formData, setFormData] = useState({
    // Step 1 - Employer Info
    name: '',
    designation: '',
    email: 'hello@xyz.com',
    mobile: '1234567890',
    linkedin: 'www.relume.io',
    
    // Step 2 - Company Info
    companyName: '',
    companyLocation: '',
    state: '',
    city: '',
    country: '',
    pincode: '',
    
    // Step 3 - Hiring Preferences
    jobRoles: '',
    locations: '',
    lookingFor: 'Internship',
    employmentType: 'Full-time'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const toggleEdit = () => {
    if (editingStep === currentStep) {
      setEditingStep(null);
    } else {
      setEditingStep(currentStep);
    }
  };

  const isCurrentStepEditable = () => {
    return editingStep === currentStep;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
        {currentStep < 4 && <StepIndicator currentStep={currentStep} />}
        
        {currentStep === 1 && (
          <Step1 
            formData={formData} 
            handleInputChange={handleInputChange} 
            isEditable={isCurrentStepEditable()} 
          />
        )}
        {currentStep === 2 && (
          <Step2 
            formData={formData} 
            handleInputChange={handleInputChange} 
            isEditable={isCurrentStepEditable()} 
          />
        )}
        {currentStep === 3 && (
          <Step3 
            formData={formData} 
            handleInputChange={handleInputChange} 
            isEditable={isCurrentStepEditable()} 
          />
        )}
        {currentStep === 4 && <ReviewStep formData={formData} setCurrentStep={setCurrentStep} />}

        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded ${
                currentStep === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={toggleEdit}
                className={`px-6 py-2 rounded ${
                  isCurrentStepEditable()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isCurrentStepEditable() ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={currentStep === 3 ? () => setCurrentStep(4) : nextStep}
                className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                {currentStep === 3 ? 'Next' : 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;