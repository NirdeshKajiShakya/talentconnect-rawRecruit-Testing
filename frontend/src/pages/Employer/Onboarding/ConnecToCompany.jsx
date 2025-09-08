

import React from "react";
import { useState } from "react";

const ConnectToCompany = ({ onNext, onBack, formData, updateFormData }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    if (!formData.companyLocation) newErrors.companyLocation = 'Company location is required';

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
            ✓
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
            3
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Connect to Your Company!
      </h2>
      <p className="text-gray-600 mb-6">
        Select the company you represent or register a new one.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.companyName || ''}
            onChange={(e) => updateFormData({ companyName: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.companyName ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Placeholder</option>
            <option value="Tech Corp">Tech Corp</option>
            <option value="StartUp Inc">StartUp Inc</option>
            <option value="Enterprise Ltd">Enterprise Ltd</option>
          </select>
          {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>}
          <button
            type="button"
            className="text-blue-600 text-sm mt-1 hover:underline"
          >
            Register Your Company
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Location <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.companyLocation || ''}
            onChange={(e) => updateFormData({ companyLocation: e.target.value })}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.companyLocation ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Placeholder</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="London">London</option>
            <option value="Remote">Remote</option>
          </select>
          {errors.companyLocation && <p className="mt-1 text-sm text-red-600">{errors.companyLocation}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              value={formData.state || ''}
              onChange={(e) => updateFormData({ state: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Placeholder</option>
              <option value="NY">NY</option>
              <option value="CA">CA</option>
              <option value="TX">TX</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              value={formData.city || ''}
              onChange={(e) => updateFormData({ city: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Placeholder</option>
              <option value="New York">New York</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="Chicago">Chicago</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <select
              value={formData.country || ''}
              onChange={(e) => updateFormData({ country: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Placeholder</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="Canada">Canada</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <select
              value={formData.pincode || ''}
              onChange={(e) => updateFormData({ pincode: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Placeholder</option>
              <option value="10001">10001</option>
              <option value="90210">90210</option>
              <option value="60601">60601</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
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
export default ConnectToCompany;