import React, { useState } from "react";
import {
  fieldOptions,
  educationLevels,
  experienceOptions,
  certificateOptions,
  authorizationOptions,
} from "../constants/jobFormOptions";

const SelectionCriteriaForm = () => {
  const [selectedField, setSelectedField] = useState("");
  const [selectedEducation, setSelectedEducation] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [selectedAuthorization, setSelectedAuthorization] = useState("");

  return (
    <div className="flex flex-col items-center bg-white py-8 px-4">
      <div className="w-full max-w-lg border border-gray-300 rounded-md p-6 bg-white space-y-6">
        <h2 className="text-xl font-bold mb-1">Selection Criteria</h2>
        <p className="text-gray-600 text-sm mb-4">
          Outline the steps involved in assessing applicants to ensure the best fit for the role
        </p>

        {/* Field of Study */}
        <div>
          <label className="block text-sm font-medium mb-2">Field of Study *</label>
          <select
            value={selectedField}
            onChange={(e) => setSelectedField(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Field</option>
            {fieldOptions.map((field, index) => (
              <option key={index} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        {/* Education Level */}
        <div>
          <label className="block text-sm font-medium mb-2">Minimum Education Level *</label>
          <select
            value={selectedEducation}
            onChange={(e) => setSelectedEducation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Education</option>
            {educationLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium mb-2">Experience *</label>
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Experience</option>
            {experienceOptions.map((exp, index) => (
              <option key={index} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Certifications */}
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Certification</label>
          <select
            value={selectedCertificate}
            onChange={(e) => setSelectedCertificate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Certificate</option>
            {certificateOptions.map((cert, index) => (
              <option key={index} value={cert}>
                {cert}
              </option>
            ))}
          </select>
        </div>

        {/* Work Authorization */}
        <div>
          <label className="block text-sm font-medium mb-2">Work Authorization</label>
          <select
            value={selectedAuthorization}
            onChange={(e) => setSelectedAuthorization(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
          >
            <option value="">Select Authorization</option>
            {authorizationOptions.map((auth, index) => (
              <option key={index} value={auth}>
                {auth}
              </option>
            ))}
          </select>
        </div>
      </div>
        {/* Action Buttons */}
        <div className="flex justify-end  gap-4 mt-6 ">
           <button className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
             Cancel
           </button>
           <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800">
             Post Your Job
           </button>
         </div>
    </div>
  );
};

export default SelectionCriteriaForm;
