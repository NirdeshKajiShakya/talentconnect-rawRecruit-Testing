import { useForm } from './FormContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgreementPage = () => {
  const { goToPrevStep, formData, updateFormData } = useForm();
  const [agreed, setAgreed] = useState(formData.agreedToTerms || false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    updateFormData('agreedToTerms', agreed);
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-2">Almost Done! Review and Submit</h1>
        <p className="text-gray-600 mb-6">
          Please review our terms and conditions before completing your profile submission.
        </p>

        <div className="space-y-6 mb-6">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
            </span>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              className="px-4 py-2 border border-gray-300 rounded"
              onClick={goToPrevStep}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
              onClick={() => navigate('/edit/fresher-welcome')}
              disabled={!agreed}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgreementPage;
