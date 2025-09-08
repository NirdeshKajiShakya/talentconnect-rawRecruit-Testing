
import React, { useState } from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { ChevronDownIcon, X } from "lucide-react";
import { useRole } from "@/context/RoleContext/RoleContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const FresherStepFour = ({ onNext, onBack }) => {
  const { formData, updateFormData } = useRole();

  const [dropdownOpen, setDropdownOpen] = useState({
    industry: false,
    jobRoles: false,
    locations: false,
  });

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSelect = (field, value) => {
    const currentValues = formData[field] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    updateFormData({ [field]: newValues });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleRadioChange = (field, value) => {
    updateFormData({ [field]: value });
  };

  const handleAddExperience = () => {
    const currentExperiences = formData.experiences || [];
    const newExperiences = [...currentExperiences, { 
      company: "", 
      role: "", 
      startDate: null, 
      endDate: null, 
      description: "" 
    }];
    updateFormData({ experiences: newExperiences });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const newExperiences = [...(formData.experiences || [])];
    newExperiences[index] = { ...newExperiences[index], [name]: value };
    updateFormData({ experiences: newExperiences });
  };

  const handleDateChange = (index, field, date) => {
    const newExperiences = [...(formData.experiences || [])];
    newExperiences[index] = { ...newExperiences[index], [field]: date };
    updateFormData({ experiences: newExperiences });
  };
  
  const handleRemoveExperience = (index) => {
    const newExperiences = [...(formData.experiences || [])];
    newExperiences.splice(index, 1);
    updateFormData({ experiences: newExperiences });
  };

  const renderCustomDropdown = (field, options, label) => (
    <div className="w-full mt-6 max-md:max-w-full">
      <label className="block text-black max-md:max-w-full">{label}</label>
      <div className="relative mt-2">
        <div
          className="flex justify-between items-center min-h-12 w-full p-3 border border-gray-300 rounded cursor-pointer text-[#666]"
          onClick={() => toggleDropdown(field)}
        >
          <span>
            {formData[field] && formData[field].length > 0
              ? formData[field].join(", ")
              : `Select ${label.toLowerCase()}`}
          </span>
          <ChevronDownIcon className="w-6 h-6" />
        </div>
        {dropdownOpen[field] && (
          <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(field, option)}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${
                  (formData[field] || []).includes(option) ? "bg-gray-200" : ""
                }`}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const handleClick = () => {
    onNext();
  }

  return (
    <div className="justify-center items-stretch bg-white z-0 flex min-w-60 flex-col w-[560px] my-auto p-12 max-md:max-w-full max-md:px-5">
      <ProgressIndicator currentStep={4} totalSteps={5} />

      <div className="flex w-full flex-col items-stretch justify-center mt-8 max-md:max-w-full">
        <div className="w-full text-black max-md:max-w-full">
          <h2 className="text-[32px] font-bold leading-[42px] max-md:max-w-full">
            Awesome! Let's define your career goals and skills!
          </h2>
          <p className="text-base font-normal leading-6 mt-2 max-md:max-w-full">
            Let us know your job interests and preferred locations so we can
            recommend the best opportunities for you.
          </p>
        </div>

        <form className="w-full text-base font-normal mt-8 max-md:max-w-full">
          {renderCustomDropdown("industry", [
            "technology",
            "finance",
            "healthcare",
            "education",
            "manufacturing",
          ], "Interested Industry Type")}

          {renderCustomDropdown("jobRoles", [
            "developer",
            "designer",
            "manager",
            "analyst",
            "marketing",
          ], "Interested Job Roles")}

          {renderCustomDropdown("locations", [
            "bangalore",
            "mumbai",
            "delhi",
            "hyderabad",
            "pune",
            "remote",
          ], "Preferred Job Locations")}

          <div className="w-full mt-6 max-md:max-w-full">
            <label htmlFor="expectedSalary" className="block text-black">
              Expected Salary
            </label>
            <div className="flex items-center gap-2 mt-2">
              <div className="relative w-24">
                <select
                  id="expectedSalaryCurrency"
                  name="expectedSalaryCurrency"
                  value={formData.expectedSalaryCurrency || "INR"}
                  onChange={handleChange}
                  className="items-center appearance-none flex min-h-12 w-full gap-2 text-[#666] whitespace-nowrap p-3 border border-gray-300 rounded"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
              <div className="flex-1">
                <input
                  id="expectedSalaryAmount"
                  name="expectedSalaryAmount"
                  type="text"
                  value={formData.expectedSalaryAmount || ""}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  className="w-full min-h-12 p-3 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-6 max-md:max-w-full">
            <label className="block text-black">Looking for</label>
            <div className="flex w-full gap-4 text-black whitespace-nowrap flex-wrap mt-2">
              {["Job", "Internship", "Both"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`self-stretch gap-2 px-4 py-2 border rounded-md ${formData.lookingFor === option ? "bg-black text-white" : ""}`}
                  onClick={() => handleRadioChange("lookingFor", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mt-6 max-md:max-w-full">
            <label className="block text-black">Employment type</label>
            <div className="flex w-full gap-4 text-black whitespace-nowrap flex-wrap mt-2">
              {["part time", "full time", "contract"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`self-stretch gap-2 px-4 py-2 border rounded-md capitalize ${formData.employmentType === option ? "bg-black text-white" : ""}`}
                  onClick={() => handleRadioChange("employmentType", option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full mt-6 max-md:max-w-full">
            <label className="block text-black">Internships/Trainings</label>
            {(formData.experiences || []).map((exp, index) => (
              <div key={index} className="p-4 border rounded-md mt-4 relative">
                <button 
                  type="button" 
                  onClick={() => handleRemoveExperience(index)} 
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
                <div className="relative mt-2">
                  <select
                    name="company"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="items-center appearance-none flex min-h-12 w-full gap-2 text-[#666] whitespace-nowrap p-3 border border-gray-300 rounded"
                  >
                    <option value="" disabled>Select Company</option>
                    <option value="company1">Company 1</option>
                    <option value="company2">Company 2</option>
                    <option value="company3">Company 3</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
                </div>
                <div className="relative mt-4">
                  <select
                    name="role"
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="items-center appearance-none flex min-h-12 w-full gap-2 text-[#666] whitespace-nowrap p-3 border border-gray-300 rounded"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="developer">Software Developer</option>
                    <option value="designer">UI/UX Designer</option>
                    <option value="manager">Project Manager</option>
                    <option value="analyst">Data Analyst</option>
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
                </div>
                <div className="flex w-full gap-6 mt-4">
                  <div className="flex-1">
                    <label className="block text-black">Start Date</label>
                    <DatePicker
                      selected={exp.startDate}
                      onChange={(date) => handleDateChange(index, "startDate", date)}
                      selectsStart
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      placeholderText="Select start date"
                      className="w-full min-h-12 p-3 border border-gray-300 rounded mt-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-black">End Date</label>
                    <DatePicker
                      selected={exp.endDate}
                      onChange={(date) => handleDateChange(index, "endDate", date)}
                      selectsEnd
                      startDate={exp.startDate}
                      endDate={exp.endDate}
                      minDate={exp.startDate}
                      placeholderText="Select end date"
                      className="w-full min-h-12 p-3 border border-gray-300 rounded mt-2"
                    />
                  </div>
                </div>
                <div className="w-full mt-4">
                  <textarea
                    name="description"
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className="flex min-h-24 w-full gap-2 text-[#666] p-3 border border-gray-300 rounded"
                    placeholder="Describe your role..."
                  ></textarea>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleAddExperience}
                className="text-blue-600 cursor-pointer"
              >
                Add experience +
              </button>
            </div>
          </div>

          <div className="flex min-h-12 w-full gap-2.5 whitespace-nowrap mt-6 max-md:max-w-full">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="self-stretch gap-2 text-black px-6 py-3 border rounded-md max-md:px-5 cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleClick}
                className="self-stretch bg-black gap-2 text-white px-6 py-3 border rounded-md max-md:px-5 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};