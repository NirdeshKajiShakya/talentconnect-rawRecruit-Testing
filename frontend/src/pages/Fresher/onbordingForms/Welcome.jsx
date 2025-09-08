import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-2">Create Your Profile</h1>
        <p className="text-gray-600 mb-6">
          Build your profile to explore job opportunities, internships, and campus placements.
        </p>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Let's get started by creating your personalized profile. This will help us match you with the best opportunities.
          </p>
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 border border-gray-300 rounded"
            onClick={() => navigate('/fresher/welcome')}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            onClick={() => navigate('/fresher/upload-resume')}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
