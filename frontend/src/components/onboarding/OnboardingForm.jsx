
import React, { useState } from "react";
import { X } from "lucide-react";
import { Welcome } from "./FormSteps/Welcome";
import { StepOne } from "./FormSteps/StepOne";
import { StepTwo } from "./FormSteps/StepTwo";
import { StepThree } from "./FormSteps/StepThree";
import { StepFour } from "./FormSteps/StepFour";
import { StepFive } from "./FormSteps/StepFive";
import { Confirmation } from "./FormSteps/Confirmation";
import { FresherStepThree } from "./FormSteps/FresherStepThree";
import { FresherStepFour } from "./FormSteps/FresherStepFour";
import { ProfessionalStepFour } from "./FormSteps/ProfessionalStepFour";
import { useRole } from "@/context/RoleContext/RoleContext";

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    selectedRole,
    setSelectedRole,
    formData,
    updateFormData,
    clearData,
  } = useRole();


  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);

  const handleCancel = () => {
    if (confirm("Are you sure you want to cancel? All progress will be lost.")) {
      clearData(); // This will clear the role and formData.
      setCurrentStep(0);
    }
  };

  const handleSubmit = () => {
    console.log("Onboarding process completed.");
    setCurrentStep(0);
  };

  const handleProfileTypeSelection = (profileType) => {
    setSelectedRole(profileType);
  };

  const handleFormDataChange = (newData) => {
    updateFormData(newData);
  };

  const renderStep = () => {
    const role = selectedRole?.toLowerCase();
    switch (currentStep) {
      case 0: return <Welcome onNext={handleNext} onCancel={handleCancel} />;
      case 1: return <StepOne onNext={handleNext} onCancel={handleCancel} formData={formData} onChange={handleFormDataChange} />;
      case 2: return <StepTwo  onNext={handleNext} onBack={handleBack} onProfileTypeSelect={handleProfileTypeSelection} formData={formData} onChange={handleFormDataChange} />;
      // case 3:
      //   return role === "fresher" 
      //     ? <FresherStepThree onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />
      //     : <StepThree onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />;
      case 3: return <StepThree onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />;
      case 4:
        if (role === "professional") {
          return <ProfessionalStepFour onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />;
        } else if (role === "fresher") {
          return <FresherStepFour onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />;
        } else {
          return <StepFour onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />;
        }
      case 5: return <StepFive onNext={handleNext} onBack={handleBack} formData={formData} onChange={handleFormDataChange} />;
      case 6: return <Confirmation onSubmit={handleSubmit} onCancel={handleBack} />;
      default: return <Welcome onNext={handleNext} onCancel={handleCancel} />;
    }
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="bg-[rgba(0,0,0,0.25)] relative flex min-h-[900px] w-full items-start justify-center p-16 py-28">
        {renderStep()}
        <button onClick={handleCancel} className="absolute w-6 h-6 right-4 top-4 text-white cursor-pointer" aria-label="Close">
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};