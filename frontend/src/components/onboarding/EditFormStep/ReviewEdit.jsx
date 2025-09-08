import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-[1144px] flex flex-col items-center text-center">
        <h1 className="text-2xl font-bold leading-[1.4]">
          Review & Edit your Details
        </h1>
        <p className="text-base font-normal mt-2">
          We've pre-filled your details based on your resume. Please review the information below and make any necessary edits before submitting.
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate('/welcome')}
            className="text-black border rounded-md px-6 py-3 max-md:px-5"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate('/step/1')}
            className="bg-black text-white border rounded-md px-6 py-3 max-md:px-5"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
