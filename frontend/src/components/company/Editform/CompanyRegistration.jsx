import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressSteps from "./ProgressStep";

const CompanyRegistration = () => {
  const navigate = useNavigate();
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => setIsEditable((prev) => !prev);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-3xl p-6 bg-white shadow rounded-lg">
        <ProgressSteps currentStep={1} />
        <h1 className="text-2xl font-bold mb-2">Connect to Your Company!</h1>
        <p className="text-sm text-gray-600 mb-4">
          Select the company you represent or register a new one.
        </p>

        <div className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
              <option>Placeholder</option>
            </select>
          </div>

          {/* Register Company */}
          <div className="text-blue-600 text-sm">
            <a href="#">Register Your Company</a>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              disabled={!isEditable}
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded h-24 bg-white disabled:opacity-50"
            />
          </div>

          {/* Company Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Type <span className="text-red-500">*</span></label>
            <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
              <option>Placeholder</option>
            </select>
          </div>

          {/* Industry Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Industry Type <span className="text-red-500">*</span></label>
            <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
              <option>Placeholder</option>
            </select>
          </div>

          {/* Number of Employees */}
          <div>
            <label className="block text-sm font-medium mb-1">Number of Employees <span className="text-red-500">*</span></label>
            <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
              <option>Placeholder</option>
            </select>
          </div>

          {/* Established Year */}
          <div>
            <label className="block text-sm font-medium mb-1">Established Year <span className="text-red-500">*</span></label>
            <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
              <option>Placeholder</option>
            </select>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Contact Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="tel"
                disabled={!isEditable}
                placeholder="1234567890"
                className="w-full p-2 pl-8 border border-gray-300 rounded bg-white disabled:opacity-50"
              />
              <span className="absolute left-2 top-2.5 text-gray-500">
                
              </span>
            </div>
          </div>

          {/* Alternate Number */}
          <div>
            <label className="block text-sm font-medium mb-1">Alternate Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type="tel"
                disabled={!isEditable}
                placeholder="1234567890"
                className="w-full p-2 pl-8 border border-gray-300 rounded bg-white disabled:opacity-50"
              />
              <span className="absolute left-2 top-2.5 text-gray-500">
                
              </span>
            </div>
          </div>

          {/* Company Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Location <span className="text-red-500">*</span></label>
            <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
              <option>Placeholder</option>
            </select>
          </div>

          {/* State and City */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
                <option>Placeholder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
                <option>Placeholder</option>
              </select>
            </div>
          </div>

          {/* Country and Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
                <option>Placeholder</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <select disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50">
                <option>Placeholder</option>
              </select>
            </div>
          </div>

          {/* Company Website */}
          <div>
            <label className="block text-sm font-medium mb-1">Company Website <span className="text-red-500">*</span></label>
            <input
              type="url"
              disabled={!isEditable}
              className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50"
              placeholder="https://www.company.com"
            />
          </div>

          {/* LinkedIn Profile */}
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile <span className="text-red-500">*</span></label>
            <input
              type="url"
              disabled={!isEditable}
              className="w-full p-2 border border-gray-300 rounded bg-white disabled:opacity-50"
              placeholder="https://linkedin.com/in/company"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate("/company-onboarding/step-2")}
              className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
            >
              Cancel
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleEdit}
                className="text-black border border-gray-300 rounded px-6 py-2 hover:bg-gray-100"
              >
                {isEditable ? "Lock" : "Edit"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/company-onboarding/step-4")}
                className="bg-black text-white rounded px-6 py-2 hover:bg-gray-800"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistration;
