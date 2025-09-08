import React from 'react';
// import { useNavigate } from 'react-router-dom'; // No longer needed directly here
export default function TermsAndConditions({ formData = {}, updateFormData, onBack, onSubmit }) {
  // const navigate = useNavigate(); // No longer needed

  const handleAcceptTerms = (e) => {
    updateFormData({ acceptedTerms: e.target.checked });
  };

  const handleSubmit = () => {
    if (formData.acceptedTerms) {
      onSubmit(); // This will trigger the handleSubmit in OnboardingFlowForm
      // navigate('/home'); // Removed: OnboardingFlowForm handles navigation after submission
    } else {
        alert('Please accept the Terms & Conditions and Privacy Policy to proceed.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-lg my-8">
          <h1 className="text-2xl font-bold mb-6">Terms & Conditions and Privacy Policy</h1>

          <div className="flex items-center justify-center mb-8">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptedTerms || false}
              onChange={handleAcceptTerms}
              className="mr-2 h-5 w-5 cursor-pointer"
            />
            <label htmlFor="acceptTerms" className="text-sm sm:text-base cursor-pointer select-none">
              I agree to the Terms & Conditions and Privacy Policy
            </label>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.acceptedTerms}
              className={`px-6 py-2 rounded-md transition-colors ${
                formData.acceptedTerms
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}