import React, { useState } from 'react';

// Step 1: Introduce Yourself Component
const IntroduceYourself = ({ onNext, onBack, formData, updateFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.designation) newErrors.designation = 'Designation is required';
    if (!formData.email?.trim()) newErrors.email = 'Work email is required';
    // Basic email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobile?.trim()) newErrors.mobile = 'Mobile number is required';
    // Basic mobile number format validation (e.g., 10 digits)
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
            2
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
            3
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Introduce Yourself as an Employer!
      </h2>
      <p className="text-gray-600 mb-6">
        Help candidates connect with the right recruiter in your company!
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter your name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Designation <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.designation || ''}
            onChange={(e) => updateFormData({ designation: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.designation ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Placeholder</option>
            <option value="HR Manager">HR Manager</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Hiring Manager">Hiring Manager</option>
            <option value="CEO">CEO</option>
            <option value="Other">Other</option>
          </select>
          {errors.designation && <p className="mt-1 text-sm text-red-600">{errors.designation}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter your work email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">@</span>
            <input
              type="email"
              value={formData.email || ''}
              onChange={(e) => updateFormData({ email: e.target.value })}
              className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="hello@xyz.com"
            />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter your mobile no. <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-400">📞</span>
            <input
              type="tel"
              value={formData.mobile || ''}
              onChange={(e) => updateFormData({ mobile: e.target.value })}
              className={`w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.mobile ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234567890"
            />
          </div>
          {errors.mobile && <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-sm">
              http://
            </span>
            <input
              type="text"
              value={formData.linkedin || ''}
              onChange={(e) => updateFormData({ linkedin: e.target.value })}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="www.linkedin.com/in/yourprofile"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onBack}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default IntroduceYourself