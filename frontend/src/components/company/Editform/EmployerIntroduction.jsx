import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "./ProgressStep";

const EmployerIntroduction = ({ onPrev }) => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => setIsEditable(!isEditable);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="w-full max-w-2xl p-6 bg-white shadow-md rounded-lg">
      <ProgressSteps currentStep={1} />
      <h1 className="text-2xl font-bold mb-2">Introduce Yourself as an Employer!</h1>
      <p className="text-sm text-gray-600 mb-4">
        Help candidates connect with the right recruiter in your company!
      </p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Enter your name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            disabled={!isEditable}
            className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Designation <span className="text-red-500">*</span>
          </label>
          <select
            disabled={!isEditable}
            className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50"
          >
            <option>Placeholder</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Enter your work email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              disabled={!isEditable}
              className="w-full p-2 pl-8 border border-gray-300 rounded bg-white disabled:opacity-50"
              placeholder="mail@xyz.com"
            />
            <span className="absolute left-2 top-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Enter your mobile no. <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              disabled={!isEditable}
              className="w-full p-2 pl-8 border border-gray-300 rounded bg-white disabled:opacity-50"
              placeholder="1234567890"
            />
            <span className="absolute left-2 top-2.5 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
          <input
            type="url"
            disabled={!isEditable}
            className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50"
            placeholder="http://www.linkedin.in"
          />
        </div>
        <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/company-onboarding/step-1")}
              className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleEdit}
                className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800"
              >
                {isEditable ? "Lock" : "Edit"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/company-onboarding/step-3")}
                className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployerIntroduction;
