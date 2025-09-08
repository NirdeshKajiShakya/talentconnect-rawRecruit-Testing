import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "./ProgressStep";

const HiringPreferences = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  const [jobRoles, setJobRoles] = useState("");
  const [locations, setLocations] = useState("");
  const [lookingFor, setLookingFor] = useState("Internship");
  const [employmentType, setEmploymentType] = useState("Full time");

  const handleEditClick = () => setIsEditable(true);

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/company-onboarding/step-5");
  };

  const handleCancel = () => {
    navigate("/company-onboarding/step-3");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
      <ProgressSteps currentStep={2} />
      <h1 className="text-2xl font-bold mt-6 mb-2">Define Your Hiring Preferences!</h1>
      <p className="text-sm text-gray-600 mb-6">
        Tell us what roles you're hiring for and where!
      </p>

      <form className="space-y-6" onSubmit={handleNext}>
        {/* Job Roles */}
        <div>
          <label className="block text-sm font-medium mb-2">Job Roles You Hire For</label>
          <select
            value={jobRoles}
            onChange={(e) => setJobRoles(e.target.value)}
            disabled={!isEditable}
            className={`w-full p-2 border rounded-md ${
              isEditable ? "border-gray-300 bg-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            <option value="">Select roles</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        {/* Locations */}
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Hiring Locations</label>
          <select
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            disabled={!isEditable}
            className={`w-full p-2 border rounded-md ${
              isEditable ? "border-gray-300 bg-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            <option value="">Select locations</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        {/* Looking For */}
        <div>
          <label className="block text-sm font-medium mb-2">Looking for</label>
          <div className="flex gap-3">
            {["Job", "Internship", "Both"].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => isEditable && setLookingFor(label)}
                disabled={!isEditable}
                className={`px-4 py-2 rounded-md border text-sm transition ${
                  lookingFor === label ? "bg-black text-white" : "bg-white border-gray-300"
                } ${!isEditable && "opacity-50 cursor-not-allowed"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-sm font-medium mb-2">Employment Type</label>
          <div className="flex gap-3">
            {["Part time", "Full time", "Contract"].map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => isEditable && setEmploymentType(label)}
                disabled={!isEditable}
                className={`px-4 py-2 rounded-md border text-sm transition ${
                  employmentType === label ? "bg-black text-white" : "bg-white border-gray-300"
                } ${!isEditable && "opacity-50 cursor-not-allowed"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-6 border-t">
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
              className="px-6 py-2 rounded-md text-white bg-black hover:bg-gray-800"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HiringPreferences;
