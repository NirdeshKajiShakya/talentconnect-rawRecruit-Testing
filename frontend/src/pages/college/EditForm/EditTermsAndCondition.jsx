// pages/TermsAndConditions.jsx
import { useNavigate } from "react-router-dom";
export default function EditTermsAndCondition({ formData, updateFormData, nextStep, prevStep }) {
    const handleAcceptTerms = (e) => {
      updateFormData('acceptedTerms', e.target.checked);
    };
    const naviagte = useNavigate() ;
  
    return (
      <div className="flex items-center justify-center min-h-screen ">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6">Terms & Conditions and Privacy Policy</h1>
          {/* <p className="mb-8">11 pages to the Terms & Conditions and Privacy Policy.</p> */}
          
          <div className="flex items-center justify-center mb-8">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptedTerms}
              onChange={handleAcceptTerms}
              className="mr-2 h-5 w-5"
            />
            <label htmlFor="acceptTerms">I agree to the Terms & Conditions and Privacy Policy</label>
          </div>
          
          <div className="flex justify-center gap-4">
            {/* Cancel Button */}
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-md"
            >
              Cancel
            </button>
            {/* Get Started Button */}
            <button
              onClick={ () => naviagte("/home")}
              disabled={!formData.acceptedTerms}
              className={`px-6 py-2 rounded-md ${formData.acceptedTerms ? 'bg-black text-white ' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
}
