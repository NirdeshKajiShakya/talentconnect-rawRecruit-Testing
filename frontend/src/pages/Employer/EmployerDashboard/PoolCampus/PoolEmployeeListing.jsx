import { useState, useEffect } from 'react';
import FilterSection from '@/components/company/EmployerDashboard/FilterSection';
import PoolCollegeCard from '@/components/company/EmployerDashboard/PoolCampus/PoolCollegeCard';
import { mockColleges } from '@/constants/mockData';

const EmployerPoolEmployeeListing = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [filters, setFilters] = useState({
    workMode: [],
    degree: [],
    courses: [],
    location: '',
    college: '',
    internship: false,
    fullTime: false
  });
  
  // Simulating data fetch from backend
  useEffect(() => {
    // In a real app, this would be an API call
    setColleges(mockColleges);
    setFilteredColleges(mockColleges);
  }, []);

  // Filter colleges when filters change
  useEffect(() => {
    let result = [...colleges];
    
    // Apply work mode filters
    if (filters.workMode.length > 0) {
      result = result.filter(college => 
        filters.workMode.some(mode => college.workModes.includes(mode))
      );
    }
    
    // Apply degree filters
    if (filters.degree.length > 0) {
      result = result.filter(college => 
        filters.degree.some(deg => college.degrees.includes(deg))
      );
    }
    
    // Apply course filters
    if (filters.courses.length > 0) {
      result = result.filter(college => 
        filters.courses.some(course => college.courses.includes(course))
      );
    }
    
    // Apply internship filter
    if (filters.internship) {
      result = result.filter(college => college.hasInternship);
    }
    
    // Apply full-time filter
    if (filters.fullTime) {
      result = result.filter(college => college.hasFullTime);
    }
    
    // Apply location filter
    if (filters.location && filters.location !== 'Multi - Select') {
      result = result.filter(college => college.location === filters.location);
    }
    
    // Apply college filter
    if (filters.college && filters.college !== 'Multi - Select') {
      result = result.filter(college => college.name.includes(filters.college));
    }
    
    setFilteredColleges(result);
  }, [filters, colleges]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (Array.isArray(prev[filterType])) {
        // Handle array filters (checkboxes)
        if (prev[filterType].includes(value)) {
          return {
            ...prev,
            [filterType]: prev[filterType].filter(item => item !== value)
          };
        } else {
          return {
            ...prev,
            [filterType]: [...prev[filterType], value]
          };
        }
      } else {
        // Handle single value filters (dropdowns, text inputs)
        return {
          ...prev,
          [filterType]: value
        };
      }
    });
  };

  const handleToggleFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const clearFilter = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType]) ? [] : ''
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      workMode: [],
      degree: [],
      courses: [],
      location: '',
      college: '',
      internship: false,
      fullTime: false
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-2">Colleges Posting for On-Campus</h1>
      <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in arcu.</p>
      
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {filters.internship && (
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              Internship
              <button onClick={() => handleToggleFilter('internship')} className="ml-2 text-gray-500">×</button>
            </span>
          )}
          {filters.fullTime && (
            <span className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
              Full-time
              <button onClick={() => handleToggleFilter('fullTime')} className="ml-2 text-gray-500">×</button>
            </span>
          )}
          {(filters.internship || filters.fullTime) && (
            <button onClick={clearAllFilters} className="text-sm text-gray-600 ml-2">Clear all</button>
          )}
        </div>
        
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-4">Showing {filteredColleges.length} of {colleges.length}</span>
          <div className="relative">
            <select className="bg-white border border-gray-300 rounded py-1 px-3 appearance-none pr-8">
              <option>Sort by</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>A-Z</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-72 flex-shrink-0">
          <FilterSection 
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilter={clearFilter}
          />
        </div>
        
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredColleges.map(college => (
              <PoolCollegeCard
                key={college.id}
                college={college}
              />
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button className="border border-gray-300 rounded px-4 py-2 text-sm">View all</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default  EmployerPoolEmployeeListing;