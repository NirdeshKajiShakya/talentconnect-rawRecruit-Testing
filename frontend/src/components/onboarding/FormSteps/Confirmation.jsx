import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/context/RoleContext/RoleContext";
import axios from 'axios';
import { useAuth } from "@/context/AuthProvider";

export const Confirmation = ({ onSubmit, onCancel }) => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  
  
  const { selectedRole, formData, clearFormData } = useRole();
  const[, setAuthUser] = useAuth() ;
  const handleCheckboxChange = () => {
    setAgreed(!agreed);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    if (!selectedRole) {
        alert("Profile type not selected. Please go back and select a profile type.");
        return;
    }

    const dataToSend = new FormData();
    const tempFormData = { ...formData };

    // This ensures profileType isn't added twice if it exists in formData
    delete tempFormData.profileType;

   
    if (tempFormData.experiences && Array.isArray(tempFormData.experiences)) {
        const experiencesData = [];
        tempFormData.experiences.forEach((exp) => {
            const expCopy = { ...exp };
            if (exp.experienceCertificate instanceof File) {
                dataToSend.append('experienceCertificate', exp.experienceCertificate, exp.experienceCertificate.name);
                delete expCopy.experienceCertificate;
            }
            experiencesData.push(expCopy);
        });
        dataToSend.append('experiences', JSON.stringify(experiencesData));
    }
    delete tempFormData.experiences;

    
    for (const key in tempFormData) {
      const value = tempFormData[key];
      if (value === null || value === undefined) continue;

      if (value instanceof File) {
        dataToSend.append(key, value, value.name);
      } else if (Array.isArray(value)) {
        dataToSend.append(key, value.join(','));
      } else {
        dataToSend.append(key, value.toString());
      }
    }

    // Append the definitive profileType from context
    dataToSend.append('profileType', selectedRole);
    
    console.log("Submitting FormData to backend...");
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_URL}/api/onboarding`, dataToSend, {
        withCredentials: true,
      });

      //console.log("Response from backend:", response.data);
      alert('Candidate profile created successfully!');
      
      if(response.data && response.data.user){
        setAuthUser({user : response.data.user}) ;
      }
     
   
       clearFormData();
      if (onSubmit) {
          onSubmit(); 
      }
      
      const userTypeFromDb = response.data.profileType || response.data.userType;
      if (userTypeFromDb) {
        const lowerCaseUserType = userTypeFromDb.toLowerCase();
        switch (lowerCaseUserType) {
          case 'professional':
            navigate('/profhome', { replace: true });
            break;
          case 'fresher':
            navigate('/fresherhome', { replace: true });
            break;
          case 'student':
            navigate('/home', { replace: true });
            break;
          default:
             // Fallback navigation
             navigate('/home', { replace: true });
        }
      } else {
        console.warn("User type not found in response. Navigating to general home.");
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error("Network or backend submission error:", error);
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        const errorMessage = error.response.data.details || error.response.data.error || 'An unknown error occurred.';
        alert(`Submission failed: ${errorMessage}`);
      } else if (error.request) {
        alert("Network error: No response from server.");
      } else {
        alert(`An error occurred: ${error.message}`);
      }
    }
  };

  return (
    <div className="justify-center items-stretch bg-white z-0 flex min-w-60 flex-col w-[1144px] my-auto pb-6 max-md:max-w-full">
      <div className="flex min-h-6 w-full items-stretch gap-[15px] justify-center flex-wrap mt-5 max-md:max-w-full">
        <div className="flex items-center gap-2.5 justify-center h-full w-6">
          <input type="checkbox" id="terms" checked={agreed} onChange={handleCheckboxChange} className="w-6 h-6 cursor-pointer" />
        </div>
        <label htmlFor="terms" className="self-stretch min-w-60 min-h-6 gap-2.5 text-base text-black font-normal text-center my-auto cursor-pointer">
          I agree to the Terms & Conditions and Privacy Policy.
        </label>
      </div>
      
      {selectedRole && (
        <div className="text-center mt-2">
          <p>Profile type: <strong>{selectedRole}</strong></p>
        </div>
      )}

      <div className="self-center flex items-center gap-4 text-base font-normal mt-6">
        <div className="self-stretch flex min-w-60 gap-4 my-auto">
          <button onClick={onCancel} className="self-stretch gap-2 border rounded-md text-black whitespace-nowrap px-6 py-3 max-md:px-5 cursor-pointer" type="button">
            Back
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!agreed} 
            className={`self-stretch gap-2 text-white px-6 border rounded-md py-3 max-md:px-5 cursor-pointer ${agreed ? "bg-black" : "bg-gray-400"}`} 
            type="submit"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};