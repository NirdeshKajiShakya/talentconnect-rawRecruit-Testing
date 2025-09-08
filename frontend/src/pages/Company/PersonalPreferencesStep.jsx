import { useState } from 'react';
import { motion } from 'framer-motion';
import FormField from '@/components/company/FormField';
import Button from '@/components/company/Button';

const PersonalInfoStep = ({ formData, handleChange, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Your name is required.';
    if (!formData.designation) newErrors.designation = 'Please select a designation.';
    if (!formData.workEmail) {
      newErrors.workEmail = 'A work email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address.';
    }
    if (!formData.mobile) {
      newErrors.mobile = 'A mobile number is required.';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      nextStep();
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl font-bold mb-1">Introduce Yourself as an Employer!</h1>
        <p className="text-gray-600 mb-6">
          Help candidates connect with the right recruiter in your company!
        </p>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      
          <FormField
            label="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
            placeholder="Your full name"
            error={errors.name}
          />

          <FormField
            label="Designation"
            type="select"
            name="designation"
            value={formData.designation}
            onChange={handleFieldChange}
            placeholder="Choose your role"
            options={[
              { value: 'hr_manager', label: 'HR Manager' },
              { value: 'recruiter', label: 'Recruiter' },
              { value: 'hiring_manager', label: 'Hiring Manager' },
              { value: 'team_lead', label: 'Team Lead' },
              { value: 'ceo', label: 'CEO' },
            ]}
            error={errors.designation}
          />

          <FormField
            label="Enter your work email"
            type="email"
            name="workEmail"
            value={formData.workEmail}
            onChange={handleFieldChange}
            placeholder="hello@xyz.com"
            error={errors.workEmail}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            }
          />

          {/* Fixed Mobile Input Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your mobile no.
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleFieldChange}
                placeholder="1234567890"
                className={`block w-full pl-10 pr-3 py-2 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black`}
              />
            </div>
            {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn Profile
            </label>
            <div className="flex">
              <div className="bg-gray-100 border border-r-0 border-gray-300 rounded-l-md px-3 flex items-center text-gray-500">
                <span className="text-sm">http://</span>
              </div>
              <input
                type="text"
                name="linkedIn"
                value={formData.linkedIn}
                onChange={handleFieldChange}
                placeholder="www.linkedin.com/in/yourname"
                className="form-input rounded-l-none flex-1 border-gray-300 focus:ring-black focus:border-black"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8 space-x-4">
            <Button variant="secondary" onClick={prevStep}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Next
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PersonalInfoStep;