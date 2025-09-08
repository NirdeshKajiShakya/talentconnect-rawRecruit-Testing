import { useState } from 'react';
import CandidateCard from './CandidateCard';

function ApplicationStatus({ candidates, filters, updateFilters, shortlistCandidate, onBackToSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleFilterChange = (e) => {
    const { name, type, checked, value } = e.target;
    
    if (type === 'checkbox') {
      if (name.startsWith('jobStatus.')) {
        const statusKey = name.split('.')[1];
        updateFilters({
          jobStatus: {
            ...filters.jobStatus,
            [statusKey]: checked
          }
        });
      } else if (name.startsWith('postedBy.')) {
        const userKey = name.split('.')[1];
        updateFilters({
          postedBy: {
            ...filters.postedBy,
            [userKey]: checked
          }
        });
      }
    } else {
      updateFilters({ [name]: value });
    }
  };

  const clearFilter = (filterType) => {
    if (filterType === 'jobStatus') {
      updateFilters({
        jobStatus: {
          active: false,
          expired: false,
        }
      });
    } else if (filterType === 'postedBy') {
      updateFilters({
        postedBy: {
          me: false,
          user2: false,
          user3: false,
          user4: false,
          user5: false,
        }
      });
    }
  };

  const clearAllFilters = () => {
    updateFilters({
      search: '',
      jobStatus: {
        active: false,
        expired: false,
      },
      postedBy: {
        me: false,
        user2: false,
        user3: false,
        user4: false,
        user5: false,
      }
    });
    setSearchQuery('');
  };

  const filteredCandidates = candidates.filter(candidate => {
    // Apply search filter
    if (searchQuery && !candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Apply job status filters
    if (filters.jobStatus.active && candidate.status !== 'active') {
      return false;
    }
    if (filters.jobStatus.expired && candidate.status !== 'expired') {
      return false;
    }
    
    // Apply posted by filters
    const postedByFilters = Object.entries(filters.postedBy).filter(([_, value]) => value);
    if (postedByFilters.length > 0) {
      const postedByKeys = postedByFilters.map(([key]) => key);
      if (!postedByKeys.includes(candidate.postedBy)) {
        return false;
      }
    }
    
    return true;
  });

  // Sort candidates
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.appliedDate) - new Date(a.appliedDate);
    } else if (sortBy === 'oldest') {
      return new Date(a.appliedDate) - new Date(b.appliedDate);
    } else if (sortBy === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'nameDesc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center border-b border-teal-700 py-4 mb-6">
        <h1 className="text-xl font-semibold">Application Status</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="py-1 px-3 pl-8 border border-gray-300 rounded text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="absolute left-2 top-2 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-sm">Sort by:</span>
            <select 
              className="py-1 px-2 border border-gray-300 rounded text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="nameAsc">Name (A-Z)</option>
              <option value="nameDesc">Name (Z-A)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">Filters</h2>
              <button 
                onClick={clearAllFilters}
                className="text-sm text-teal-600 hover:text-teal-800"
              >
                Clear all
              </button>
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Showing {sortedCandidates.length} of {candidates.length}
            </div>
            
            <div className="space-y-6">
              <div className="border-t pt-4">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-medium text-sm">Job status</h3>
                  <button 
                    onClick={() => clearFilter('jobStatus')}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="jobStatus.active" 
                      checked={filters.jobStatus.active}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Active Jobs</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="jobStatus.expired" 
                      checked={filters.jobStatus.expired}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Expired Jobs</span>
                  </label>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="mb-2 flex justify-between items-center">
                  <h3 className="font-medium text-sm">Job posted by</h3>
                  <button 
                    onClick={() => clearFilter('postedBy')}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                </div>
                <div className="relative mb-3">
                  <input
                    type="text"
                    placeholder="Search by username"
                    className="w-full py-1 px-3 pl-7 border border-gray-300 rounded text-sm"
                  />
                  <svg className="absolute left-2 top-1.5 text-gray-400 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="postedBy.me" 
                      checked={filters.postedBy.me}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Me</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="postedBy.user2" 
                      checked={filters.postedBy.user2}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">User2</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      name="postedBy.user3" 
                      checked={filters.postedBy.user3}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">User3</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="postedBy.user4" 
                      checked={filters.postedBy.user4}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">User4</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="postedBy.user5" 
                      checked={filters.postedBy.user5}
                      onChange={handleFilterChange}
                      className="mr-2"
                    />
                    <span className="text-sm">User5</span>
                  </label>
                </div>
              </div>
            </div>
            
            <button
              onClick={onBackToSearch}
              className="mt-6 w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700"
            >
              Back to Search
            </button>
          </div>
        </div>
        
        {/* Candidates list */}
        <div className="md:w-3/4">
          {sortedCandidates.length === 0 ? (
            <div className="bg-white p-8 rounded shadow text-center">
              <p className="text-gray-500">No candidates found matching your filters.</p>
              <button
                onClick={clearAllFilters}
                className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedCandidates.map(candidate => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  onShortlist={() => shortlistCandidate(candidate.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApplicationStatus;