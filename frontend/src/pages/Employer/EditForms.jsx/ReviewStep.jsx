import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions({ formData, updateFormData, setCurrentStep }) {
  const [acceptedTerms, setAcceptedTerms] = useState(formData.acceptedTerms || false);
  const navigate = useNavigate();

  const handleAcceptTerms = (e) => {
    const isChecked = e.target.checked;
    setAcceptedTerms(isChecked);
    updateFormData('acceptedTerms', isChecked);
  };

  const handleSubmit = () => {
    if (acceptedTerms) {
      navigate("/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Terms & Conditions and Privacy Policy</h1>
        
        <div className="flex items-center justify-center mb-8">
          <input
            type="checkbox"
            id="acceptTerms"
            checked={acceptedTerms}
            onChange={handleAcceptTerms}
            className="mr-2 h-5 w-5"
          />
          <label htmlFor="acceptTerms" className="select-none">
            I agree to the Terms & Conditions and Privacy Policy
          </label>
        </div>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentStep(3)}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!acceptedTerms}
            className={`px-6 py-2 rounded-md ${
              acceptedTerms 
                ? 'bg-black text-white hover:bg-gray-800 cursor-pointer' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}