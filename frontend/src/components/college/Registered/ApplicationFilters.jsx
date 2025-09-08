import { useState, useEffect } from 'react';
import { useApplications } from '@/context/College/Registered/ApplicationContext';

const ApplicationFilters = ({ filters, setFilters }) => {
  const [searchValue, setSearchValue] = useState('');
  const { applications } = useApplications();
  
  // Extract unique roles from applications
  const roles = ['All Role', ...new Set(applications.map(app => app.position))];
  
  // Update search after a small delay to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        searchQuery: searchValue
      }));
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchValue, setFilters]);
  
  // Handle role change
  const handleRoleChange = (e) => {
    setFilters({
      ...filters,
      role: e.target.value
    });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 focus:ring-primary-500 focus:border-primary-500" 
            placeholder="Search by name or email" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="w-full md:w-auto">
            <div className="relative">
              <select 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full md:w-48 p-2.5 focus:ring-primary-500 focus:border-primary-500"
                value={filters.role}
                onChange={handleRoleChange}
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center">
            <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>
      </div>
      
      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            Sort by: <span className="font-medium text-gray-700">CTC</span>
          </div>
          <div>
            Role: <span className="font-medium text-gray-700">{filters.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationFilters;