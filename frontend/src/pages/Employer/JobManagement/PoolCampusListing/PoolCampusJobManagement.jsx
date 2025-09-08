
import { useState, useEffect } from 'react';
import { Search, Eye, Edit, Users, FileText, Trash, ChevronLeft, ChevronRight, Filter, X } from 'lucide-react';
import axios from 'axios';
import CollegeApplicationDetailView from './collegeApplicationListItem'; // Import the new component

const API_BASE_URL = import.meta.env.VITE_Backend_URL;

export default function  EmployerPoolCampusJobManagement() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [colleges, setColleges] = useState([]); // This array will hold the colleges applied for the selected job
  const [collegesLoading, setCollegesLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/api/company/jobmanagement/pool-campus-drives`,
        {
          headers: {
              'Authorization': `Bearer ${token}`
            },
          withCredentials: true
        }
      );
      setJobs(response.data.data || []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch jobs.");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollegesForJob = async (jobId) => {
    setCollegesLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/api/company/jobmanagement/pool-campus-drives/${jobId}/colleges`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        }
      );
      setColleges(response.data.data || []); // This assumes response.data.data is an array of college application objects
      setSelectedJob(jobs.find(j => j._id === jobId));
    } catch (err) {
      console.error("Error fetching colleges:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch colleges.");
      setColleges([]);
    } finally {
      setCollegesLoading(false);
    }
  };

  // Dummy action handlers for CollegeApplicationDetailView
  const handleAcceptCollege = (applicationId) => {
    console.log("Accepting college application:", applicationId);
    // In a real app, send API request to update status
    // Then re-fetch colleges or update state
  };

  const handleShortlistCollege = (applicationId) => {
    console.log("Shortlisting college application:", applicationId);
    // In a real app, send API request
  };

  const handleRejectCollege = (applicationId) => {
    console.log("Rejecting college application:", applicationId);
    // In a real app, send API request
  };


  useEffect(() => { fetchJobs(); }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.jobRoles?.some(role =>
      role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.employmentType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.workLocations?.some(location =>
        location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job._id.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleViewColleges = (jobId) => {
    fetchCollegesForJob(jobId);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
    setColleges([]); // Clear colleges when going back
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-3xl mx-auto p-4"> {/* Adjusted max-w and added padding for a single column view of details */}
          <button
            onClick={handleBackToList}
            className="flex items-center text-gray-600 hover:text-black mb-6"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to drives
          </button>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Applications for: {selectedJob.jobRoles?.join(', ') || 'N/A Job Role'}
            </h2>
            <p className="text-gray-600">
              {selectedJob.workLocations?.join(', ') || 'N/A Location'} • {selectedJob.employmentType || 'N/A Type'}
            </p>
          </div>

          {collegesLoading ? (
            <div className="p-8 text-center bg-white rounded-lg shadow-sm">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
              <p className="mt-4 text-gray-600">Loading college applications...</p>
            </div>
          ) : error ? (
            <div className="p-4 text-red-700 bg-red-100 border border-red-200 rounded-md m-4">
              Error: {error}
            </div>
          ) : colleges.length === 0 ? (
            <div className="p-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
              No colleges have applied for this drive yet.
            </div>
          ) : (
            <div className="space-y-6"> {/* Use space-y to separate multiple detail cards */}
              {colleges.map(collegeApplication => (
                <CollegeApplicationDetailView
                  key={collegeApplication.applicationId}
                  collegeApplication={collegeApplication}
                  onAccept={handleAcceptCollege}
                  onShortlist={handleShortlistCollege}
                  onReject={handleRejectCollege}
                  // onClose is not passed here as these are list items, not a single modal
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-7xl mx-auto p-4 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-10 mb-4 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Pool Campus Drives</h1>
            <p className="text-gray-600 mt-2">Track Your Pool Campus Drives and College Applications</p>
          </div>
          <button className="bg-black text-white px-6 py-3 rounded-md shadow-md hover:bg-gray-800 transition-colors duration-200">
            Post a New Drive
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg mt-10 overflow-hidden">
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'All Jobs' ? 'border-b-2 border-black text-black' : 'text-gray-600 hover:text-gray-800'}`}
              onClick={() => setActiveTab('All Jobs')}
            >
              All Drives ({jobs.length})
            </button>
          </div>

          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-grow w-full sm:max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by job role or location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="p-4 text-red-700 bg-red-100 border border-red-200 rounded-md m-4">
              Error: {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3">Drive Title / Roles</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">End Date</th>
                  <th className="px-4 py-3">Applications</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8">
                      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"></div>
                      <p className="mt-4 text-gray-600">Loading drives...</p>
                    </td>
                  </tr>
                ) : currentJobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-500">
                      No drives found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  currentJobs.map(job => (
                    <tr key={job._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="font-medium text-gray-900">
                          {job.jobRoles?.join(', ') || 'N/A Job Role'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.employmentType || 'N/A Type'} • {job.workLocations?.join(', ') || 'N/A Location'}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {job.placementEndDate ? new Date(job.placementEndDate).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-4 py-4">{job.applicationCount || 0}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewColleges(job._id)}
                            className="text-gray-500 hover:text-blue-600 p-1 rounded-md hover:bg-gray-200"
                            title="View College Applications"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium ${
                    currentPage === page ? 'bg-black text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}