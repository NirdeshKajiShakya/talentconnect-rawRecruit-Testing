import React from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { ChevronDownIcon, UploadIcon } from "lucide-react";

// The component now directly uses formData and the onChange prop.
export const StepFive = ({ onNext, onBack, formData, onChange }) => {
  
  // This handler properly merges changes with existing formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ 
      ...formData, // Spread existing formData
      [name]: value 
    });
  };
  
  const handleNextClick = () => {
    onNext();
  };

  // Helper function to handle skills
  const handleSkillsChange = (e) => {
    // When the user edits the textarea, we pass the updated formData with new skills value
    onChange({ 
      ...formData, // Spread existing formData
      skills: e.target.value 
    });
  }

  // Helper function to handle certifications
  const handleCertificationsChange = (e) => {
    onChange({ 
      ...formData, // Spread existing formData
      certifications: e.target.value 
    });
  }

  // Debug: Log the formData to see what's available
  console.log("StepFive formData:", formData);

  return (
    <div className="justify-center items-stretch bg-white z-0 flex min-w-60 flex-col w-[560px] my-auto p-12 max-md:max-w-full max-md:px-5">
      <ProgressIndicator currentStep={5} totalSteps={5} />
      <div className="flex w-full flex-col items-stretch justify-center mt-8 max-md:max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h2 className="text-[32px] font-bold leading-[42px] max-md:max-w-full">
            You're almost there! Let's add final details and submit!
          </h2>
          <p className="text-base font-normal leading-6 mt-2 max-md:max-w-full">
            Highlight your skills and achievements to stand out to employers.
          </p>
        </div>

        <form className="w-full text-base font-normal mt-8 max-md:max-w-full">
          {/* Skills - Changed to a textarea for autofill */}
          <div className="w-full max-md:max-w-full">
            <label htmlFor="skills" className="block text-black">Skills</label>
            <textarea
              id="skills"
              name="skills"
              rows="4"
              // Handle both array and string formats from resume parsing
              value={Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.skills || ""}
              onChange={handleSkillsChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded"
              placeholder="e.g., JavaScript, React, Node.js"
            ></textarea>
          </div>

          {/* Certifications */}
          <div className="w-full whitespace-nowrap mt-6 max-md:max-w-full">
            <label htmlFor="certifications" className="block text-black">Certifications</label>
            <textarea
              id="certifications"
              name="certifications"
              rows="4"
              // Handle both array and string formats from resume parsing
              value={Array.isArray(formData.certifications) ? formData.certifications.join('\n') : formData.certifications || ""}
              onChange={handleCertificationsChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded min-h-[80px]"
              placeholder="e.g. Google"
            ></textarea>
          </div>
          
          {/* Social Links */}
          <div className="w-full mt-6 max-md:max-w-full">
            <label htmlFor="linkedin" className="block text-black">LinkedIn Profile</label>
            <input
              id="linkedin"
              name="linkedin"
              type="text"
              // Bind directly to formData
              value={formData.linkedin || ""}
              onChange={handleChange}
              className="flex min-h-12 w-full mt-2 p-3 border border-gray-300 rounded"
              placeholder="linkedinprofile"
            />
          </div>
          <div className="w-full mt-6 max-md:max-w-full">
            <label htmlFor="github" className="block text-black">Github Profile</label>
            <input
              id="github"
              name="github"
              type="text"
              // Bind directly to formData
              value={formData.github || ""}
              onChange={handleChange}
              className="flex min-h-12 w-full mt-2 p-3 border border-gray-300 rounded"
              placeholder="githubprofile"
            />
          </div>

          {/* Buttons */}
          <div className="flex min-h-12 w-full gap-2.5 whitespace-nowrap mt-6 max-md:max-w-full">
            <div className="flex gap-4">
              <button type="button" onClick={onBack} className="self-stretch gap-2 text-black border rounded-md px-6 py-3 max-md:px-5 cursor-pointer hover:bg-gray-50">
                Back
              </button>
              <button type="button" onClick={handleNextClick} className="self-stretch bg-black border rounded-md gap-2 text-white px-6 py-3 max-md:px-5 cursor-pointer hover:bg-gray-800">
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};