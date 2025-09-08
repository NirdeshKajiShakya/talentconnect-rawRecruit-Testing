import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressSteps from "./ProgressStep";

const CompanyVerification = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [tan, setTan] = useState("");
  const [gst, setGst] = useState("");
  const [cin, setCin] = useState("");
  const [confirmChecked, setConfirmChecked] = useState(false);

  const handleSubmit = () => {
    if (!confirmChecked) {
      alert("Please confirm your details before submitting.");
      return;
    }
    
    alert("Submit successful");
    // navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-xl">
      <ProgressSteps currentStep={3} />
      <h1 className="text-2xl font-bold mt-6 mb-2">Company Verification & KYC</h1>
      <p className="text-sm text-gray-600 mb-6">
        Complete KYC verification to unlock full hiring access and ensure compliance.
      </p>

      <form className="space-y-6">
        {/* Document Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Verification Documents (Choose any one for verification)
          </label>
          <div className="flex gap-3 items-center">
            <select
              className={`flex-1 p-2 border rounded ${
                isEditable ? "border-gray-300 bg-white" : "bg-gray-100 text-gray-500"
              }`}
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              disabled={!isEditable}
            >
              <option value="">Select document type</option>
              <option value="gst">GST Certificate</option>
              <option value="cin">Company Incorporation Certificate</option>
              <option value="pan">PAN Card</option>
            </select>

            <input
              type="file"
              disabled={!isEditable}
              onChange={(e) => setFile(e.target.files[0])}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
          {file && <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>}
        </div>

        {/* TAN */}
        <div>
          <label className="block text-sm font-medium mb-2">TAN (Tax Deduction and Collection Account Number)</label>
          <input
            type="text"
            value={tan}
            onChange={(e) => setTan(e.target.value)}
            disabled={!isEditable}
            className={`w-full p-2 border rounded ${
              isEditable ? "border-gray-300 bg-white" : "bg-gray-100 text-gray-500"
            }`}
            placeholder="10-digit alphanumeric"
          />
        </div>

        {/* GST */}
        <div>
          <label className="block text-sm font-medium mb-2">GST Number</label>
          <input
            type="text"
            value={gst}
            onChange={(e) => setGst(e.target.value)}
            disabled={!isEditable}
            className={`w-full p-2 border rounded ${
              isEditable ? "border-gray-300 bg-white" : "bg-gray-100 text-gray-500"
            }`}
            placeholder="15-digit alphanumeric"
          />
        </div>

        {/* CIN */}
        <div>
          <label className="block text-sm font-medium mb-2">Company Registration Number (CIN/LLPIN)</label>
          <input
            type="text"
            value={cin}
            onChange={(e) => setCin(e.target.value)}
            disabled={!isEditable}
            className={`w-full p-2 border rounded ${
              isEditable ? "border-gray-300 bg-white" : "bg-gray-100 text-gray-500"
            }`}
            placeholder="21-digit alphanumeric"
          />
        </div>

        {/* Edit button */}
        <div className="flex justify-end">
          {!isEditable && (
            <button
              type="button"
              onClick={() => setIsEditable(true)}
              className="bg-black text-white py-1 px-4 rounded hover:bg-gray-800"
            >
              Edit
            </button>
          )}
        </div>

        {/* Confirm + Submit section */}
        <div className="pt-4 border-t flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmChecked}
              onChange={(e) => setConfirmChecked(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="confirm" className="text-sm text-gray-700">
              I have reviewed my details and confirm they are correct.
            </label>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/company-onboarding/step-4")}
              className="bg-white border border-gray-300 py-1 px-4 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className={`py-1 px-4 rounded text-white ${
                confirmChecked ? "bg-black hover:bg-gray-800" : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!confirmChecked}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyVerification;
