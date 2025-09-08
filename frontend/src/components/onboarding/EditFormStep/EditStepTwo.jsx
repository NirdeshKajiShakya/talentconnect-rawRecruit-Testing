import React, { useState, useEffect } from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { MailIcon, PhoneIcon, ChevronDownIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/context/RoleContext/RoleContext";

export const EditStepTwo = () => {
  const { selectedRole, setSelectedRole, formData, updateFormData } = useRole();
  const [isEditable, setIsEditable] = useState(false);
  const [localFormData, setLocalFormData] = useState({
    name: formData.name || "",
    email: formData.email || "hello@xyz.com",
    phone: formData.phone || "1234567890",
    profileType: selectedRole || "",
  });

  const navigate = useNavigate();

  // Update local form when context formData changes
  useEffect(() => {
    setLocalFormData(prev => ({
      ...prev,
      name: formData.name || prev.name,
      email: formData.email || prev.email,
      phone: formData.phone || prev.phone,
      profileType: selectedRole || prev.profileType,
    }));
  }, [formData, selectedRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => setIsEditable(true);

  const handleProfileTypeChange = (e) => {
    const newProfileType = e.target.value;
    setLocalFormData((prev) => ({ ...prev, profileType: newProfileType }));
    
    // Update the role context when profile type changes
    setSelectedRole(newProfileType);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save form data to context
    updateFormData({
      name: localFormData.name,
      email: localFormData.email, 
      phone: localFormData.phone,
    });
    
    navigate('/step/3');
  };

  const handleCancel = () => {
    navigate('/step/1');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded w-full max-w-xl p-8"
      >
        <ProgressIndicator currentStep={2} totalSteps={5} />

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">
            Let's begin by sharing some basic details!
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Tell us a bit about yourself. This helps employers get to know you better and ensures a smooth job application process.
          </p>

          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Enter your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={localFormData.name}
              onChange={handleChange}
              disabled={!isEditable}
              placeholder="Your full name"
              className={`w-full p-3 border rounded ${
                !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Enter your email *
            </label>
            <div
              className={`flex items-center gap-3 p-3 border rounded ${
                !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <MailIcon className="w-5 h-5 text-gray-500" />
              <input
                id="email"
                name="email"
                type="email"
                value={localFormData.email}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Enter your mobile no. *
            </label>
            <div
              className={`flex items-center gap-3 p-3 border rounded ${
                !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            >
              <PhoneIcon className="w-5 h-5 text-gray-500" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={localFormData.phone}
                onChange={handleChange}
                disabled={!isEditable}
                className="w-full bg-transparent outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="profileType" className="block text-gray-700 mb-2">
              Select Your Profile Type
            </label>
            <div className="relative">
              <select
                id="profileType"
                name="profileType"
                value={localFormData.profileType}
                onChange={handleProfileTypeChange}
                disabled={!isEditable}
                className={`w-full appearance-none p-3 border rounded ${
                  !isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
              >
                <option value="" disabled>Select</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="professional">Professional</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>
            {localFormData.profileType && (
              <p className="mt-2 text-sm text-gray-600">
                Current profile: <span className="font-medium">{localFormData.profileType.charAt(0).toUpperCase() + localFormData.profileType.slice(1)}</span>
              </p>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              {!isEditable && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
                >
                  Edit
                </button>
              )}
              <button
                type="submit"
                className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};