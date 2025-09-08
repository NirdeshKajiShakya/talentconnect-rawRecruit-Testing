import React, { useState, useEffect, useCallback } from 'react';
import { initialFilterCategories } from '@/constants/collegedashboard/filter';
import JobCard from '@/components/college/CollegeDashboard/IntershipOpportunity/JobCard';
import FilterSection from '@/components/college/CollegeDashboard/FilterSection';
import { getAllInternship } from '@/lib/User_AxiosInstance';

const InternJobsListingPage = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filterCategories, setFilterCategories] = useState(initialFilterCategories);
    const [activeFilters, setActiveFilters] = useState([]);
    const [sortBy, setSortBy] = useState('newest');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const applyFilters = useCallback(() => {
        let results = [...allJobs];

        const activeFiltersMap = {};
        activeFilters.forEach(af => {
            if (!activeFiltersMap[af.category]) {
                activeFiltersMap[af.category] = [];
            }
            activeFiltersMap[af.category].push(af.value);
        });

        Object.entries(activeFiltersMap).forEach(([category, values]) => {
            if (values.length > 0) {
                results = results.filter(job => {
                    if (category === 'workMode') {
                        return values.some(filterValue =>
                            job.workMode?.toLowerCase() === filterValue.toLowerCase().replace('work from ', '')
                        );
                    } else if (category === 'degree') {
                        return values.some(filterValue =>
                            (job.degree || []).some(jobDegree =>
                                jobDegree.toLowerCase().includes(filterValue.toLowerCase())
                            )
                        );
                    } else if (category === 'courses') {
                        return values.some(filterValue =>
                            (job.studentStreams || []).some(studentStream =>
                                studentStream.toLowerCase().includes(filterValue.toLowerCase())
                            )
                        );
                    } else if (category === 'employmentType') {
                        return values.some(filterValue =>
                            job.employmentType?.toLowerCase() === filterValue.toLowerCase()
                        );
                    }
                    return true;
                });
            }
        });

        let sortedResults = [...results];
        switch (sortBy) {
            case 'newest':
                sortedResults.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                sortedResults.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'companyAZ':
                sortedResults.sort((a, b) => {
                    const companyA = a.companyPosted?.companyDetails?.companyName || '';
                    const companyB = b.companyPosted?.companyDetails?.companyName || '';
                    return companyA.localeCompare(companyB);
                });
                break;
            case 'companyZA':
                sortedResults.sort((a, b) => {
                    const companyA = a.companyPosted?.companyDetails?.companyName || '';
                    const companyB = b.companyPosted?.companyDetails?.companyName || '';
                    return companyB.localeCompare(companyA);
                });
                break;
            default:
                break;
        }

        setFilteredJobs(sortedResults);
    }, [allJobs, activeFilters, sortBy]);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getAllInternship();
                const postings = response.data.data;
                
                if (Array.isArray(postings)) {
                    setAllJobs(postings);
                    setFilteredJobs(postings);
                } else {
                    console.error("Invalid data format received from API:", postings);
                    setAllJobs([]);
                    setFilteredJobs([]);
                }

            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Failed to fetch internship listings. Please try again later.");
                setAllJobs([]);
                setFilteredJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [activeFilters, sortBy, applyFilters]);

    const handleFilterChange = (categoryId, filterId, checked) => {
        const updatedCategories = filterCategories.map(category => {
            if (category.id === categoryId) {
                const updatedFilters = category.filters.map(filter => {
                    if (filter.id === filterId) {
                        return { ...filter, checked };
                    }
                    return filter;
                });
                return { ...category, filters: updatedFilters };
            }
            return category;
        });

        setFilterCategories(updatedCategories);

        const category = updatedCategories.find(c => c.id === categoryId);
        if (category) {
            const filter = category.filters.find(f => f.id === filterId);
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
                if (category.id === categoryId) {
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

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortBy(sortValue);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-gray-600">Loading internships...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Internship Opportunities</h1>
                    <p className="mt-2 text-gray-600">Explore and apply for internships to gain valuable industry experience.</p>
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
                                {activeFilters.length > 0 && activeFilters.map((filter, index) => (
                                    <div key={index} className="inline-flex items-center bg-blue-50 text-blue-700 rounded-full py-1 px-3 text-sm">
                                        <span className="mr-1">{filter.value}</span>
                                        <button
                                            onClick={() => {
                                                const category = filterCategories.find(c => c.id === filter.category);
                                                if (category) {
                                                    const filterItem = category.filters.find(f => f.label === filter.value);
                                                    if (filterItem) {
                                                        handleFilterChange(category.id, filterItem.id, false);
                                                    }
                                                }
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                            aria-label={`Remove filter: ${filter.value}`}
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
                            {filteredJobs.length > 0 ? (
                                filteredJobs.map(job => (
                                    <JobCard
                                        key={job._id}
                                        job={{
                                            id: job._id,
                                            logo: job.companyPosted?.profileImageUrl || 'https://via.placeholder.com/150',
                                            company: job.companyPosted?.companyDetails?.companyName || 'N/A',
                                            jobTitle: job.jobTitle || 'N/A',
                                            companyName: job.companyPosted?.companyDetails?.companyName || 'N/A',
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-12 col-span-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="mt-2 text-lg font-medium text-gray-900">No internships found</h3>
                                    <p className="mt-1 text-gray-500">There are no internships matching your criteria at the moment.</p>
                                    <button
                                        onClick={() => handleClearFilters()}
                                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </div>

                        {filteredJobs.length > 0 && (
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

export default InternJobsListingPage;