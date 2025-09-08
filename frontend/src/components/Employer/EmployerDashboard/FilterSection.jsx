import { useState } from 'react';

const FilterSection = ({ filters, onFilterChange, onClearFilter }) => {
  // Filter sections data for dynamic rendering
  const filterSections = [
    {
      title: 'Work mode',
      type: 'workMode',
      options: [
        { id: 'work-office', value: 'office', label: 'Work from office', count: 28692 },
        { id: 'work-hybrid', value: 'hybrid', label: 'Hybrid', count: 756 },
        { id: 'work-remote', value: 'remote', label: 'Remote', count: 709 }
      ]
    },
    {
      title: 'Degree',
      type: 'degree',
      options: [
        { id: 'degree-polytechnic', value: 'polytechnic', label: 'Polytechnic' },
        { id: 'degree-iti', value: 'iti', label: 'ITI' },
        { id: 'degree-diploma', value: 'diploma', label: 'Diploma' },
        { id: 'degree-undergraduate', value: 'undergraduate', label: 'Undergraduate' },
        { id: 'degree-postgraduate', value: 'postgraduate', label: 'Postgraduate' },
      ]
    },
    {
      title: 'Courses',
      type: 'courses',
      options: [
        { id: 'course-engineering', value: 'engineering', label: 'Engineering' },
        { id: 'course-pharmacy', value: 'pharmacy', label: 'Pharmacy' },
        { id: 'course-mechanical', value: 'mechanical', label: 'Mechanical Engineering' },
        { id: 'course-civil', value: 'civil', label: 'Civil Engineering' },
        { id: 'course-electrical', value: 'electrical', label: 'Electrical' },
        { id: 'course-fitter', value: 'fitter', label: 'Fitter' },
        { id: 'course-welding', value: 'welding', label: 'Welding' },
        { id: 'course-electronics', value: 'electronics', label: 'Electronics' },
        { id: 'course-btech', value: 'btech', label: 'B.Tech' },
        { id: 'course-bba', value: 'bba', label: 'BBA' },
        { id: 'course-bsc', value: 'bsc', label: 'BSc' },
        { id: 'course-bca', value: 'bca', label: 'BCA' },
        { id: 'course-be', value: 'be', label: 'BE' },
        { id: 'course-ba', value: 'ba', label: 'BA' },
        { id: 'course-bbm', value: 'bbm', label: 'BBM' },
        { id: 'course-puc-humanities', value: 'puc-humanities', label: 'PUC Humanities Combinations' },
        { id: 'course-puc-commerce', value: 'puc-commerce', label: 'PUC Commerce Combinations' },
        { id: 'course-b-pharma', value: 'b-pharma', label: 'B.Pharma' },
        { id: 'course-d-pharma', value: 'd-pharma', label: 'D.Pharma' },
        { id: 'course-m-tech', value: 'm-tech', label: 'M.Tech' },
        { id: 'course-mba', value: 'mba', label: 'MBA' },
        { id: 'course-ma', value: 'ma', label: 'MA' },
        { id: 'course-mca', value: 'mca', label: 'MCA' },
        { id: 'course-me', value: 'me', label: 'ME' },
        { id: 'course-msc', value: 'msc', label: 'MSc' },
        { id: 'course-mcom', value: 'mcom', label: 'MCom' },
        { id: 'course-m-pharma', value: 'm-pharma', label: 'M.Pharma' }
      ]
    }
  ];

  // Additional filter sections for Location and College
  const dropdownFilters = [
    {
      title: 'Location',
      type: 'location',
      placeholder: 'Multi - Select'
    },
    {
      title: 'College',
      type: 'college',
      placeholder: 'Multi - Select'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Checkbox filter sections */}
      {filterSections.map((section) => (
        <div key={section.type} className="border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{section.title}</h3>
            <button 
              onClick={() => onClearFilter(section.type)} 
              className="text-xs text-gray-500"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {section.options.map((option) => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={option.id}
                  checked={filters[section.type].includes(option.value)}
                  onChange={() => onFilterChange(section.type, option.value)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor={option.id} className="ml-2 text-sm text-gray-700 flex-grow">
                  {option.label}
                </label>
                {option.count && (
                  <span className="text-xs text-gray-500">({option.count})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Dropdown filter sections */}
      {dropdownFilters.map((filter) => (
        <div key={filter.type} className="border-b border-gray-200 pb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">{filter.title}</h3>
            <button 
              onClick={() => onClearFilter(filter.type)} 
              className="text-xs text-gray-500"
            >
              Clear
            </button>
          </div>
          <div className="relative">
            <select
              value={filters[filter.type]}
              onChange={(e) => onFilterChange(filter.type, e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded appearance-none"
            >
              <option value="">{filter.placeholder}</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="chennai">Chennai</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterSection;