

import React, { useState } from "react";
import IntroduceYourself from "./Introduction";
import ConnectToCompany from "./ConnecToCompany";
import DefineHiringPreferences from "./HiringPrefrences";
import Welcome from "./Welcome";
import TermsAndConditions from "./TermsCondition";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

const OnboardingFlowForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const[authUser , setAuthUser] = useAuth() ;

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      const finalFormData = new FormData();

      // 1. Employer Details
      const employerDetails = {
        name: formData.name,
        designation: formData.designation,
        workEmail: formData.email,
        mobile: formData.mobile,
        linkedIn: formData.linkedin,
      };
      finalFormData.append("employerDetails", JSON.stringify(employerDetails));

      // 2. Images (if they exist)
      if (formData.profileImage) {
        finalFormData.append("profileImage", formData.profileImage);
      }
      if (formData.backgroundImage) {
        finalFormData.append("backgroundImage", formData.backgroundImage);
      }

      // 3. Company Details
      const companyDetails = {
        companyName: formData.companyName,
        location: formData.companyLocation,
        state: formData.state,
        city: formData.city,
        country: formData.country,
        pincode: formData.pincode,
      };
      finalFormData.append("companyDetails", JSON.stringify(companyDetails));

      // 4. Hiring Preferences
      const hiringPreferences = {
        jobRoles: formData.jobRoles || [],
        hiringLocations: formData.hiringLocations || [],
        lookingFor: formData.lookingFor,
        // FIX 1: Changed 'employmentTypes' to 'employmentType' to match schema
        employmentType: formData.employmentType ? [formData.employmentType] : [],
      };
      finalFormData.append("hiringPreferences", JSON.stringify(hiringPreferences));

      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/api/dashboard/employerOnboarding`,
        finalFormData,
        { withCredentials: true }
      );

      if(response.data && response.data.user){
        const updatedUserFromServer = response.data.user ;

        const finalUser = {
          ...authUser.user ,
          ...updatedUserFromServer,
        };

        setAuthUser({user : finalUser});
      }

      if (response.status === 201) {
        console.log("Onboarding created successfully:", response.data.profile);
        alert("Registration completed successfully!");
        navigate("/home"); 
      } else {
        console.error("Failed to create onboarding:", response.data.message || "Unknown error");
        alert(
          `Failed to complete registration: ${response.data.message || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error.response?.data?.message || error.message || "An unexpected error occurred.";
      alert(`Error during registration: ${errorMessage}`);
      
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("No response from server. Please check your network connection.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        {currentStep === 0 && <Welcome onNext={nextStep} />}
        {currentStep === 1 && (
          <IntroduceYourself
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 2 && (
          <ConnectToCompany
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 3 && (
          <DefineHiringPreferences
            onBack={prevStep}
            formData={formData}
            onNext={nextStep}
            updateFormData={updateFormData}
          />
        )}
        {currentStep === 4 && (
          <TermsAndConditions
            onNext={nextStep}
            onBack={prevStep}
            formData={formData}
            updateFormData={updateFormData}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingFlowForm;

