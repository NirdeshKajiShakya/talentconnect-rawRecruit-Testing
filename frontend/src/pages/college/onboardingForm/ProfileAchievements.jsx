
import { useState } from 'react';

export default function ProfileAchievements({ formData, updateFormData, nextStep, prevStep }) {
  const [workshop, setWorkshop] = useState({
    name: '',
    startDate: '',
    endDate: '',
    executor: '' // This will map to 'description' in backend
  });

  const [volunteering, setVolunteering] = useState({
    name: '',
    startDate: '',
    endDate: '',
    executor: '' // This will map to 'description' in backend
  });

  const [award, setAward] = useState({
    name: '', // This will map to 'awardTitle' in backend
    startDate: '',
    endDate: '',
    organization: '' // This will map to 'awardingOrganization' in backend
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleWorkshopChange = (e) => {
    const { name, value } = e.target;
    setWorkshop({
      ...workshop,
      [name]: value
    });
  };

  const addWorkshop = () => {
    if (workshop.name && workshop.startDate && workshop.endDate && workshop.executor) {
      updateFormData('workshops', [...(formData.workshops || []), workshop]);
      setWorkshop({
        name: '',
        startDate: '',
        endDate: '',
        executor: ''
      });
    } else {
      alert('Please fill all workshop fields before adding.');
    }
  };

  const handleVolunteeringChange = (e) => {
    const { name, value } = e.target;
    setVolunteering({
      ...volunteering,
      [name]: value
    });
  };

  const addVolunteering = () => {
    if (volunteering.name && volunteering.startDate && volunteering.endDate && volunteering.executor) {
      updateFormData('volunteering', [...(formData.volunteering || []), volunteering]);
      setVolunteering({
        name: '',
        startDate: '',
        endDate: '',
        executor: ''
      });
    } else {
      alert('Please fill all volunteering fields before adding.');
    }
  };

  const handleAwardChange = (e) => {
    const { name, value } = e.target;
    setAward({
      ...award,
      [name]: value
    });
  };

  const addAward = () => {
    if (award.name && award.startDate && award.endDate && award.organization) {
      updateFormData('awards', [...(formData.awards || []), award]);
      setAward({
        name: '',
        startDate: '',
        endDate: '',
        organization: ''
      });
    } else {
      alert('Please fill all award fields before adding.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl my-8">
          <h1 className="text-2xl font-bold mb-6">College Profile & Achievements</h1>
          <p className="mb-6">Showcase your institution's key highlights, achievements, and online presence!</p>

          <div className="space-y-8">
            <div>
              <label className="block font-medium mb-1">College Website *</label>
              <input
                type="url"
                name="collegeWebsite"
                value={formData.collegeWebsite || ''}
                onChange={handleChange}
                placeholder="http://www.nature.io"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1">LinkedIn Profile *</label>
              <input
                type="url"
                name="unicefinProfile" // This name needs to be consistent with formData state
                value={formData.unicefinProfile || ''}
                onChange={handleChange}
                placeholder="http://www.linkedin.com/your-college"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-bold mb-4">Workshops & Training Programs</h3>
              {/* Display added workshops */}
              {formData.workshops && formData.workshops.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Added Workshops:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {formData.workshops.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        <strong>{item.name}</strong> from {item.startDate} to {item.endDate} (by {item.executor})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Workshop Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={workshop.name}
                    onChange={handleWorkshopChange}
                    placeholder="Placeholder"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={workshop.startDate}
                      onChange={handleWorkshopChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={workshop.endDate}
                      onChange={handleWorkshopChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Executor</label>
                  <input
                    type="text"
                    name="executor"
                    value={workshop.executor}
                    onChange={handleWorkshopChange}
                    placeholder="e.g., Google, Microsoft"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  onClick={addWorkshop}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add workshop
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-bold mb-4">Volunteering & Community Engagement</h3>
              {/* Display added volunteering */}
              {formData.volunteering && formData.volunteering.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Added Volunteering Experiences:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {formData.volunteering.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        <strong>{item.name}</strong> from {item.startDate} to {item.endDate} (by {item.executor})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Event Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={volunteering.name}
                    onChange={handleVolunteeringChange}
                    placeholder="Placeholder"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={volunteering.startDate}
                      onChange={handleVolunteeringChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={volunteering.endDate}
                      onChange={handleVolunteeringChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Executor</label>
                  <input
                    type="text"
                    name="executor"
                    value={volunteering.executor}
                    onChange={handleVolunteeringChange}
                    placeholder="e.g., Local Community Group"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  onClick={addVolunteering}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add volunteering experience
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="font-bold mb-4">Awards & Recognitions</h3>
              {/* Display added awards */}
              {formData.awards && formData.awards.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-lg font-semibold mb-2">Added Awards:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {formData.awards.map((item, index) => (
                      <li key={index} className="text-gray-700">
                        <strong>{item.name}</strong> from {item.startDate} to {item.endDate} (by {item.organization})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Award Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={award.name}
                    onChange={handleAwardChange}
                    placeholder="Placeholder"
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={award.startDate}
                      onChange={handleAwardChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block font-medium mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={award.endDate}
                      onChange={handleAwardChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-1">Awarding Organizations *</label>
                  <input
                    type="text"
                    name="organization"
                    value={award.organization}
                    onChange={handleAwardChange}
                    placeholder="e.g., National Science Foundation"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <button
                  onClick={addAward}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Add award
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}