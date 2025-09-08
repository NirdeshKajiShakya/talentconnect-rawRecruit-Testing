import { useAppContext } from './AppContext';
import StepLayout from './StepLayout';

const BasicDetails = () => {
  const { formData, updateFormData, editMode } = useAppContext();
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const validateNext = () => {
    // Basic validation - ensure required fields are filled
    if (!formData.name || !formData.email || !formData.mobile) {
      alert('Please fill in all required fields');
      return false;
    }
    return true;
  };

  return (
    <StepLayout
      step={2}
      title="Let's begin by sharing some basic details!"
      subtitle="Tell us a bit about yourself. This helps employers get to know you better and ensures a smooth job application process."
      prevRoute="/edit/fresher-resume-upload"
      nextRoute="/edit/fresher-education"
      contextKey="basicDetails"
      onNext={validateNext}
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Enter your name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Full Name"
            disabled={!editMode.basicDetails}
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Enter your email *</label>
          <div className="flex items-center border border-gray-300 rounded">
            <div className="pl-2 pr-1">✉</div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border-0 focus:outline-none"
              placeholder="hello@xyz.com"
              disabled={!editMode.basicDetails}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Enter your mobile no. *</label>
          <div className="flex items-center border border-gray-300 rounded">
            <div className="pl-2 pr-1">📱</div>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border-0 focus:outline-none"
              placeholder="1234567890"
              disabled={!editMode.basicDetails}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Select Your Profile Type</label>
          <select
            name="profileType"
            value={formData.profileType}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            disabled={!editMode.basicDetails}
          >
            <option value="">Select</option>
            <option value="student">Student</option>
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>
      </div>
    </StepLayout>
  );
};

export default BasicDetails;