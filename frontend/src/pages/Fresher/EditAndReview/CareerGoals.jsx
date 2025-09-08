import { useAppContext } from './AppContext';
import StepLayout from './StepLayout';

const CareerGoals = () => {
  const { formData, updateFormData, editMode } = useAppContext();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  const handleMultiSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedValues = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    updateFormData({ [name]: selectedValues });
  };
  
  const handleLookingForChange = (value) => {
    const currentLookingFor = [...formData.lookingFor];
    if (currentLookingFor.includes(value)) {
      updateFormData({ 
        lookingFor: currentLookingFor.filter(item => item !== value) 
      });
    } else {
      updateFormData({ 
        lookingFor: [...currentLookingFor, value] 
      });
    }
  };
  
  const handleEmploymentTypeChange = (value) => {
    const currentEmploymentType = [...formData.employmentType];
    if (currentEmploymentType.includes(value)) {
      updateFormData({ 
        employmentType: currentEmploymentType.filter(item => item !== value) 
      });
    } else {
      updateFormData({ 
        employmentType: [...currentEmploymentType, value] 
      });
    }
  };

//   const validateNext = () => {
//     // Basic validation - ensure required fields are filled
//     if (!formData.interestedIndustry.length || !formData.interestedJobRoles.length) {
//       alert('Please fill in all required fields');
//       return false;
//     }
//     return true;
//   };

  return (
    <StepLayout
      step={4}
      title="Awesome! Let's define your career goals and skills!"
      subtitle="Let us know your job interests and preferred locations so we can recommend the best opportunities for you."
      prevRoute="/edit/fresher-education"
      nextRoute="/edit/fresher-final-details"
      contextKey="careerGoals"
     //onNext={validateNext}
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Interested Industry Type</label>
          <select
            name="interestedIndustry"
            value={formData.interestedIndustry}
            onChange={handleMultiSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
            multiple
            disabled={!editMode.careerGoals}
          >
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
          </select>
          <div className="text-xs text-gray-500 mt-1">Multiple-select</div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Interested Job Roles</label>
          <select
            name="interestedJobRoles"
            value={formData.interestedJobRoles}
            onChange={handleMultiSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
            multiple
            disabled={!editMode.careerGoals}
          >
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="analyst">Analyst</option>
            <option value="manager">Manager</option>
          </select>
          <div className="text-xs text-gray-500 mt-1">Multiple-select</div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Preferred Job Locations</label>
          <select
            name="preferredLocations"
            value={formData.preferredLocations}
            onChange={handleMultiSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
            multiple
            disabled={!editMode.careerGoals}
          >
            <option value="newyork">New York</option>
            <option value="sanfrancisco">San Francisco</option>
            <option value="london">London</option>
            <option value="remote">Remote</option>
          </select>
          <div className="text-xs text-gray-500 mt-1">Multiple-select</div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Expected Salary</label>
          <div className="flex">
            <div className="border border-gray-300 rounded-l px-2 py-2 bg-gray-100">
              USD
            </div>
            <input
              type="text"
              name="expectedSalary"
              value={formData.expectedSalary}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-r"
              placeholder="Placeholder"
              disabled={!editMode.careerGoals}
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Looking for</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-2 border ${
                formData.lookingFor.includes('job') 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black'
              }`}
              onClick={() => editMode.careerGoals && handleLookingForChange('job')}
              disabled={!editMode.careerGoals}
            >
              Job
            </button>
            <button
              type="button"
              className={`px-4 py-2 border ${
                formData.lookingFor.includes('internship') 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black'
              }`}
              onClick={() => editMode.careerGoals && handleLookingForChange('internship')}
              disabled={!editMode.careerGoals}
            >
              Internship
            </button>
            <button
              type="button"
              className={`px-4 py-2 border ${
                formData.lookingFor.includes('both') 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black'
              }`}
              onClick={() => editMode.careerGoals && handleLookingForChange('both')}
              disabled={!editMode.careerGoals}
            >
              Both
            </button>
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Employment type</label>
          <div className="flex space-x-2">
            <button
              type="button"
              className={`px-4 py-2 border ${
                formData.employmentType.includes('partTime') 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black'
              }`}
              onClick={() => editMode.careerGoals && handleEmploymentTypeChange('partTime')}
              disabled={!editMode.careerGoals}
            >
              Part-time
            </button>
            <button
              type="button"
              className={`px-4 py-2 border ${
                formData.employmentType.includes('fullTime') 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black'
              }`}
              onClick={() => editMode.careerGoals && handleEmploymentTypeChange('fullTime')}
              disabled={!editMode.careerGoals}
            >
              Full-time
            </button>
            <button
              type="button"
              className={`px-4 py-2 border ${
                formData.employmentType.includes('contract') 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black'
              }`}
              onClick={() => editMode.careerGoals && handleEmploymentTypeChange('contract')}
              disabled={!editMode.careerGoals}
            >
              Contract
            </button>
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Internship/Trainings</label>
          <select
            name="internshipTrainings"
            value={formData.internshipTrainings}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.careerGoals}
          >
            <option value="">Select Company</option>
            <option value="company1">Company 1</option>
            <option value="company2">Company 2</option>
          </select>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Job Role</label>
          <select
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.careerGoals}
          >
            <option value="">Placeholder</option>
            <option value="frontendDeveloper">Frontend Developer</option>
            <option value="backendDeveloper">Backend Developer</option>
            <option value="designerUX">UX Designer</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <select
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!editMode.careerGoals}
            >
              <option value="">Placeholder</option>
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() + i);
                return (
                  <option key={i} value={date.toISOString().split('T')[0]}>
                    {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </option>
                );
              })}
            </select>
          </div>
          
          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <select
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              disabled={!editMode.careerGoals}
            >
              <option value="">Placeholder</option>
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date();
                date.setMonth(date.getMonth() + i + 3); // End dates start 3 months after start dates
                return (
                  <option key={i} value={date.toISOString().split('T')[0]}>
                    {date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="roleDescription"
            value={formData.roleDescription}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Describe your role..."
            rows={4}
            disabled={!editMode.careerGoals}
          ></textarea>
        </div>
        
        <div className="mt-2 text-right">
          <button
            type="button"
            className="text-blue-500 hover:underline"
            disabled={!editMode.careerGoals}
          >
            Add experience
          </button>
        </div>
      </div>
    </StepLayout>
  );
};

export default CareerGoals;