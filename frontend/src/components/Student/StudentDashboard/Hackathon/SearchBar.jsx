import React, { useState } from 'react';

const SearchBar = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="flex justify-end mb-6">
      <div className="flex space-x-4">
        {/* Search Input */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md py-2 px-10 focus:outline-none focus:ring-2 focus:ring-gray-700"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Sort Dropdown */}
        <div className="relative w-48">
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-700"
            onChange={handleSortChange}
            defaultValue=""
          >
            <option value="" disabled>Sort by</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
            <option value="prize">Prize Value</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
