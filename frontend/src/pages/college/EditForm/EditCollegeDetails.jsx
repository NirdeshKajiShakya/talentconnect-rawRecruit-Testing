import EditReview from "./EditReview";
export default function EditCollegeDetails({ formData, updateFormData, isEditing, toggleEdit, nextStep, prevStep }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const safeFormData = formData || {};

  return (
    <>
      
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6">College/University Details</h1>
          <p className="mb-6">Provide essential details about your institution.</p>

          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-1">College/University Name *</label>
              <input
                type="text"
                name="collegeName"
                value={safeFormData.collegeName || ''}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Enter college name"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={safeFormData.state || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter state"
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={safeFormData.city || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter city"
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={safeFormData.country || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter country"
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={safeFormData.pincode || ''}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="Enter pincode"
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>

            <div className="flex gap-4">
              <button
                onClick={toggleEdit}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>

              <button
                onClick={nextStep}
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
