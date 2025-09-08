import React, { useState } from "react";
import { ProgressIndicator } from "../ProgressIndicator";
import { UploadIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const EditStepOne = ({ onNext, onCancel }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleEditClick = () => setIsEditable(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/step/2');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded w-full max-w-xl p-8"
      >
        <ProgressIndicator currentStep={1} totalSteps={5} />

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">
            Upload Your Resume to Auto-Fill Your Details
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Save time by uploading your resume. We'll extract key details to pre-fill your onboarding form. You can review and edit before submitting.
          </p>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Resume
            </label>
            <label
              className={`flex items-center gap-2 p-3 border rounded ${
                isEditable
                  ? "cursor-pointer hover:bg-gray-50"
                  : "bg-gray-100 cursor-not-allowed"
              }`}
            >
              <span className="flex-1 text-gray-600">
                {file ? file.name : "Upload PDF"}
              </span>
              <UploadIcon className="w-6 h-6 text-gray-400" />
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
                disabled={!isEditable}
              />
            </label>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate('/welcome')}
              className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleEditClick}
                className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
              >
                Edit
              </button>
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
