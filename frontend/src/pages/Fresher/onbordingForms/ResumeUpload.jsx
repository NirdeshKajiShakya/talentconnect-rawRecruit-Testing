import { useState } from 'react';
import { useForm } from './FormContext';
import FormLayout from './FormLayout';

const ResumeUpload = () => {
  const { updateFormData, goToNextStep, goToPrevStep } = useForm();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    updateFormData('resume', file);
    goToNextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <FormLayout 
        title="Upload Your Resume to Auto-Fill Your Details" 
        subtitle="Save time by uploading your resume. We'll extract key details to pre-fill your onboarding form. You can review and edit before submitting."
      >
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Upload Resume</label>
          <div className="flex items-center">
            <label className="cursor-pointer flex-1 border border-gray-300 rounded p-2 bg-white flex justify-between items-center">
              <span className="text-gray-500">{file ? file.name : 'Upload PDF'}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <input 
                type="file" 
                accept=".pdf" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button 
            className="px-4 py-2 border border-gray-300 rounded"
            onClick={goToPrevStep}
          >
            Back
          </button>
          <button 
            className="px-4 py-2 bg-black text-white rounded"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </FormLayout>
    </div>
  );
};

export default ResumeUpload;
