import { useState } from 'react';
import { useForm } from './FormContext';
import FormLayout from './FormLayout';

const Education = () => {
  const { formData, updateFormData, goToNextStep, goToPrevStep } = useForm();
  const [education, setEducation] = useState({
    college: formData.education?.college || '',
    degree: formData.education?.degree || '',
    graduationYear: formData.education?.graduationYear || '',
    fieldOfStudy: formData.education?.fieldOfStudy || '',
    gpa: formData.education?.gpa || '',
    certificate: formData.education?.certificate || null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setEducation(prev => ({ ...prev, certificate: selectedFile }));
  };

  const handleSubmit = () => {
    updateFormData('education', education);
    goToNextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <FormLayout 
      title="Let's add your educational background!" 
      subtitle="Provide your academic background to match with relevant job and internship opportunities. Employers consider this when shortlisting candidates."
    >
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">College/University</label>
          <select 
            name="college"
            value={education.college}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Placeholder</option>
            <option value="university1">University 1</option>
            <option value="university2">University 2</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Degree</label>
            <select 
              name="degree"
              value={education.degree}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Placeholder</option>
              <option value="bachelors">Bachelor's</option>
              <option value="masters">Master's</option>
              <option value="phd">PhD</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Year of Graduation</label>
            <select 
              name="graduationYear"
              value={education.graduationYear}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Placeholder</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Field of Study / Specialization</label>
          <select 
            name="fieldOfStudy"
            value={education.fieldOfStudy}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Placeholder</option>
            <option value="cs">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Current CGPA/Percentage</label>
          <input 
            type="text" 
            name="gpa"
            value={education.gpa}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Degree Certificate (Optional)</label>
          <div className="flex items-center">
            <label className="cursor-pointer flex-1 border border-gray-300 rounded p-2 bg-white flex justify-between items-center">
              <span className="text-gray-500">
                {education.certificate ? education.certificate.name : 'Upload Degree Certificate'}
              </span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
              </svg>
              <input 
                type="file" 
                accept=".pdf,.jpg,.png,.jpeg" 
                className="hidden" 
                onChange={handleFileChange}
              />
            </label>
          </div>
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

export default Education;