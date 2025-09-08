

import React from "react";
import { useState } from "react";

const DefineHiringPreferences = ({ onBack, formData,onNext, updateFormData, onSubmit }) => {
  const [errors, setErrors] = useState({});
  const [showJobRolesDropdown, setShowJobRolesDropdown] = useState(false);
  const [showLocationsDropdown, setShowLocationsDropdown] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobRoles?.length) newErrors.jobRoles = 'Job roles are required';
    if (!formData.hiringLocations?.length) newErrors.hiringLocations = 'Hiring locations are required';
    if (!formData.lookingFor) newErrors.lookingFor = 'Please select what you are looking for';
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleNextClick = () => { // Renamed to avoid confusion with the form's final onSubmit
    if (validateForm()) {
      onNext(); // This navigates to the next step (TermsAndConditions)
    }
  };

  const handleLookingForChange = (value) => {
    updateFormData({ lookingFor: value });
  };

  const handleEmploymentTypeChange = (value) => {
    updateFormData({ employmentType: value });
  };

  const toggleJobRolesDropdown = () => {
    setShowJobRolesDropdown(!showJobRolesDropdown);
    setShowLocationsDropdown(false);
  };

  const toggleLocationsDropdown = () => {
    setShowLocationsDropdown(!showLocationsDropdown);
    setShowJobRolesDropdown(false);
  };

  const handleJobRoleSelect = (role) => {
    const currentRoles = formData.jobRoles || [];
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(r => r !== role)
      : [...currentRoles, role];
    updateFormData({ jobRoles: newRoles });
  };

  const handleLocationSelect = (location) => {
    const currentLocations = formData.hiringLocations || [];
    const newLocations = currentLocations.includes(location)
      ? currentLocations.filter(l => l !== location)
      : [...currentLocations, location];
    updateFormData({ hiringLocations: newLocations });
  };

  const jobRoleOptions = ["Software Engineer", "Data Scientist", "Product Manager", "Designer", "Marketing"];
  const locationOptions = ["New York", "San Francisco", "Remote", "London", "Austin"];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Define Your Hiring Preferences!
      </h2>
      <p className="text-gray-600 mb-6">
        Tell us what roles you're hiring for and where!
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Roles You Hire For
          </label>
          <div className="relative">
            <div
              onClick={toggleJobRolesDropdown}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex justify-between items-center ${
                errors.jobRoles ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <span>
                {formData.jobRoles?.length > 0
                  ? formData.jobRoles.join(", ")
                  : "Select job roles"}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showJobRolesDropdown ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showJobRolesDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {jobRoleOptions.map((role) => (
                  <div
                    key={role}
                    onClick={() => handleJobRoleSelect(role)}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      formData.jobRoles?.includes(role) ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {role}
                  </div>
                ))}
              </div>
            )}
            {errors.jobRoles && (
              <p className="mt-1 text-sm text-red-600">{errors.jobRoles}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Hiring Locations
          </label>
          <div className="relative">
            <div
              onClick={toggleLocationsDropdown}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex justify-between items-center ${
                errors.hiringLocations ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <span>
                {formData.hiringLocations?.length > 0
                  ? formData.hiringLocations.join(", ")
                  : "Select locations"}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  showLocationsDropdown ? "transform rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showLocationsDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                {locationOptions.map((location) => (
                  <div
                    key={location}
                    onClick={() => handleLocationSelect(location)}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                      formData.hiringLocations?.includes(location) ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {location}
                  </div>
                ))}
              </div>
            )}
            {errors.hiringLocations && (
              <p className="mt-1 text-sm text-red-600">{errors.hiringLocations}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Looking for
          </label>
          <div className="flex space-x-2">
            {['job', 'internship', 'both'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleLookingForChange(option)}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  formData.lookingFor === option
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.lookingFor && (
            <p className="mt-1 text-sm text-red-600">{errors.lookingFor}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Employment type
          </label>
          <div className="flex space-x-2">
            {['Part-time', 'Full-time', 'Contract'].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleEmploymentTypeChange(option)}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  formData.employmentType === option
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.employmentType && (
            <p className="mt-1 text-sm text-red-600">{errors.employmentType}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNextClick}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DefineHiringPreferences;