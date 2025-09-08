
import { useNavigate } from "react-router-dom";
const ReviewDetails = ({ onNext, onPrev }) => {
    const navigate = useNavigate() ;
    return (
      <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
      <div className="p-6 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-xl font-bold mb-2">Review & Edit Your Details</h1>
        <p className="text-sm text-gray-600 mb-4">We've pre-filled your details based on your resume. Please review the information below and make any necessary edits before submitting.</p>
        
        <div className="flex justify-evenly gap-8 mt-4">
          <button onClick={() => navigate("/company-onboarding/step-1")} className="bg-white border border-gray-300 py-1 px-4 rounded">
            Cancel
          </button>
          <button 
         onClick={() => navigate("/company-onboarding/step-2")}
            className="bg-black text-white py-1 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
      </div>
    );
  };
export default ReviewDetails ;  