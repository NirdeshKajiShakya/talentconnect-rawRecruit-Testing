import React, { useState, useRef, useEffect } from 'react';

export default function CreateHackathon() {
  const [hackathonType, setHackathonType] = useState('In-person');
  const [imagePreview, setImagePreview] = useState(null);
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
        <h1 className="text-3xl font-bold mb-2">Post a Hackathon</h1>
        <p className="text-gray-700 mb-8">
          Create and manage exciting hackathon events to inspire innovation and collaboration
        </p>

        <div className="border border-gray-300 rounded-md p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-1">Hackathon Details</h2>
          <p className="text-gray-600 text-sm mb-6">
            Provide comprehensive information to attract participants to your event
          </p>

          <form className="space-y-5">
            {/* Hackathon Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Hackathon Type *</label>
              <div className="flex gap-2">
                {['In-person', 'Virtual', 'Hybrid'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setHackathonType(type)}
                    className={`px-4 py-1.5 border rounded-md text-sm transition ${
                      hackathonType === type
                        ? 'bg-black text-white border-black'
                        : 'text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Hackathon Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Hackathon Title *</label>
              <input
                type="text"
                placeholder="Enter the Hackathon Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Date Range */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Start Date *</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">End Date *</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="block text-sm font-medium mb-2">Venue *</label>
              <input
                type="text"
                placeholder="Enter the venue location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Hackathon Image */}
            <div>
              <label className="block text-sm font-medium mb-2">Hackathon Banner Image *</label>
              <div 
                onClick={handleImageClick}
                className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-gray-400 transition"
              >
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="mx-auto max-h-48 rounded" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition rounded">
                      <p className="text-white font-medium">Change Image</p>
                    </div>
                  </div>
                ) : (
                  <div className="py-8">
                    <svg 
                      className="mx-auto h-12 w-12 text-gray-400" 
                      stroke="currentColor" 
                      fill="none" 
                      viewBox="0 0 48 48" 
                      aria-hidden="true"
                    >
                      <path 
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Hackathon Description *</label>
              <textarea
                rows="4"
                placeholder="Describe your hackathon, including themes, rules, prizes, and other important details..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              ></textarea>
            </div>

            {/* Maximum Team Size */}
            <div>
              <label className="block text-sm font-medium mb-2">Maximum Team Size *</label>
              <input
                type="number"
                min="1"
                placeholder="Eg. 4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
              >
                Post Hackathon
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}