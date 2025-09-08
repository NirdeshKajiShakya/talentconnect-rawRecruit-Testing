const Step3 = ({ formData, handleInputChange, isEditable }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold mb-2">Define Your Hiring Preferences!</h2>
      <p className="text-gray-600 mb-6">Tell us what roles you're hiring for and where!</p>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Job Roles You Hire For</label>
      <select
        value={formData.jobRoles}
        onChange={(e) => handleInputChange('jobRoles', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        disabled={!isEditable}
      >
        <option value="">Multiple-select</option>
        <option value="Developer">Developer</option>
        <option value="Designer">Designer</option>
        <option value="Manager">Manager</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Preferred Hiring Locations</label>
      <select
        value={formData.locations}
        onChange={(e) => handleInputChange('locations', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        disabled={!isEditable}
      >
        <option value="">Multiple-select</option>
        <option value="Remote">Remote</option>
        <option value="On-site">On-site</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Looking for</label>
      <div className="flex gap-2">
        {['Job', 'Internship', 'Both'].map((option) => (
          <button
            key={option}
            onClick={() => handleInputChange('lookingFor', option)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              formData.lookingFor === option
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={!isEditable}
          >
            {option}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Employment type</label>
      <div className="flex gap-2">
        {['Part-time', 'Full-time', 'Contract'].map((type) => (
          <button
            key={type}
            onClick={() => handleInputChange('employmentType', type)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              formData.employmentType === type
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            disabled={!isEditable}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Step3;