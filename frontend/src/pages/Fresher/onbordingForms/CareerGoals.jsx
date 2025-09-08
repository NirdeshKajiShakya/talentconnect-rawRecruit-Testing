import { useState } from 'react';
import { useForm } from './FormContext';

const CareerGoals = () => {
  const { formData, updateFormData, goToNextStep, goToPrevStep } = useForm();
  const [careerGoals, setCareerGoals] = useState({
    industry: formData.careerGoals?.industry || [],
    jobRoles: formData.careerGoals?.jobRoles || [],
    locations: formData.careerGoals?.locations || [],
    salary: formData.careerGoals?.salary || '',
    lookingFor: formData.careerGoals?.lookingFor || [],
    employmentType: formData.careerGoals?.employmentType || '',
    internships: formData.careerGoals?.internships || '',
    jobRole: formData.careerGoals?.jobRole || '',
    startDate: formData.careerGoals?.startDate || '',
    endDate: formData.careerGoals?.endDate || '',
    description: formData.careerGoals?.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCareerGoals(prev => ({ ...prev, [name]: value }));
  };

  const handleLookingForChange = (type) => {
    setCareerGoals(prev => {
      const current = [...prev.lookingFor];
      if (current.includes(type)) {
        return { ...prev, lookingFor: current.filter(item => item !== type) };
      } else {
        return { ...prev, lookingFor: [...current, type] };
      }
    });
  };

  const handleEmploymentTypeChange = (type) => {
    setCareerGoals(prev => ({ ...prev, employmentType: type }));
  };

  const handleSubmit = () => {
    updateFormData('careerGoals', careerGoals);
    goToNextStep();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto p-8">
        <h1 className="text-2xl font-bold mb-1">Awesome! Let’s define your career goals and skills!</h1>
        <p className="text-gray-600 mb-6">
          Let us know your job interests and preferred locations so we can recommend the best opportunities for you.
        </p>

        <div className="space-y-4">
          {/* All form fields as before */}
          <div>
            <label className="block text-sm font-medium mb-1">Interested Industry Type</label>
            <select
              name="industry"
              value={careerGoals.industry}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Multiple-select</option>
              <option value="tech">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Interested Job Roles</label>
            <select
              name="jobRoles"
              value={careerGoals.jobRoles}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Multiple-select</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Job Locations</label>
            <select
              name="locations"
              value={careerGoals.locations}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Multiple-select</option>
              <option value="remote">Remote</option>
              <option value="onsite">On-site</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Expected Salary</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                USD
              </span>
              <input
                type="text"
                name="salary"
                value={careerGoals.salary}
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded-r-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Looking for</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {['job', 'internship', 'both'].map(type => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1 rounded text-sm ${
                    careerGoals.lookingFor.includes(type)
                      ? 'bg-black text-white'
                      : 'border border-gray-300'
                  }`}
                  onClick={() => handleLookingForChange(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Employment type</label>
            <div className="flex flex-wrap gap-2 mt-1">
              {['part-time', 'full-time', 'contract'].map(type => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1 rounded text-sm ${
                    careerGoals.employmentType === type
                      ? 'bg-black text-white'
                      : 'border border-gray-300'
                  }`}
                  onClick={() => handleEmploymentTypeChange(type)}
                >
                  {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Internships/Trainings</label>
            <select
              name="internships"
              value={careerGoals.internships}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select Company</option>
              <option value="company1">Company 1</option>
              <option value="company2">Company 2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Job Role</label>
            <select
              name="jobRole"
              value={careerGoals.jobRole}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Placeholder</option>
              <option value="role1">Role 1</option>
              <option value="role2">Role 2</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <select
                name="startDate"
                value={careerGoals.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Placeholder</option>
                <option value="jan2023">Jan 2023</option>
                <option value="feb2023">Feb 2023</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <select
                name="endDate"
                value={careerGoals.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded p-2"
              >
                <option value="">Placeholder</option>
                <option value="dec2023">Dec 2023</option>
                <option value="jan2024">Jan 2024</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={careerGoals.description}
              onChange={handleChange}
              placeholder="Describe your role..."
              className="w-full border border-gray-300 rounded p-2 h-24"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="text-purple-600 text-sm">Add experience</button>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
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
      </div>
    </div>
  );
};

export default CareerGoals;
