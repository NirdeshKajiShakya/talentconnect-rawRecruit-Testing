import { useState, useEffect, useMemo } from 'react';
import { useApplications } from '@/context/College/Registered/ApplicationContext';
import ApplicationCard from '@/components/college/Registered/Intership/Application';
import Pagination from '@/components/college/Registered/Pagination';
import Loader from '@/components/college/Registered/Loader';

const InternApplicationsPage = () => {
  const {
    loading,
    error,
    filters,
    setFilters,
    getCurrentApplications,
    getTotalPages,
    currentPage,
    setCurrentPage,
    filteredApplications,
    applications
  } = useApplications();

  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState('ctc-high');

  // Memoize unique roles
  const roles = useMemo(() => ['All Roles', ...new Set(applications.map(app => app.position))], [applications]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        searchQuery: searchValue
      }));
    }, 300);

    return () => clearTimeout(handler);
  }, [searchValue, setFilters]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setFilters(prev => ({
      ...prev,
      role: selectedRole
    }));
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sortField = 'ctc';
    let sortDirection = 'desc';

    if (value === 'ctc-high') {
      sortField = 'ctc';
      sortDirection = 'desc';
    } else if (value === 'ctc-low') {
      sortField = 'ctc';
      sortDirection = 'asc';
    } else if (value === 'newest') {
      sortField = 'appliedDate';
      sortDirection = 'desc';
    } else if (value === 'oldest') {
      sortField = 'appliedDate';
      sortDirection = 'asc';
    }

    setFilters(prev => ({
      ...prev,
      sortField,
      sortDirection
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-md p-6 text-center bg-white rounded-lg shadow-sm">
          <p className="text-danger-600 font-medium">Error loading applications: {error}</p>
        </div>
      </div>
    );
  }

  const startIndex = filteredApplications.length === 0 ? 0 : (currentPage - 1) * 6 + 1;
  const endIndex = Math.min(currentPage * 6, filteredApplications.length);

  return (
    <div className='min-h-screen bg-white'>
      <div className="animate-fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Applications</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage and review all candidate applications in one centralized dashboard
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="search"
                className="w-full pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search by company, position or candidate name"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>

            {/* Role */}
            <div className="w-full md:w-48">
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                value={filters.role || 'All Roles'}
                onChange={handleRoleChange}
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="w-full md:w-48">
              <select
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-primary-500 focus:border-primary-500"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="ctc-high">Highest CTC First</option>
                <option value="ctc-low">Lowest CTC First</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="mb-6 px-2">
          <p className="text-sm font-medium text-gray-500">
            Showing <span className="text-gray-700">{startIndex}-{endIndex}</span> of <span className="text-gray-700">{filteredApplications.length}</span> applications
          </p>
        </div>

        {/* Cards */}
        <div className="mb-12">
          {getCurrentApplications().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentApplications().map(application => (
                // <ApplicationCard
                //   key={application.id}
                //   application={application}
                //   className="transition-all hover:shadow-md hover:-translate-y-1"
                // />
                <span></span>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
              <p className="mt-1 text-gray-500">
                {searchValue || filters.role !== 'All Roles' ?
                  "Try adjusting your search or filter criteria" :
                  "There are currently no applications available"
                }
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {getTotalPages() > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={getTotalPages()}
              onPageChange={setCurrentPage}
              className="shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InternApplicationsPage;