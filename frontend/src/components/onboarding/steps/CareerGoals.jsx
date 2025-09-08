import EditButton from '../EditButton'

function CareerGoals({ formData, isEditable, handleInputChange, toggleEdit }) {
  // Helper function to handle selection buttons
  const handleSelectionChange = (field, value) => {
    handleInputChange({
      target: {
        name: field,
        value: value
      }
    })
  }
  
  return (
    <div className="form-container">
      <h2 className="mb-2 text-2xl font-bold">Awesome! Let's define your career goals!</h2>
      <p className="mb-6 text-gray-600">
        Let us know your job interests and preferred locations so we can recommend the best opportunities for you.
      </p>

      <div className="space-y-4">
        <div className="form-section">
          <label htmlFor="profileType" className="form-label">Select Your Profile Type</label>
          {isEditable ? (
            <select
              id="profileType"
              name="profileType"
              value={formData.profileType}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option value="student">Student</option>
              <option value="fresher">Fresher</option>
              <option value="experienced">Experienced</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.profileType || 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="industry" className="form-label">Interested Industry Type</label>
          {isEditable ? (
            <select
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="form-input"
              multiple
            >
              <option value="technology">Technology</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.industry && formData.industry.length > 0 
                ? formData.industry.join(', ') 
                : 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="jobRoles" className="form-label">Interested Job Roles</label>
          {isEditable ? (
            <select
              id="jobRoles"
              name="jobRoles"
              value={formData.jobRoles}
              onChange={handleInputChange}
              className="form-input"
              multiple
            >
              <option value="softwareDeveloper">Software Developer</option>
              <option value="webDeveloper">Web Developer</option>
              <option value="dataAnalyst">Data Analyst</option>
              <option value="projectManager">Project Manager</option>
              <option value="designer">Designer</option>
              <option value="marketingSpecialist">Marketing Specialist</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.jobRoles && formData.jobRoles.length > 0 
                ? formData.jobRoles.join(', ') 
                : 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label htmlFor="preferredLocations" className="form-label">Preferred Job Locations</label>
          {isEditable ? (
            <select
              id="preferredLocations"
              name="preferredLocations"
              value={formData.preferredLocations}
              onChange={handleInputChange}
              className="form-input"
              multiple
            >
              <option value="newYork">New York</option>
              <option value="sanFrancisco">San Francisco</option>
              <option value="london">London</option>
              <option value="toronto">Toronto</option>
              <option value="remote">Remote</option>
            </select>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.preferredLocations && formData.preferredLocations.length > 0 
                ? formData.preferredLocations.join(', ') 
                : 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label className="form-label">Looking for</label>
          {isEditable ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectionChange('lookingFor', 'job')}
                className={`px-4 py-2 border rounded transition-colors ${
                  formData.lookingFor === 'job' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                Job
              </button>
              <button
                type="button"
                onClick={() => handleSelectionChange('lookingFor', 'internship')}
                className={`px-4 py-2 border rounded transition-colors ${
                  formData.lookingFor === 'internship' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                Internship
              </button>
              <button
                type="button"
                onClick={() => handleSelectionChange('lookingFor', 'both')}
                className={`px-4 py-2 border rounded transition-colors ${
                  formData.lookingFor === 'both' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                Both
              </button>
            </div>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.lookingFor ? formData.lookingFor.charAt(0).toUpperCase() + formData.lookingFor.slice(1) : 'Not selected'}
            </div>
          )}
        </div>

        <div className="form-section">
          <label className="form-label">Employment type</label>
          {isEditable ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelectionChange('employmentType', 'part-time')}
                className={`px-4 py-2 border rounded transition-colors ${
                  formData.employmentType === 'part-time' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                Part-time
              </button>
              <button
                type="button"
                onClick={() => handleSelectionChange('employmentType', 'full-time')}
                className={`px-4 py-2 border rounded transition-colors ${
                  formData.employmentType === 'full-time' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                Full-time
              </button>
              <button
                type="button"
                onClick={() => handleSelectionChange('employmentType', 'contract')}
                className={`px-4 py-2 border rounded transition-colors ${
                  formData.employmentType === 'contract' 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-gray-300 hover:bg-gray-100'
                }`}
              >
                Contract
              </button>
            </div>
          ) : (
            <div className="p-2 border border-gray-200 rounded">
              {formData.employmentType ? formData.employmentType.charAt(0).toUpperCase() + formData.employmentType.slice(1) : 'Not selected'}
            </div>
          )}
        </div>
      </div>

      {!isEditable && <EditButton onClick={toggleEdit} />}
    </div>
  )
}

export default CareerGoals