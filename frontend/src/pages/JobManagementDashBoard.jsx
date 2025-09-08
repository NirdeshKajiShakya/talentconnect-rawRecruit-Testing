import { useState } from 'react';
import { Search, ChevronRight, ChevronLeft, Filter } from 'lucide-react';

export default function JobManagementDashboard() {
  const [activeTab, setActiveTab] = useState('All Jobs');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState([]);
  
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: 'Atm Operator',
      name: 'Mathew',
      totalApplications: 21,
      shortlistedCandidates: 0,
      postedBy: 'Me',
      date: '18 Feb 2023'
    }
  ];

  const tabs = ['All Jobs(1)', 'Drafts'];
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleJobSelection = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleClearAll = () => {
    document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
    setSelectedJobs([]);
  };

  const handleClearFilter = (filterType) => {
    // Implementation for clearing specific filters
    console.log(`Clearing ${filterType} filter`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Posts & Applications</h1>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
          Post a Job
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mb-6">
        Track Your Job Listings and Streamline Candidate Applications
      </div>
      
      <div className="flex gap-6">
        {/* Left sidebar filters */}
        <div className="w-64">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">Filters</h2>
              <button onClick={handleClearAll} className="text-blue-600 text-sm">Clear all</button>
            </div>
            <div className="text-sm text-gray-500 mb-4">Showing 1 of 100</div>
            <div className="border-t border-gray-200 my-2"></div>
          </div>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search for Job" 
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
            />
          </div>
          
          {/* Job status filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Job status</h3>
              <button onClick={() => handleClearFilter('status')} className="text-blue-600 text-sm">Clear</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="active-jobs" className="mr-2" />
                <label htmlFor="active-jobs">Active Jobs</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="closed-jobs" className="mr-2" />
                <label htmlFor="closed-jobs">Closed Jobs</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="expired-jobs" className="mr-2" />
                <label htmlFor="expired-jobs">Expired Jobs</label>
              </div>
            </div>
          </div>
          
          {/* Job status filter (repeated in UI) */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Job status</h3>
              <button onClick={() => handleClearFilter('status')} className="text-blue-600 text-sm">Clear</button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="active-jobs-2" className="mr-2" />
                <label htmlFor="active-jobs-2">Active Jobs</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="closed-jobs-2" className="mr-2" />
                <label htmlFor="closed-jobs-2">Closed Jobs</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="expired-jobs-2" className="mr-2" />
                <label htmlFor="expired-jobs-2">Expired Jobs</label>
              </div>
            </div>
          </div>
          
          {/* Job posted by filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">Job posted by</h3>
              <button onClick={() => handleClearFilter('postedBy')} className="text-blue-600 text-sm">Clear</button>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by username" 
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="me" className="mr-2" />
                <label htmlFor="me">Me</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="user2" className="mr-2" />
                <label htmlFor="user2">User2</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="user3" className="mr-2" />
                <label htmlFor="user3">User3</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="user4" className="mr-2" />
                <label htmlFor="user4">User4</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="user5" className="mr-2" />
                <label htmlFor="user5">User5</label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="border border-gray-200 rounded mb-6">
            <div className="flex border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={tab}
                  className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* Search and filter area */}
            <div className="p-4 flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name or email" 
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center border border-gray-300 px-3 py-1 rounded">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </button>
                <span className="text-sm text-gray-500">Showing 1-1 of 100</span>
              </div>
            </div>
            
            {/* Jobs table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="w-10 p-4"></th>
                    <th className="text-left p-4">Title</th>
                    <th className="text-center p-4">Total Applications</th>
                    <th className="text-center p-4">Shortlisted Candidates</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job.id} className="border-b border-gray-200">
                      <td className="p-4">
                        <input 
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleJobSelection(job.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-bold">{job.title}</div>
                        <div className="text-gray-500">{job.name}</div>
                      </td>
                      <td className="text-center p-4">{job.totalApplications}</td>
                      <td className="text-center p-4">{job.shortlistedCandidates}</td>
                      <td className="text-center p-4">
                        <button className="border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
              <button 
                className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </button>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(page => (
                  <button
                    key={page}
                    className={`w-8 h-8 rounded ${currentPage === page ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button 
                className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-100"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
          
          {/* Duplicate table for demo purposes as shown in the image */}
          {/* <div className="border border-gray-200 rounded">
            <div className="flex border-b border-gray-200">
              {tabs.map(tab => (
                <button
                  key={`second-${tab}`}
                  className={`px-4 py-2 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="p-4 flex justify-between items-center">
              <div className="relative w-64">
                <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name or email" 
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center gap-4">
                <button className="flex items-center border border-gray-300 px-3 py-1 rounded">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </button>
                <span className="text-sm text-gray-500">Showing 1-1 of 100</span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="w-10 p-4"></th>
                    <th className="text-left p-4">Title</th>
                    <th className="text-center p-4">Total Applications</th>
                    <th className="text-center p-4">Shortlisted Candidates</th>
                    <th className="text-right p-4">Posted by / Date</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={`second-${job.id}`} className="border-b border-gray-200">
                      <td className="p-4">
                        <input 
                          type="checkbox"
                          checked={selectedJobs.includes(job.id)}
                          onChange={() => handleJobSelection(job.id)}
                        />
                      </td>
                      <td className="p-4">
                        <div className="font-bold">{job.title}</div>
                        <div className="text-gray-500">{job.name}</div>
                      </td>
                      <td className="text-center p-4">{job.totalApplications}</td>
                      <td className="text-center p-4">{job.shortlistedCandidates}</td>
                      <td className="text-right p-4">
                        <div>Posted by: {job.postedBy}</div>
                        <div className="text-gray-500">{job.date}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center p-4">
              <button className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </button>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(page => (
                  <button
                    key={`second-page-${page}`}
                    className={`w-8 h-8 rounded ${currentPage === page ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="flex items-center border border-gray-300 rounded px-3 py-1 hover:bg-gray-100">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}