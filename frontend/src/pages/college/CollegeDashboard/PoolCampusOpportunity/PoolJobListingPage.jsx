import React, { useState, useEffect } from 'react';
import JobFilters from '@/components/college/CollegeDashboard/PoolCampusOpportunity/JobFilters';
import JobCard from '@/components/college/CollegeDashboard/PoolCampusOpportunity/JobCard';
// import { jobPostings } from '@/constants/collegedashboard/jobData'; // <--- REMOVE THIS LINE
import { MapPin } from 'lucide-react';
import axios from 'axios'; // Import axios for API calls

const PoolJobListingPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    streams: [],
    minPackage: 0,
    locations: [],
    role: '',
    upcomingDrivesOnly: false,
    tags: [], // Tags can be derived from workMode and employmentType for filtering
  });

  const [allJobs, setAllJobs] = useState([]); // Store all fetched jobs
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalJobs, setTotalJobs] = useState(0);

  // Function to fetch jobs from the backend
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the VITE_Backend_URL from your .env file
      const backendUrl = import.meta.env.VITE_Backend_URL || 'http://localhost:5000';
      const response = await axios.get(`${backendUrl}/api/student-dashboard/getAllPoolCampusJobs`); // Adjust API endpoint as per your routes

      // Map backend data to frontend JobCard expected format
      const mappedJobs = response.data.data.map(backendJob => {
        const companyName = backendJob.companyPosted?.companyDetails?.companyName || 'N/A';
        const description = backendJob.description || backendJob.companyId?.companyDetails?.description || 'No description provided.';
        const logo = backendJob.companyPosted?.profileImageUrl || 'https://via.placeholder.com/48';
        const location = backendJob.location && backendJob.location.length > 0
          ? backendJob.location.join(', ')
          : 'Not specified';
        const minPackage = backendJob.minPackage?.amount ? `₹ ${backendJob.minPackage.amount} ${backendJob.minPackage.currency || 'LPA'}` : 'Not specified';

        return {
          id: backendJob._id,
          companyName: companyName,
          logo: logo,
          isOnsite: backendJob.workMode === 'On-site', // Derive isOnsite from workMode
          venue: backendJob.venue || 'Not specified',
          streams: backendJob.studentStreams && backendJob.studentStreams.length > 0 ? backendJob.studentStreams : ['Not specified'],
          position: backendJob.jobRoles && backendJob.jobRoles.length > 0 ? backendJob.jobRoles.join(', ') : 'Not specified',
          location: location,
          package: minPackage,
          description: description,
          hiringProcess: backendJob.selectionProcess && backendJob.selectionProcess.length > 0 ? backendJob.selectionProcess : ['Not specified'],
          // Add other fields needed for filtering if not directly displayed on card
          jobStatus : backendJob.jobStatus || '',
          workMode: backendJob.workMode,
          employmentType: backendJob.employmentType,
          placementStartDate: backendJob.startDate,
          placementEndDate: backendJob.endDate,
        };
      });
      setAllJobs(mappedJobs);
      setFilteredJobs(mappedJobs); // Initialize filtered jobs with all jobs
      setTotalJobs(mappedJobs.length);
    } catch (err) {
      console.error("Error fetching pool campus jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Apply filters whenever filters or allJobs change
  useEffect(() => {
    let result = allJobs;

    if (filters.search) {
      result = result.filter(job =>
        job.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.position.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.venue.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.streams.length > 0) {
      result = result.filter(job =>
        filters.streams.some(filterStream => job.streams.includes(filterStream))
      );
    }

    if (filters.minPackage > 0) {
      result = result.filter(job => {
        // Parse the package string, extract the number part
        const jobPackageAmount = parseFloat(job.package.replace(/[^0-9.]/g, ''));
        return !isNaN(jobPackageAmount) && jobPackageAmount >= filters.minPackage;
      });
    }

    if (filters.locations.length > 0 && filters.locations[0] !== 'All Locations') {
      result = result.filter(job =>
        filters.locations.some(filterLoc => job.location.includes(filterLoc))
      );
    }

    if (filters.role) {
      result = result.filter(job =>
        job.position.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    if (filters.upcomingDrivesOnly) {
      const now = new Date();
      result = result.filter(job => {
        const startDate = new Date(job.placementStartDate);
        return startDate > now;
      });
    }

    if (filters.tags.length > 0) {
      result = result.filter(job =>
        filters.tags.some(tag => {
          if (tag === 'Remote' || tag === 'On-site' || tag === 'Hybrid') {
            return job.workMode === tag;
          }
          if (tag === 'Full-time' || tag === 'Part-time' || tag === 'Contract') {
            return job.employmentType === tag;
          }
          return false;
        })
      );
    }

    setFilteredJobs(result);
    setTotalJobs(result.length);
  }, [filters, allJobs]); // Re-run filter when filters or allJobs change

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleTagFilter = (tag) => {
    if (filters.tags.includes(tag)) {
      handleFilterChange({ tags: filters.tags.filter(t => t !== tag) });
    } else {
      handleFilterChange({ tags: [...filters.tags, tag] });
    }
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      streams: [],
      minPackage: 0,
      locations: [],
      role: '',
      upcomingDrivesOnly: false,
      tags: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Companies Posting for Pool Campus Placements</h1>
        <p className="text-gray-600 mb-8">
          Explore a wide range of pool campus opportunities from various companies. Apply filters to find the perfect match for your career aspirations.
        </p>

        <div className="flex gap-8">
          {/* Filters Section - Fixed width and position */}
          <div className="w-72 shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 text-sm hover:text-blue-800"
                >
                  Clear all
                </button>
              </div>

              {filters.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {filters.tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span className="mr-1">Tag</span>
                      <span>{tag}</span>
                      <button
                        onClick={() => handleTagFilter(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500 mb-4">Showing {totalJobs} of {allJobs.length} jobs</p>

              <JobFilters
                filters={filters}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Job Listings - Centered with max-width */}
          <div className="flex-1 max-w-5xl mx-auto">
            <div className="flex justify-end mb-6">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Sort by</span>
                <select className="border rounded-md py-1 px-2 text-sm">
                  <option>Relevance</option>
                  <option>Date Posted</option>
                  <option>Package (High to Low)</option>
                  <option>Package (Low to High)</option>
                </select>
              </div>
            </div>

            {loading && (
              <div className="text-center py-12 text-gray-600">Loading jobs...</div>
            )}

            {error && (
              <div className="text-center py-12 text-red-600">Error: {error}</div>
            )}

            {!loading && !error && filteredJobs.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            )}

            {!loading && !error && filteredJobs.length > 0 && (
              <div className="mt-8 text-center">
                <button className="border border-gray-300 px-6 py-2 rounded-md text-gray-700 hover:bg-gray-50">
                  View all
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolJobListingPage;