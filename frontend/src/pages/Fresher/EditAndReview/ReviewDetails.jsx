import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from './AppContext';

const ReviewDetails = () => {
  const { formData, resetEditModes } = useAppContext();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (!isChecked) {
      alert('Please confirm your details are correct');
      return;
    }
    
    // Reset all edit modes
    resetEditModes();
    
    // Normally you would submit the form data to your backend here
    // For now, we'll just log it to the console
    console.log('Form submitted', formData);
    
    // In a real application, you might redirect to a success page
    alert('Application submitted successfully!');
    navigate('/');
  };
  
  const handleCancel = () => {
    navigate('/edit/fresher-final-details');
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white shadow-lg">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">Review & Edit Your Details</h1>
        <p className="text-gray-600 mt-2">
          We've pre-filled your details based on your resume. Please review the information below and make any necessary edits before submitting.
        </p>
      </div>
      
      <div className="p-6">
        {/* Here you could display a summary of all the form data */}
        {/* For brevity, we'll just show a few key fields */}
        <div className="space-y-6">
          <div>
            <h2 className="font-medium text-gray-700">Personal Information</h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p>{formData.name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p>{formData.email || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p>{formData.mobile || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Profile Type</p>
                <p>{formData.profileType || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-medium text-gray-700">Education</h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p>{formData.college || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Degree</p>
                <p>{formData.degree || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Field of Study</p>
                <p>{formData.fieldOfStudy || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Graduation Year</p>
                <p>{formData.graduationYear || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-medium text-gray-700">Career Preferences</h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Industries</p>
                <p>{formData.interestedIndustry.join(', ') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Job Roles</p>
                <p>{formData.interestedJobRoles.join(', ') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Locations</p>
                <p>{formData.preferredLocations.join(', ') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Employment Type</p>
                <p>{formData.employmentType.join(', ') || 'Not provided'}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="font-medium text-gray-700">Skills & Profiles</h2>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Skills</p>
                <p>{formData.skills.join(', ') || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <p>{formData.linkedinProfile ? `http://${formData.linkedinProfile}` : 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">GitHub</p>
                <p>{formData.githubProfile ? `http://${formData.githubProfile}` : 'Not provided'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Portfolio</p>
                <p>{formData.portfolio ? `http://${formData.portfolio}` : 'Not provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t p-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="mr-2"
          />
          <span>I have reviewed my details and confirm they are correct.</span>
        </label>
        
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded ${
              isChecked ? 'bg-black text-white' : 'bg-gray-300 text-gray-500'
            }`}
            disabled={!isChecked}
          >
            Submit & Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;