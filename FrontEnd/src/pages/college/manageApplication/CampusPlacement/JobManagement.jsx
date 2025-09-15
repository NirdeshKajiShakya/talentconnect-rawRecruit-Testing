// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useJobs } from '@/context/College/JobManagement/JobContext';
// import {
//   Search, Eye, Edit, Users, FileText, Trash,
//   ChevronLeft, ChevronRight, Filter
// } from 'lucide-react';
// import { getCollegePostedJobs } from '@/lib/College_AxiosIntance';

// function JobManagementApplication() {
//   const { jobs, loading } = useJobs();
//   const navigate = useNavigate();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeTab, setActiveTab] = useState('All Jobs');
//   const [showFilters, setShowFilters] = useState(false);

//   const itemsPerPage = 5;

//   // Filter jobs based on search query and active tab

//   let filteredJobs;
//   //const filteredJobs = jobs.filter(job => {
//   // const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //                       job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//   //                       job.location.toLowerCase().includes(searchQuery.toLowerCase());

//   //   if (activeTab === 'All Jobs') {
//   //     return matchesSearch;
//   //   } else if (activeTab === 'Published') {
//   //     return matchesSearch && job.status === 'Published';
//   //   } else if (activeTab === 'Drafts') {
//   //     return matchesSearch && job.status === 'Draft';
//   //   }

//   //   return matchesSearch;
//   // });

//   const totalItems = filteredJobs?.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

//   // Current page data
//   const currentJobs = filteredJobs?.slice(startIndex, endIndex);

//   // Pagination controls
//   const handlePrevPage = () => {
//     setCurrentPage(prev => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   };

//   const handlePageClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Action handlers
//   const handleView = (jobId) => {
//     navigate(`/manage-application/campus-placement/${jobId}`);
//   };

//   const handleEdit = (jobId, e) => {
//     e.stopPropagation();
//     console.log(`Edit job with ID: ${jobId}`);
//     // In a real app: navigate to edit page or open edit modal
//   };

//   const handleApplications = (jobId, e) => {
//     e.stopPropagation();
//     console.log(`View applications for job ID: ${jobId}`);
//     // In a real app: navigate to applications page
//   };

//   const handleExport = (jobId, e) => {
//     e.stopPropagation();
//     console.log(`Export job with ID: ${jobId}`);
//     // In a real app: trigger API call to export job data
//   };

//   const handleDelete = (jobId, e) => {
//     e.stopPropagation();
//     console.log(`Delete job with ID: ${jobId}`);
//     // In a real app: show confirmation and delete on confirmation
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <div className="max-w-7xl mx-auto p-4 bg-white">
//         <div className="flex justify-between items-center mt-10 mb-4">
//           <div>
//             <h1 className="text-3xl font-bold">Manage On-Campus Applications</h1>
//             <p className="text-gray-600 mt-2">Track Your Job Listings and Streamline Candidate Applications</p>
//           </div>
//           <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
//             Post a Job
//           </button>
//         </div>

//         <div className="border rounded-md mt-10">
//           {/* Tabs */}
//           <div className="flex border-b">
//             <button
//               className={`px-4 py-2 ${activeTab === 'All Jobs' ? 'border-b-2 border-black font-medium' : ''}`}
//               onClick={() => setActiveTab('All Jobs')}
//             >
//               All Jobs ({jobs?.length})
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === 'Published' ? 'border-b-2 border-black font-medium' : ''}`}
//               onClick={() => setActiveTab('Published')}
//             >
//               Published
//             </button>
//             <button
//               className={`px-4 py-2 ${activeTab === 'Drafts' ? 'border-b-2 border-black font-medium' : ''}`}
//               onClick={() => setActiveTab('Drafts')}
//             >
//               Drafts
//             </button>
//           </div>

//           {/* Search and filters */}
//           <div className="p-4 border-b flex flex-wrap items-center gap-2">
//             <div className="relative flex-grow max-w-sm">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <Search className="w-4 h-4 text-gray-500" />
//               </div>
//               <input
//                 type="text"
//                 className="w-full pl-10 pr-4 py-2 border rounded-md"
//                 placeholder="Search by name or email"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <button
//               className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <Filter className="w-4 h-4" />
//               Filters
//             </button>

//             <div className="ml-auto text-sm text-gray-500">
//               Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs?.length)} of {filteredJobs?.length}
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-white">
//                 <tr className="border-b">
//                   <th className="px-4 py-3 text-left">Job Title</th>
//                   <th className="px-4 py-3 text-left">Status</th>
//                   <th className="px-4 py-3 text-left">Deadline</th>
//                   <th className="px-4 py-3 text-left">Views</th>
//                   <th className="px-4 py-3 text-left">Applications</th>
//                   <th className="px-4 py-3 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading ? (
//                   <tr>
//                     <td colSpan={6} className="text-center py-4">
//                       <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-black border-r-transparent"></div>
//                       <p className="mt-2">Loading jobs...</p>
//                     </td>
//                   </tr>
//                 ) : currentJobs?.length === 0 ? (
//                   <tr>
//                     <td colSpan={6} className="text-center py-4 text-gray-500">
//                       No jobs found matching your criteria.
//                     </td>
//                   </tr>
//                 ) : (
//                   currentJobs?.map(job => (
//                     <tr
//                       key={job.id}
//                       className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
//                       onClick={() => handleView(job.id)}
//                     >
//                       <td className="px-4 py-3">
//                         <div className="font-medium">{job.title}</div>
//                         <div className="text-sm text-gray-500">
//                           {job.type} • {job.location}
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`px-2 py-1 text-xs rounded-full ${job.status === 'Published'
//                           ? 'bg-green-100 text-green-800'
//                           : 'bg-gray-100 text-gray-800'
//                           }`}>
//                           {job.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">{job.deadline}</td>
//                       <td className="px-4 py-3">{job.views}</td>
//                       <td className="px-4 py-3">{job.applications}</td>
//                       <td className="px-4 py-3">
//                         <div className="flex gap-2">
//                           <button onClick={(e) => { e.stopPropagation(); handleView(job.id); }} className="text-gray-500 hover:text-gray-700 transition-colors" title="View Job">
//                             <Eye size={18} />
//                           </button>
//                           <button onClick={(e) => handleEdit(job.id, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="Edit Job">
//                             <Edit size={18} />
//                           </button>
//                           <button onClick={(e) => handleApplications(job.id, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="View Applications">
//                             <Users size={18} />
//                           </button>
//                           <button onClick={(e) => handleExport(job.id, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="Export Job Data">
//                             <FileText size={18} />
//                           </button>
//                           <button onClick={(e) => handleDelete(job.id, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="Delete Job">
//                             <Trash size={18} />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {!loading && filteredJobs?.length > 0 && (
//             <div className="flex items-center justify-between p-4">
//               <button
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//                 className="flex items-center gap-1 px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
//               >
//                 <ChevronLeft size={16} />
//                 Prev
//               </button>

//               <div className="flex gap-2">
//                 {Array?.from({ length: totalPages }, (_, i) => i + 1)?.map(page => (
//                   <button
//                     key={page}
//                     onClick={() => handlePageClick(page)}
//                     className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${currentPage === page
//                       ? 'bg-black text-white'
//                       : 'border hover:bg-gray-50'
//                       }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 className="flex items-center gap-1 px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
//               >
//                 Next
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobManagementApplication;


import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '@/context/College/JobManagement/JobContext';
import {
    Search, Eye, Edit, Users, FileText, Trash,
    ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import { getCollegePostedJobs } from '@/lib/College_AxiosIntance';

function JobManagementApplication() {
    const navigate = useNavigate();
    
    // State management for data, loading, and errors
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for UI controls
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All Jobs');
    const [showFilters, setShowFilters] = useState(false);

    // Fetch jobs from backend when the component mounts
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Fetch 'On-campus' jobs from backend
                const response = await getCollegePostedJobs('On-campus');
                
                console.log("API Response:", response);
                if (response.data && response.data.response && Array.isArray(response.data.response)) {
                setJobs(response.data.response);
                } else {
                    // Handle cases where the response is not as expected
                    console.error('Unexpected API response format:', response);
                    setJobs([]);
                }
            } catch (err) {
                setError("Failed to fetch jobs. Please try again later.");
                console.error("Error fetching jobs:", err);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []); // Empty dependency array means this runs once on mount

    const itemsPerPage = 5;

    // Filter jobs based on search query and active tab
    const filteredJobs = useMemo(() => {
        if (!jobs || !Array.isArray(jobs)) return [];
        
        return jobs.filter(job => {
            // Use degree for search
            const degree = Array.isArray(job.degree) ? job.degree.join(', ') : '';
          //  const type = job.jobType || '';
            const location = Array.isArray(job.location) ? 
                job.location.join(', ') : 
                job.location || '';
            
            const matchesSearch = 
                degree.toLowerCase().includes(searchQuery.toLowerCase()) ||
              //  type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                location.toLowerCase().includes(searchQuery.toLowerCase());

            const status = job.jobStatus || '';
            
            if (activeTab === 'All Jobs') {
                return matchesSearch;
            } else if (activeTab === 'Open') {
                return matchesSearch && status === 'Open';
            } else if (activeTab === 'Pending') {
                return matchesSearch && status === 'Pending';
            } else if (activeTab === 'Closed') {
                return matchesSearch && status === 'Closed';
            }
            return matchesSearch;
        });
    }, [jobs, searchQuery, activeTab]);

    // Calculate counts for tabs
    const openJobsCount = useMemo(() => {
        if (!jobs || !Array.isArray(jobs)) return 0;
        return jobs.filter(job => job.jobStatus === 'Open').length;
    }, [jobs]);

    const pendingJobsCount = useMemo(() => {
        if (!jobs || !Array.isArray(jobs)) return 0;
        return jobs.filter(job => job.jobStatus === 'Pending').length;
    }, [jobs]);

    const closedJobsCount = useMemo(() => {
        if (!jobs || !Array.isArray(jobs)) return 0;
        return jobs.filter(job => job.jobStatus === 'Closed').length;
    }, [jobs]);

    const totalItems = filteredJobs.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleView = (jobId) => {
        navigate(`/manage-application/campus-placement/${jobId}`);
    };

    const handleEdit = (jobId, e) => {
        e.stopPropagation();
        console.log(`Edit job with ID: ${jobId}`);
    };

    const handleApplications = (jobId, e) => {
        e.stopPropagation();
        console.log(`View applications for job ID: ${jobId}`);
    };

    const handleExport = (jobId, e) => {
        e.stopPropagation();
        console.log(`Export job with ID: ${jobId}`);
    };

    const handleDelete = (jobId, e) => {
        e.stopPropagation();
        console.log(`Delete job with ID: ${jobId}`);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
            });
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Invalid Date';
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto p-4 bg-white">
                <div className="flex justify-between items-center mt-10 mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">Manage On-Campus Applications</h1>
                        <p className="text-gray-600 mt-2">Track Your Job Listings and Streamline Candidate Applications</p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                        Post a Job
                    </button>
                </div>

                <div className="border rounded-md mt-10">
                    {/* Tabs */}
                    <div className="flex border-b">
                        <button
                            className={`px-4 py-2 ${activeTab === 'All Jobs' ? 'border-b-2 border-black font-medium' : ''}`}
                            onClick={() => setActiveTab('All Jobs')}
                        >
                            All Jobs ({jobs.length || 0})
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'Open' ? 'border-b-2 border-black font-medium' : ''}`}
                            onClick={() => setActiveTab('Open')}
                        >
                            Open ({openJobsCount})
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'Pending' ? 'border-b-2 border-black font-medium' : ''}`}
                            onClick={() => setActiveTab('Pending')}
                        >
                            Pending ({pendingJobsCount})
                        </button>
                        <button
                            className={`px-4 py-2 ${activeTab === 'Closed' ? 'border-b-2 border-black font-medium' : ''}`}
                            onClick={() => setActiveTab('Closed')}
                        >
                            Closed ({closedJobsCount})
                        </button>
                    </div>

                    {/* Search and filters */}
                    <div className="p-4 border-b flex flex-wrap items-center gap-2">
                        <div className="relative flex-grow max-w-sm">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-4 h-4 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                className="w-full pl-10 pr-4 py-2 border rounded-md"
                                placeholder="Search jobs by degree, type, or location"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button
                            className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>

                        <div className="ml-auto text-sm text-gray-500">
                            {totalItems > 0 ? `Showing ${startIndex + 1}-${endIndex} of ${totalItems}` : 'Showing 0-0 of 0'}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white">
                                <tr className="border-b">
                                    <th className="px-4 py-3 text-left">Degree</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Deadline</th>
                                    <th className="px-4 py-3 text-left">Views</th>
                                    <th className="px-4 py-3 text-left">Applications</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4">
                                            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-black border-r-transparent"></div>
                                            <p className="mt-2">Loading jobs...</p>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                ) : currentJobs.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-gray-500">
                                            No jobs found matching your criteria.
                                        </td>
                                    </tr>
                                ) : (
                                    currentJobs.map(job => {
                                        const jobId = job._id || job.id;
                                        const jobDegree = Array.isArray(job.degree) ? job.degree.join(', ') : 'N/A';
                                    //    const jobType = job.jobType || job.type;
                                        const jobLocation = Array.isArray(job.location) ? 
                                            job.location.join(', ') : 
                                            job.location || 'N/A';
                                        const jobStatus = job.jobStatus || 'Unknown';
                                        const deadline = job.endDate || job.deadline;
                                        const views = job.views || 0;
                                        const applications = job.applicationCount || job.applications || 0;
                                        
                                        return (
                                            <tr
                                                key={jobId}
                                                className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                                                onClick={() => handleView(jobId)}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="font-medium">{jobDegree}</div>
                                                    <div className="text-sm text-gray-500">
                                                          {jobLocation}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${jobStatus === 'Open'
                                                        ? 'bg-green-100 text-green-800'
                                                        : jobStatus === 'Closed'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {jobStatus}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">{formatDate(deadline)}</td>
                                                <td className="px-4 py-3">{views}</td>
                                                <td className="px-4 py-3">{applications}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex gap-2">
                                                        <button onClick={(e) => { e.stopPropagation(); handleView(jobId); }} className="text-gray-500 hover:text-gray-700 transition-colors" title="View Job">
                                                            <Eye size={18} />
                                                        </button>
                                                        <button onClick={(e) => handleEdit(jobId, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="Edit Job">
                                                            <Edit size={18} />
                                                        </button>
                                                        <button onClick={(e) => handleApplications(jobId, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="View Applications">
                                                            <Users size={18} />
                                                        </button>
                                                        <button onClick={(e) => handleExport(jobId, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="Export Job Data">
                                                            <FileText size={18} />
                                                        </button>
                                                        <button onClick={(e) => handleDelete(jobId, e)} className="text-gray-500 hover:text-gray-700 transition-colors" title="Delete Job">
                                                            <Trash size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="flex items-center justify-between p-4">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="flex items-center gap-1 px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                            >
                                <ChevronLeft size={16} />
                                Prev
                            </button>

                            <div className="flex gap-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageClick(page)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-md transition-colors ${currentPage === page
                                            ? 'bg-black text-white'
                                            : 'border hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-1 px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors"
                            >
                                Next
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobManagementApplication;