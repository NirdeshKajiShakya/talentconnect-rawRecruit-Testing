import { useRef } from 'react';
import { useAppContext } from './AppContext';
import StepLayout from './StepLayout';

const EducationBackground = () => {
  const { formData, updateFormData, editMode } = useAppContext();
  const fileInputRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData({ degreeCertificate: e.target.files[0] });
    }
  };
  
  const handleUploadClick = () => {
    if (editMode.education) {
      fileInputRef.current.click();
    }
  };

//   const validateNext = () => {
//     // Basic validation - ensure required fields are filled
//     if (!formData.college || !formData.degree || !formData.graduationYear || !formData.fieldOfStudy) {
//       alert('Please fill in all required fields');
//       return false;
//     }
//     return true;
//   };

  return (
    <StepLayout
      step={3}
      title="Let's add your educational background!"
      subtitle="Provide your academic background to match with relevant job and internship opportunities. Employers consider this when shortlisting candidates."
      prevRoute="/edit/fresher-basic-details"
      nextRoute="/edit/fresher-career-goals"
      contextKey="education"
      //onNext={validateNext}
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">College/University</label>
          <select
            name="college"
            value={formData.college}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.education}
          >
            <option value="">Placeholder</option>
            <option value="university1">University 1</option>
            <option value="university2">University 2</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Degree</label>
            <select
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!editMode.education}
            >
              <option value="">Placeholder</option>
              <option value="bachelors">Bachelor's</option>
              <option value="masters">Master's</option>
              <option value="phd">Ph.D</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-1 font-medium">Year of Graduation</label>
            <select
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!editMode.education}
            >
              <option value="">Placeholder</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Field of Study / Specialization</label>
          <select
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.education}
          >
            <option value="">Placeholder</option>
            <option value="computerScience">Computer Science</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Current CGPA/Percentage</label>
          <input
            type="text"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.education}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Degree Certificate (Optional)</label>
          <div 
            className="border border-gray-300 rounded flex justify-between items-center p-2 cursor-pointer"
            onClick={handleUploadClick}
          >
            <span className="text-gray-500">
              {formData.degreeCertificate ? formData.degreeCertificate.name : 'Upload Degree Certificate'}
            </span>
            <span className="text-xl">↑</span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={!editMode.education}
          />
        </div>
      </div>
    </StepLayout>
  );
};

export default EducationBackground;