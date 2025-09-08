import { useState } from 'react';
import { useForm } from './FormContext';

const allSkills = ['JavaScript', 'React', 'Node.js', 'Python', 'HTML', 'CSS', 'TypeScript'];

const FinalDetails = () => {
  const { formData, updateFormData, goToNextStep, goToPrevStep } = useForm();
  const [finalDetails, setFinalDetails] = useState({
    skills: formData.finalDetails?.skills || [],
    certifications: formData.finalDetails?.certifications || '',
    linkedinProfile: formData.finalDetails?.linkedinProfile || '',
    githubProfile: formData.finalDetails?.githubProfile || '',
    portfolio: formData.finalDetails?.portfolio || '',
    project: formData.finalDetails?.project || null,
    referralSource: formData.finalDetails?.referralSource || ''
  });

  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFinalDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFinalDetails(prev => ({ ...prev, project: selectedFile }));
  };

  const addSkill = (skill) => {
    if (!finalDetails.skills.includes(skill)) {
      setFinalDetails(prev => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
    }
    setInputValue('');
    setShowDropdown(false);
  };

  const removeSkill = (skillToRemove) => {
    setFinalDetails(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove),
    }));
  };

  const filteredSkills = allSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase()) &&
      !finalDetails.skills.includes(skill)
  );

  const handleSubmit = () => {
    updateFormData('finalDetails', finalDetails);
    goToNextStep();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 overflow-auto">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-2">You're almost there! Let's add final details and submit!</h1>
        <p className="text-gray-600 mb-6">
          Highlight your skills and achievements. Upload certifications, list technical skills, and showcase what makes you stand out to employers.
        </p>

        <form className="space-y-4 mb-6">

          {/* Skills Section */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Skills</label>

            {/* Selected Skill Tags */}
            <div className="flex flex-wrap gap-2 mb-2">
              {finalDetails.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center bg-black text-white text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-2 text-white hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Input with Dropdown Icon */}
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowDropdown(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    e.preventDefault();
                    addSkill(inputValue.trim());
                  }
                }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                placeholder="Type or select a skill"
                className="w-full border border-gray-300 rounded p-2 pr-10"
              />

              {/* Clickable Dropdown Icon */}
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Dropdown List */}
            {showDropdown && filteredSkills.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 max-h-40 overflow-auto">
                {filteredSkills.map((skill) => (
                  <li
                    key={skill}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => addSkill(skill)}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-sm font-medium mb-1">Certifications</label>
            <input
              type="text"
              name="certifications"
              placeholder="Enter certifications"
              value={finalDetails.certifications}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedinProfile"
              placeholder="http://www.linkedin.com/in/yourprofile"
              value={finalDetails.linkedinProfile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* GitHub Profile */}
          <div>
            <label className="block text-sm font-medium mb-1">GitHub Profile</label>
            <input
              type="url"
              name="githubProfile"
              placeholder="http://www.github.com/yourusername"
              value={finalDetails.githubProfile}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Portfolio */}
          <div>
            <label className="block text-sm font-medium mb-1">Portfolio/Website</label>
            <input
              type="url"
              name="portfolio"
              placeholder="http://www.yourportfolio.com"
              value={finalDetails.portfolio}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Project Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Project (if any)</label>
            <div className="flex items-center">
              <label className="cursor-pointer flex-1 border border-gray-300 rounded p-2 bg-white flex justify-between items-center">
                <span className="text-gray-500">
                  {finalDetails.project ? finalDetails.project.name : 'Upload PDF'}
                </span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Referral Source */}
          <div>
            <label className="block text-sm font-medium mb-1">How did you hear about us?</label>
            <select
              name="referralSource"
              value={finalDetails.referralSource}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
            >
              <option value="">Select one...</option>
              <option value="friend">Friend Referral</option>
              <option value="social">Social Media</option>
              <option value="search">Search Engine</option>
              <option value="event">Career Fair/Event</option>
            </select>
          </div>
        </form>

        {/* Navigation Buttons */}
        <div className="flex justify-end space-x-2">
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

export default FinalDetails;
