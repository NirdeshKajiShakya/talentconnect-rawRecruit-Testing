import { useAppContext } from './AppContext';
import StepLayout from './StepLayout';

const FinalDetails = () => {
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

  const validateNext = () => {
    // Basic validation
    if (!formData.skills.length) {
      alert('Please select at least one skill');
      return false;
    }
    return true;
  };

  return (
    <StepLayout
      step={5}
      title="You're almost there! Let's add final details and submit!"
      subtitle="Highlight your skills and achievements. Upload certifications, list technical skills, and showcase what makes you stand out to employers."
      prevRoute="/edit/fresher-career-goals"
      nextRoute="edit/fresher-review"
      contextKey="finalDetails"
      onNext={validateNext}
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Skills</label>
          <select
            name="skills"
            value={formData.skills}
            onChange={handleMultiSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
            multiple
            disabled={!editMode.finalDetails}
          >
            <option value="javascript">JavaScript</option>
            <option value="react">React</option>
            <option value="nodejs">Node.js</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="uiux">UI/UX Design</option>
          </select>
          <div className="text-xs text-gray-500 mt-1">Multiple-select</div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Certifications</label>
          <input
            type="text"
            name="certifications"
            value={formData.certifications}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Placeholder"
            disabled={!editMode.finalDetails}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">LinkedIn Profile</label>
          <div className="flex">
            <div className="border border-gray-300 rounded-l px-2 py-2 bg-gray-100">
              http://
            </div>
            <input
              type="text"
              name="linkedinProfile"
              value={formData.linkedinProfile}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-r"
              placeholder="www.resume.io"
              disabled={!editMode.finalDetails}
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">GitHub Profile</label>
          <div className="flex">
            <div className="border border-gray-300 rounded-l px-2 py-2 bg-gray-100">
              http://
            </div>
            <input
              type="text"
              name="githubProfile"
              value={formData.githubProfile}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-r"
              placeholder="www.resume.io"
              disabled={!editMode.finalDetails}
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Portfolio/Website(if any)</label>
          <div className="flex">
            <div className="border border-gray-300 rounded-l px-2 py-2 bg-gray-100">
              http://
            </div>
            <input
              type="text"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-r"
              placeholder="www.resume.io"
              disabled={!editMode.finalDetails}
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">How did you hear about us?</label>
          <select
            name="referralSource"
            value={formData.referralSource}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.finalDetails}
          >
            <option value="">Select one...</option>
            <option value="linkedin">LinkedIn</option>
            <option value="jobBoard">Job Board</option>
            <option value="referral">Employee Referral</option>
            <option value="social">Social Media</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
    </StepLayout>
  );
};

export default FinalDetails;