const Step1 = ({ formData, handleInputChange, isEditable }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold mb-2">Introduce Yourself as an Employer!</h2>
      <p className="text-gray-600 mb-6">Help candidates connect with the right recruiter in your company!</p>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Enter your name *</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        disabled={!isEditable}
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Designation *</label>
      <select
        value={formData.designation}
        onChange={(e) => handleInputChange('designation', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        disabled={!isEditable}
      >
        <option value="">Placeholder</option>
        <option value="HR Manager">HR Manager</option>
        <option value="Recruiter">Recruiter</option>
        <option value="Team Lead">Team Lead</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Enter your work email *</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">✉</span>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Enter your mobile no. *</label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-gray-400">📞</span>
        <input
          type="tel"
          value={formData.mobile}
          onChange={(e) => handleInputChange('mobile', e.target.value)}
          className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">LinkedIn Profile</label>
      <div className="flex">
        <span className="bg-gray-100 px-3 py-3 border border-r-0 border-gray-300 rounded-l">http://</span>
        <input
          type="text"
          value={formData.linkedin}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
    </div>
  </div>
);

export default Step1;