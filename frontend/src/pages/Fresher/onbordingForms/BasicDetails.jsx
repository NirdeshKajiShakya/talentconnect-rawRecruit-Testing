import { useState } from 'react';
import { useForm } from './FormContext';
import FormLayout from './FormLayout';

const BasicDetails = () => {
  const { formData, updateFormData, goToNextStep , goToPrevStep } = useForm();
  const [form, setForm] = useState({
    name: formData.name || '',
    email: formData.email || '',
    mobile: formData.mobile || '',
    profileType: formData.profileType || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    updateFormData('name', form.name);
    updateFormData('email', form.email);
    updateFormData('mobile', form.mobile);
    updateFormData('profileType', form.profileType);
    goToNextStep();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <FormLayout 
      title="Let's begin by sharing some basic details!" 
      subtitle="Tell us a bit about yourself. This helps employers get to know you better and ensures a smooth job application process."
    >
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Enter your name</label>
          <input 
            type="text" 
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Enter your email *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </span>
            <input 
              type="email" 
              name="email"
              placeholder="hello@xyz.com"
              value={form.email}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-r-md p-2"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Enter your mobile no. *</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </span>
            <input 
              type="tel" 
              name="mobile"
              placeholder="1234567890"
              value={form.mobile}
              onChange={handleChange}
              className="flex-1 border border-gray-300 rounded-r-md p-2"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Select Your Profile Type</label>
          <select 
            name="profileType"
            value={form.profileType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select...</option>
            <option value="student">Student</option>
            <option value="professional">Professional</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end   space-x-2">
        <button 
          className="px-4 py-2 gap-5 border border-gray-300 rounded"
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
    </FormLayout>
    </div>
  );
};

export default BasicDetails;
