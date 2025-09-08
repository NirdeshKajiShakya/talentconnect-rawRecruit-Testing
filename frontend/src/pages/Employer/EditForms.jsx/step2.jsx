const Step2 = ({ formData, handleInputChange, isEditable }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold mb-2">Connect to Your Company!</h2>
      <p className="text-gray-600 mb-6">Select the company you represent or register a new one.</p>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Company Name *</label>
      <select
        value={formData.companyName}
        onChange={(e) => handleInputChange('companyName', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        disabled={!isEditable}
      >
        <option value="">Placeholder</option>
        <option value="Tech Corp">Tech Corp</option>
        <option value="Innovation Ltd">Innovation Ltd</option>
        <option value="Digital Solutions">Digital Solutions</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-2">Company Location *</label>
      <select
        value={formData.companyLocation}
        onChange={(e) => handleInputChange('companyLocation', e.target.value)}
        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        disabled={!isEditable}
      >
        <option value="">Placeholder</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Delhi">Delhi</option>
        <option value="Bangalore">Bangalore</option>
      </select>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">State</label>
        <input
          type="text"
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          placeholder="Placeholder"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">City</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          placeholder="Placeholder"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium mb-2">Country</label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          placeholder="Placeholder"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Pincode</label>
        <input
          type="text"
          value={formData.pincode}
          onChange={(e) => handleInputChange('pincode', e.target.value)}
          placeholder="Placeholder"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          disabled={!isEditable}
        />
      </div>
    </div>
  </div>
);

export default Step2;