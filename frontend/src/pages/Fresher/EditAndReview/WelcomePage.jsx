import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-2">Review & Edit Your Details</h1>
        <p className="text-gray-600 mb-6">
            We've pre-filled your details based on your resume. Please review the information below and make any necessary edits before submitting.
        </p>
{/* 
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Let's get started by creating your personalized profile. This will help us match you with the best opportunities.
          </p>
        </div> */}

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded"
            onClick={() => navigate('/edit/fresher-welcome')}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => navigate('/edit/fresher-resume-upload')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
