import { useRef } from 'react';
import { useAppContext } from './AppContext';
import StepLayout from './StepLayout';

const ResumeUpload = () => {
  const fileInputRef = useRef(null);
  const { formData, updateFormData, editMode } = useAppContext();
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData({ resume: e.target.files[0] });
    }
  };
  
  const handleUploadClick = () => {
    if (editMode.resumeUpload) {
      fileInputRef.current.click();
    }
  };

  const validateNext = () => {
    // Optional: Add validation logic here
    return true;
  };

  return (
    <StepLayout
      step={1}
      title="Upload Your Resume to Auto-Fill Your Details"
      subtitle="Save time by uploading your resume. We'll extract key details to pre-fill your onboarding form. You can review and edit before submitting."
      nextRoute="/edit/fresher-basic-details"
      prevRoute="/edit/fresher-welcome"
      contextKey="resumeUpload"
      onNext={validateNext}
    >
      <div className="mt-6">
        <label className="block mb-2 font-medium">Upload Resume</label>
        <div 
          className="border border-gray-300 rounded flex justify-between items-center p-2 cursor-pointer"
          onClick={handleUploadClick}
        >
          <span className="text-gray-500">
            {formData.resume ? formData.resume.name : 'Upload PDF'}
          </span>
          <span className="text-xl">↑</span>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={!editMode.resumeUpload}
        />
      </div>
    </StepLayout>
  );
};

export default ResumeUpload;