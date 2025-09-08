import React, { useState, useRef, useEffect } from 'react';
import { currencyOptions , locationOptions } from '../constants/JobFormOptions'; // adjust the path as needed

const CreateJob = () => {
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [locations, setLocations] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const dropdownRef = useRef(null);

  const filteredOptions = locationOptions.filter(
    option =>
      option.toLowerCase().includes(locationInput.toLowerCase()) &&
      !locations.includes(option)
  );

  const handleAddLocation = () => {
    if (locationInput.trim() && !locations.includes(locationInput.trim())) {
      setLocations([...locations, locationInput.trim()]);
      setLocationInput('');
    }
  };

  const handleSelectLocation = (location) => {
    if (!locations.includes(location)) {
      setLocations([...locations, location]);
      setLocationInput('');
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveLocation = (locationToRemove) => {
    setLocations(locations.filter(location => location !== locationToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && locationInput) {
      e.preventDefault();
      handleAddLocation();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-white py-8 px-4">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
        <p className="text-gray-700 mb-8">
          Effortlessly Connect with Qualified Candidates and Build Your Dream Team
        </p>

        <div className="border border-gray-300 rounded-md p-6 bg-white">
          <h2 className="text-xl font-bold mb-1">Basic Job Details</h2>
          <p className="text-gray-600 text-sm mb-6">
            Help candidates connect with the right recruiter in your company!
          </p>

          <form className="space-y-5">
            {/* Employment Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Employment type *</label>
              <div className="flex gap-2">
                {['Full-time', 'Part-time', 'Contract'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setEmploymentType(type)}
                    className={`px-4 py-1.5 border rounded-md text-sm transition ${
                      employmentType === type
                        ? 'bg-black text-white border-black'
                        : 'text-gray-800 border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Job Title *</label>
              <input
                type="text"
                placeholder="Enter the Job Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Preferred Hiring Locations */}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Hiring Locations *</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {locations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 px-3 py-1 rounded-md text-sm"
                  >
                    <span>{location}</span>
                    <button
                      type="button"
                      className="ml-2 text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveLocation(location)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="relative" ref={dropdownRef}>
                <div className="flex">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => {
                      setLocationInput(e.target.value);
                      setIsDropdownOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsDropdownOpen(true)}
                    placeholder="Type or select locations"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="absolute inset-y-0 right-0 flex items-center px-2"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {locationInput && !filteredOptions.includes(locationInput) && !locations.includes(locationInput) && (
                      <div
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={handleAddLocation}
                      >
                        <span className="text-blue-500 mr-2">+</span> Add "{locationInput}"
                      </div>
                    )}

                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleSelectLocation(option)}
                        >
                          {option}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">No matching locations</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* No of Openings */}
            <div>
              <label className="block text-sm font-medium mb-2">No of Openings *</label>
              <input
                type="text"
                placeholder="Eg. 2"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              />
            </div>

            {/* Monthly In-hand Salary */}
            <div>
              <label className="block text-sm font-medium mb-2">Monthly In-hand Salary *</label>
              <div className="flex">
                <div className="relative">
                  <select
                    className="h-full w-20 px-2 py-2 border border-gray-300 rounded-l-md focus:outline-none bg-white"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    {currencyOptions.map((cur, index) => (
                      <option key={index} value={cur}>{cur}</option>
                    ))}
                  </select>
                </div>
                <input
                  type="text"
                  placeholder="80"
                  className="flex-1 px-3 py-2 border border-l-0 border-gray-300 rounded-r-md focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Job Info / Job Description *</label>
              <textarea
                rows="4"
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
