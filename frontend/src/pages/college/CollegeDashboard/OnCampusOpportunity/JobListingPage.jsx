import React, { useState, useEffect } from 'react';
import { jobs } from '@/constants/collegedashboard/jobs';
import { initialFilterCategories } from '@/constants/collegedashboard/filter';
import JobCard from '@/components/college/CollegeDashboard/OnCampusOpprtunity/JobCard';
import FilterSection from '@/components/college/CollegeDashboard/FilterSection';
import { getCompanyPostingForOncampus } from '@/lib/College_AxiosIntance';
//import Header from '../components/Header';

const JobsListingPage = () => {
  const [tempJobs, setTempJobs] = useState();
  const [filteredJobs, setFilteredJobs] = useState();
  const [filterCategories, setFilterCategories] = useState(initialFilterCategories);
  const [activeFilters, setActiveFilters] = useState([]);
  const [sortBy, setSortBy] = useState('newest');

  const fetchAllJobs = async () => {
    try {
      const response = await getCompanyPostingForOncampus();
      setTempJobs(response.data.data);
      // console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    fetchAllJobs();
  }, []);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategories]);

  const handleFilterChange = (categoryId, filterId, checked) => {
    const updatedCategories = filterCategories?.map(category => {
      if (category._id === categoryId) {
        const updatedFilters = category?.filters?.map(filter => {
          if (filter._id === filterId) {
            return { ...filter, checked };
          }
          return filter;
        });
        return { ...category, filters: updatedFilters };
      }
      return category;
    });

    setFilterCategories(updatedCategories);

    const category = updatedCategories.find(c => c._id === categoryId);
    if (category) {
      const filter = category.filters.find(f => f._id === filterId);
      if (filter) {
        if (checked) {
          setActiveFilters([...activeFilters, { category: categoryId, value: filter.label }]);
        } else {
          setActiveFilters(activeFilters.filter(af =>
            !(af.category === categoryId && af.value === filter.label)
          ));
        }
      }
    }
  };

  const handleClearFilters = (categoryId) => {
    if (categoryId) {
      const updatedCategories = filterCategories.map(category => {
        if (category._id === categoryId) {
          const updatedFilters = category.filters.map(filter => ({
            ...filter,
            checked: false,
          }));
          return { ...category, filters: updatedFilters };
        }
        return category;
      });
      setFilterCategories(updatedCategories);
      setActiveFilters(activeFilters.filter(af => af.category !== categoryId));
    } else {
      const updatedCategories = filterCategories.map(category => ({
        ...category,
        filters: category.filters.map(filter => ({
          ...filter,
          checked: false,
        })),
      }));
      setFilterCategories(updatedCategories);
      setActiveFilters([]);
    }
  };

  const applyFilters = () => {
    let results = [...jobs];

    const activeFiltersMap = {};
    activeFilters.forEach(af => {
      if (!activeFiltersMap[af.category]) {
        activeFiltersMap[af.category] = [];
      }
      activeFiltersMap[af.category].push(af.value);
    });

    if (activeFilters?.length === 0) {
      setFilteredJobs(results);
      return;
    }

    Object.entries(activeFiltersMap).forEach(([category, values]) => {
      if (category === 'workMode') {
        results = results.filter(job =>
          values.some(v => job.workMode === v.replace(/Work from |/, '') ||
            (v === 'Remote' && job.workMode === 'Remote'))
        );
      } else if (category === 'degree') {
        results = results.filter(job =>
          values.some(v => job.degree.toLowerCase().includes(v.toLowerCase()) ||
            job.eligibility.degrees.some(d => d.toLowerCase().includes(v.toLowerCase())))
        );
      } else if (category === 'courses') {
        results = results.filter(job =>
          values.some(v => job.programDetails.eligibleDegrees.some(d =>
            d.toLowerCase().includes(v.toLowerCase())))
        );
      }
    });

    setFilteredJobs(results);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    let sortedJobs = [...filteredJobs];

    switch (sortValue) {
      case 'newest':
        sortedJobs.sort((a, b) => Number(b._id) - Number(a._id));
        break;
      case 'oldest':
        sortedJobs.sort((a, b) => Number(a._id) - Number(b._id));
        break;
      case 'companyAZ':
        sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case 'companyZA':
        sortedJobs.sort((a, b) => b.company.localeCompare(a.company));
        break;
      default:
        break;
    }

    setFilteredJobs(sortedJobs);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Header /> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Companies Posting for On-Campus Jobs</h1>
          <p className="mt-2 text-gray-600">Find the perfect opportunity to kickstart your career with leading companies.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 flex-shrink-0">
            <FilterSection
              filterCategories={filterCategories}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </aside>

          <div className="flex-grow">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                {activeFilters?.map((filter, index) => (
                  <div key={index} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full py-1 px-3 text-sm">
                    <span className="mr-1">{filter.value}</span>
                    <button
                      onClick={() => {
                        const category = filterCategories.find(c => c._id === filter.category);
                        if (category) {
                          const filterItem = category.filters.find(f => f.label === filter.value);
                          if (filterItem) {
                            handleFilterChange(category._id, filterItem._id, false);
                          }
                        }
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center">
                <label htmlFor="sort" className="mr-2 text-sm text-gray-700">Sort by</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="companyAZ">Company (A-Z)</option>
                  <option value="companyZA">Company (Z-A)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tempJobs?.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>

            {filteredJobs?.length === 0 && (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No matches found</h3>
                <p className="mt-1 text-gray-500">Try adjusting your filters to find more opportunities.</p>
                <button
                  onClick={() => handleClearFilters()}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {filteredJobs?.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white rounded-md font-medium text-gray-700 hover:bg-gray-50">
                  View all
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsListingPage;
