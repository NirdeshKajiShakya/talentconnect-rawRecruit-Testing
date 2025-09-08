import React from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { MailIcon, PhoneIcon, ChevronDownIcon } from "lucide-react";

export const StepTwo = ({ onNext, onBack, onProfileTypeSelect, formData, onChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    // This correctly updates the central state
  
    onChange({ [name]: value });
  };


  const handleProfileTypeChange = (e) => {
    const selectedProfileType = e.target.value;
    onProfileTypeSelect(selectedProfileType);
    onChange({ profileType: selectedProfileType });
  };

  const handleNextClick = () => {
    if (!formData.email || !formData.phone || !formData.profileType||!formData.name) {
      alert("Please fill in all required fields: Name,Email, Phone, and Profile Type.");
      return;
    }
    onNext();
  };

  return (
    <div className="justify-center items-stretch bg-white z-0 flex min-w-60 flex-col w-[560px] my-auto p-12 max-md:max-w-full max-md:px-5">
      <ProgressIndicator currentStep={2} totalSteps={5} />
      <div className="flex w-full flex-col items-stretch justify-center mt-8 max-md:max-w-full">
        <h2 className="text-[32px] font-bold leading-[42px]">Basic Information</h2>
        <p className="text-base font-normal leading-6 mt-2">This information will be visible to recruiters.</p>

        {/* Your Name Input */}
        <div className="w-full mt-6">
          <label htmlFor="name" className="block text-black">Your Name</label>
          <div className="flex items-center min-h-12 w-full mt-2 p-3 border rounded">
            {/* --- CHANGE: The value is now connected to formData.name --- */}
            <input type="text" id="name" required name="name" placeholder="Your Name" className="w-full bg-transparent border-none focus:outline-none" value={formData.name || ""} onChange={handleChange}/>
          </div>
        </div>

        {/* Email ID Input */}
        <div className="w-full mt-6">
          <label htmlFor="email" className="block text-black">Email ID <span className="text-red-500">*</span></label>
          <div className="flex items-center min-h-12 w-full mt-2 p-3 border rounded">
            <MailIcon className="w-6 h-6" />
            {/* --- CHANGE: The value is now connected to formData.email --- */}
            <input type="email" id="email" name="email" placeholder="name@email.com" className="w-full bg-transparent border-none focus:outline-none ml-2" value={formData.email || ""} onChange={handleChange} required/>
          </div>
        </div>

        {/* Phone Number Input */}
        <div className="w-full mt-6">
          <label htmlFor="phone" className="block text-black">Phone Number <span className="text-red-500">*</span></label>
          <div className="flex items-center min-h-12 w-full mt-2 p-3 border rounded">
            <PhoneIcon className="w-6 h-6" />
            {/* --- CHANGE: The value is now connected to formData.phone --- */}
            <input type="tel" id="phone" name="phone" placeholder="e.g. +91 9876543210" className="w-full bg-transparent border-none focus:outline-none ml-2" value={formData.phone || ""} onChange={handleChange} required/>
          </div>
        </div>

        {/* Profile Type Select */}
        <div className="w-full mt-6 relative">
          <label htmlFor="profileType" className="block text-black">
            Profile Type <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="profileType"
              name="profileType"
              // The value is already correctly connected here
              value={formData.profileType || ""} 
              onChange={handleProfileTypeChange}
              required
              className="items-center appearance-none flex min-h-12 w-full mt-2 p-3 border rounded"
            >
              <option value="" disabled>Select a profile type</option>
              <option value="student">Student</option>
              <option value="fresher">Fresher</option>
              <option value="professional">Professional</option>
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex min-h-12 w-full gap-4 mt-6">
          <button type="button" onClick={onBack} className="text-black px-6 py-3 border rounded-md">Back</button>
          <button
            type="button"
            onClick={handleNextClick}
            className="bg-black text-white px-6 py-3 border rounded-md"
            disabled={!formData.email || !formData.phone || !formData.profileType}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};