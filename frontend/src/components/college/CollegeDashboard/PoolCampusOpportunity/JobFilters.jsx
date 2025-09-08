import React from 'react';

const JobFilters = ({ filters, onChange }) => {
  const handleSearchChange = (e) => {
    onChange({ search: e.target.value });
  };

  const handleStreamChange = (stream) => {
    const updatedStreams = filters.streams.includes(stream)
      ? filters.streams.filter(s => s !== stream)
      : [...filters.streams, stream];
    onChange({ streams: updatedStreams });
  };

  const handleMinPackageChange = (e) => {
    onChange({ minPackage: Number(e.target.value) });
  };

  const handleLocationChange = (e) => {
    onChange({ locations: [e.target.value] });
  };

  const handleRoleChange = (e) => {
    onChange({ role: e.target.value });
  };

  const handleUpcomingDrivesChange = (e) => {
    onChange({ upcomingDrivesOnly: e.target.checked });
  };

  const clearFilter = (filterName) => {
    const clearedFilter = {};
    
    switch (filterName) {
      case 'search':
        clearedFilter.search = '';
        break;
      case 'streams':
        clearedFilter.streams = [];
        break;
      case 'minPackage':
        clearedFilter.minPackage = 0;
        break;
      case 'locations':
        clearedFilter.locations = [];
        break;
      case 'role':
        clearedFilter.role = '';
        break;
      case 'upcomingDrivesOnly':
        clearedFilter.upcomingDrivesOnly = false;
        break;
      default:
        break;
    }
    
    onChange(clearedFilter);
  };

  return (
    <div className="space-y-6">
      {/* Company Name Filter */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="company-search" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          {filters.search && (
            <button 
              onClick={() => clearFilter('search')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            id="company-search"
            placeholder="Search companies..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.search}
            onChange={handleSearchChange}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Eligible Streams */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Eligible Streams
          </label>
          {filters.streams.length > 0 && (
            <button 
              onClick={() => clearFilter('streams')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex gap-2">
            <button
              className={`px-4 py-1.5 rounded-md text-sm ${
                filters.streams.includes('Computer Science') 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
              onClick={() => handleStreamChange('Computer Science')}
            >
              Computer Science
            </button>
            <button
              className={`px-4 py-1.5 rounded-md text-sm ${
                filters.streams.includes('IT') 
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : 'bg-white border border-gray-300 text-gray-700'
              }`}
              onClick={() => handleStreamChange('IT')}
            >
              IT
            </button>
          </div>
          <button
            className={`px-4 py-1.5 rounded-md text-sm ${
              filters.streams.includes('Electronics') 
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
            onClick={() => handleStreamChange('Electronics')}
          >
            Electronics
          </button>
        </div>
      </div>
      
      {/* Minimum Package Filter */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="min-package" className="block text-sm font-medium text-gray-700">
            Minimum Package (LPA)
          </label>
          {filters.minPackage > 0 && (
            <button 
              onClick={() => clearFilter('minPackage')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            id="min-package"
            min="1k"
            max="50k"
            step="1"
            value={filters.minPackage}
            onChange={handleMinPackageChange}
            className="w-full"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>₹1k</span>
          <span>₹{filters.minPackage}</span>
          <span>₹50k</span>
        </div>
      </div>
      
      {/* Work Location */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Work Location
          </label>
          {filters.locations.length > 0 && filters.locations[0] !== 'All Locations' && (
            <button 
              onClick={() => clearFilter('locations')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        <select
          id="location"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={filters.locations[0] || 'All Locations'}
          onChange={handleLocationChange}
        >
          <option value="All Locations">All Locations</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
        </select>
      </div>
      
      {/* Job Role */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="role-search" className="block text-sm font-medium text-gray-700">
            Job Role
          </label>
          {filters.role && (
            <button 
              onClick={() => clearFilter('role')}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          )}
        </div>
        <div className="relative">
          <input
            type="text"
            id="role-search"
            placeholder="Search roles..."
            className="w-full p-2 border border-gray-300 rounded-md"
            value={filters.role}
            onChange={handleRoleChange}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Upcoming Drives Only */}
      <div className="flex items-center">
        <label htmlFor="upcoming-drives" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              type="checkbox"
              id="upcoming-drives"
              className="sr-only"
              checked={filters.upcomingDrivesOnly}
              onChange={handleUpcomingDrivesChange}
            />
            <div className={`block w-10 h-6 rounded-full ${filters.upcomingDrivesOnly ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${filters.upcomingDrivesOnly ? 'transform translate-x-4' : ''}`}></div>
          </div>
          <div className="ml-3 text-sm font-medium text-gray-700">
            Upcoming Drives Only
          </div>
        </label>
      </div>
      
      {/* Apply Filters Button */}
      <div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;