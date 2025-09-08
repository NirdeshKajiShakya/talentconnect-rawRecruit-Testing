import React, { useState, useRef } from 'react';

export default function AddMember() {
  const [role, setRole] = useState('Jury');
  const [imagePreview, setImagePreview] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center bg-white py-8 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2">Add Jury Panel Member</h1>
        <p className="text-gray-700 mb-8">
          Add judges and mentors who will evaluate participant submissions
        </p>

        <div className="border border-gray-300 rounded-md p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-1">Member Details</h2>
          <p className="text-gray-600 text-sm mb-6">
            Provide information about the jury panel member or mentor
          </p>

          <form className="space-y-5">
            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Profile Image *</label>
              <div className="flex items-center">
                <div 
                  onClick={handleImageClick}
                  className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition mr-4"
                >
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile Preview" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <svg 
                      className="h-8 w-8 text-gray-400" 
                      stroke="currentColor" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M12 4v16m8-8H4" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  )}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </div>
                <div className="text-sm text-gray-500">
                  <p>Upload a professional photo</p>
                  <p className="text-xs">Square ratio recommended (1:1)</p>
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Sachin Jha"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium mb-2">Role *</label>
              <div className="relative">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500 appearance-none bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Jury">Jury</option>
                  <option value="Mentor">Mentor</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input
                type="text"
                placeholder="e.g. Chairperson"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Organization */}
            <div>
              <label className="block text-sm font-medium mb-2">Organization *</label>
              <input
                type="text"
                placeholder="e.g. IEEE JSSATEN Student Branch"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Bio / Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                rows="3"
                placeholder="Brief description about the panel member's expertise and background..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              ></textarea>
            </div>

            {/* Social Media Links */}
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
              >
                Add Panel Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}