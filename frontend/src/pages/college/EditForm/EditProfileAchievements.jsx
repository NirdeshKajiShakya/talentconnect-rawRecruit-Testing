import { useState } from 'react';

export default function EditProfileAchievements({ formData, updateFormData, isEditing, toggleEdit, nextStep, prevStep }) {
  const [workshop, setWorkshop] = useState({
    name: '',
    startDate: '',
    endDate: '',
    executor: ''
  });

  const [volunteering, setVolunteering] = useState({
    name: '',
    startDate: '',
    endDate: '',
    executor: ''
  });

  const [award, setAward] = useState({
    name: '',
    startDate: '',
    endDate: '',
    organization: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleWorkshopChange = (e) => {
    const { name, value } = e.target;
    setWorkshop({ ...workshop, [name]: value });
  };

  const addWorkshop = () => {
    updateFormData('workshops', [...(formData.workshops || []), workshop]);
    setWorkshop({ name: '', startDate: '', endDate: '', executor: '' });
  };

  const handleVolunteeringChange = (e) => {
    const { name, value } = e.target;
    setVolunteering({ ...volunteering, [name]: value });
  };

  const addVolunteering = () => {
    updateFormData('volunteering', [...(formData.volunteering || []), volunteering]);
    setVolunteering({ name: '', startDate: '', endDate: '', executor: '' });
  };

  const handleAwardChange = (e) => {
    const { name, value } = e.target;
    setAward({ ...award, [name]: value });
  };

  const addAward = () => {
    updateFormData('awards', [...(formData.awards || []), award]);
    setAward({ name: '', startDate: '', endDate: '', organization: '' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">College Profile & Achievements</h1>
        <p className="mb-6">Showcase your institution's key highlights, achievements, and online presence!</p>

        <div className="space-y-8">
          {/* College Website */}
          <div>
            <label className="block font-medium mb-1">College Website *</label>
            <input
              type="url"
              name="collegeWebsite"
              value={formData.collegeWebsite || ''}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="http://www.example.com"
              className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              required
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block font-medium mb-1">LinkedIn Profile *</label>
            <input
              type="url"
              name="unicefinProfile"
              value={formData.unicefinProfile || ''}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="http://www.linkedin.com/in/example"
              className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              required
            />
          </div>

          {/* Workshops & Training Programs */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-bold mb-4">Workshops & Training Programs</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={workshop.name}
                onChange={handleWorkshopChange}
                disabled={!isEditing}
                placeholder="Workshop Name"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={workshop.startDate}
                  onChange={handleWorkshopChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
                <input
                  type="date"
                  name="endDate"
                  value={workshop.endDate}
                  onChange={handleWorkshopChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>

              <input
                type="text"
                name="executor"
                value={workshop.executor}
                onChange={handleWorkshopChange}
                disabled={!isEditing}
                placeholder="Executor Name"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />

              {isEditing && (
                <button
                  onClick={addWorkshop}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add Workshop
                </button>
              )}
            </div>
          </div>

          {/* Volunteering */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-bold mb-4">Volunteering & Community Engagement</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={volunteering.name}
                onChange={handleVolunteeringChange}
                disabled={!isEditing}
                placeholder="Event Name"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={volunteering.startDate}
                  onChange={handleVolunteeringChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
                <input
                  type="date"
                  name="endDate"
                  value={volunteering.endDate}
                  onChange={handleVolunteeringChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>

              <input
                type="text"
                name="executor"
                value={volunteering.executor}
                onChange={handleVolunteeringChange}
                disabled={!isEditing}
                placeholder="Executor Name"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />

              {isEditing && (
                <button
                  onClick={addVolunteering}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add Volunteering Experience
                </button>
              )}
            </div>
          </div>

          {/* Awards */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-bold mb-4">Awards & Recognitions</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={award.name}
                onChange={handleAwardChange}
                disabled={!isEditing}
                placeholder="Award Name"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  name="startDate"
                  value={award.startDate}
                  onChange={handleAwardChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
                <input
                  type="date"
                  name="endDate"
                  value={award.endDate}
                  onChange={handleAwardChange}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>

              <input
                type="text"
                name="organization"
                value={award.organization}
                onChange={handleAwardChange}
                disabled={!isEditing}
                placeholder="Awarding Organization"
                className="w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
              />

              {isEditing && (
                <button
                  onClick={addAward}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                >
                  Add Award
                </button>
              )}
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
  );
}
