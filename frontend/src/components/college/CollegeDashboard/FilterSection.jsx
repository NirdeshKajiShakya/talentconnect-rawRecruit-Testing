import React from 'react';
import PropTypes from 'prop-types';

const FilterSection = ({
  filterCategories,
  activeFilters,
  onFilterChange,
  onClearFilters,
}) => {
  return (
    <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Filters</h2>
        <button 
          onClick={() => onClearFilters()}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div 
                key={`${filter.category}-${filter.value}`}
                className="inline-flex items-center bg-gray-100 rounded-full py-1 px-3 text-sm"
              >
                <span className="mr-1">{filter.value}</span>
                <button
                  onClick={() => {
                    const category = filterCategories.find(c => c.id === filter.category);
                    if (category) {
                      const filterItem = category.filters.find(f => f.label === filter.value);
                      if (filterItem) {
                        onFilterChange(category.id, filterItem.id, false);
                      }
                    }
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 mb-4">
        Showing 0 of 100
      </div>

      {filterCategories?.map((category) => (
        <div key={category.id} className="mb-6 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800">{category.label}</h3>
            <button 
              onClick={() => onClearFilters(category.id)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2">
            {category.filters.map((filter) => (
              <div key={filter.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${category.id}-${filter.id}`}
                  checked={filter.checked}
                  onChange={(e) => onFilterChange(category.id, filter.id, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`${category.id}-${filter.id}`}
                  className="ml-2 text-sm text-gray-700 select-none"
                >
                  {filter.label}({filter.count})
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

FilterSection.propTypes = {
  filterCategories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
      checked: PropTypes.bool.isRequired
    })).isRequired
  })).isRequired,
  activeFilters: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  })).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired
};

export default FilterSection;