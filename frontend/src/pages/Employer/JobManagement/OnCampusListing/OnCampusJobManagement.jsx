// import { useState, useEffect } from 'react';
// import { 
//   Search, Eye, Edit, Users, FileText, Trash, 
//   ChevronLeft, ChevronRight, Filter, X
// } from 'lucide-react';
// import EmployerRequestDetail from '../JobListing/CollegeRequestDetail';

// // Sample data - in a real app this would come from an API
// const sampleJobs = [
//   {
//     id: 1,
//     title: "Software Engineer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Published",
//     deadline: "Apr 30, 2025",
//     views: 1234,
//     applications: 89,
//     // Additional data for college detail view
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 2,
//     title: "Product Design Intern",
//     type: "Internship",
//     location: "Mumbai",
//     status: "Draft",
//     deadline: "May 15, 2025",
//     views: 856,
//     applications: 45,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "22 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 3,
//     title: "Software Engineer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Draft",
//     deadline: "Apr 30, 2025",
//     views: 956,
//     applications: 67,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 4,
//     title: "Software Engineer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Published",
//     deadline: "Apr 30, 2025",
//     views: 127,
//     applications: 36,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 5,
//     title: "Software Engineer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Published",
//     deadline: "May 15, 2025",
//     views: 59,
//     applications: 23,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 6,
//     title: "Software Engineer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Draft",
//     deadline: "May 15, 2025",
//     views: 1005,
//     applications: 78,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   // Additional data for pagination demonstration
//   {
//     id: 7,
//     title: "Backend Developer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Published",
//     deadline: "Jun 5, 2025",
//     views: 423,
//     applications: 41,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 8,
//     title: "UI/UX Designer",
//     type: "Contract",
//     location: "Mumbai",
//     status: "Published",
//     deadline: "May 25, 2025",
//     views: 673,
//     applications: 52,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 9,
//     title: "DevOps Engineer",
//     type: "Full-time",
//     location: "Mumbai",
//     status: "Draft",
//     deadline: "Jun 10, 2025",
//     views: 321,
//     applications: 19,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   },
//   {
//     id: 10,
//     title: "Marketing Specialist",
//     type: "Part-time",
//     location: "Mumbai",
//     status: "Published",
//     deadline: "May 30, 2025",
//     views: 512,
//     applications: 63,
//     collegeDetails: {
//       name: "MIT Institute of Technology",
//       rank: 12,
//       location: "Mumbai, Maharashtra",
//       placementRate: 98,
//       highestPackage: 42,
//       averagePackage: 12,
//       eligibleBranches: [
//         "Computer Science Engineering",
//         "Information Technology",
//         "Electronics Engineering"
//       ],
//       studentCount: 250,
//       proposedStartDate: "21 April, 2025",
//       proposedEndDate: "24 April, 2025",
//       documents: [
//         { name: "Company Profile.pdf" },
//         { name: "Job Description.pdf" }
//       ],
//       facilities: [
//         "Computer Lab with Internet (Capacity: 100)",
//         "Interview Rooms (Count: 5)",
//         "Presentation Hall"
//       ]
//     }
//   }
// ];

// export default function EmployerOnCampusJobManagement() {
//   // State variables
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeTab, setActiveTab] = useState('All Jobs');
//   const [showFilters, setShowFilters] = useState(false);
//   const [selectedJob, setSelectedJob] = useState(null);
//   const [showJobDetail, setShowJobDetail] = useState(false);
  
//   const itemsPerPage = 5;
//   const totalItems = jobs.length;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  
//   // Simulate fetching data from an API
//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         // In a real app, this would be a fetch call
//         // const response = await fetch('/api/jobs');
//         // const data = await response.json();
        
//         // Simulating API delay
//         setTimeout(() => {
//           setJobs(sampleJobs);
//           setLoading(false);
//         }, 500);
//       } catch (error) {
//         console.error("Error fetching jobs:", error);
//         setLoading(false);
//       }
//     };

//     fetchJobs();
//   }, []);

//   // Filter jobs based on search query and active tab
//   const filteredJobs = jobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                            job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                            job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
//     if (activeTab === 'All Jobs') {
//       return matchesSearch;
//     } else if (activeTab === 'Published') {
//       return matchesSearch && job.status === 'Published';
//     } else if (activeTab === 'Drafts') {
//       return matchesSearch && job.status === 'Draft';
//     }
    
//     return matchesSearch;
//   });
  
//   // Current page data
//   const currentJobs = filteredJobs.slice(startIndex, endIndex);
  
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
  
//   // Action handlers - these would connect to your backend API
//   const handleView = (jobId) => {
//     const job = jobs.find(j => j.id === jobId);
//     if (job) {
//       setSelectedJob(job);
//       setShowJobDetail(true);
//     }
//   };
  
//   const handleEdit = (jobId) => {
//     console.log(`Edit job with ID: ${jobId}`);
//     // In a real app: navigate to edit page or open edit modal
//   };
  
//   const handleApplications = (jobId) => {
//     console.log(`View applications for job ID: ${jobId}`);
//     // In a real app: navigate to applications page
//   };
  
//   const handleExport = (jobId) => {
//     console.log(`Export job with ID: ${jobId}`);
//     // In a real app: trigger API call to export job data
//   };
  
//   const handleDelete = (jobId) => {
//     console.log(`Delete job with ID: ${jobId}`);
//     // In a real app: show confirmation and delete on confirmation
//   };

//   // College request detail handlers
//   const handleAcceptDrive = (jobId) => {
//     console.log(`Accept drive for job ID: ${jobId}`);
//     // In a real app: call API to update status
//     setShowJobDetail(false);
//   };

//   const handleShortlistDrive = (jobId) => {
//     console.log(`Shortlist drive for job ID: ${jobId}`);
//     // In a real app: call API to update status
//     setShowJobDetail(false);
//   };

//   const handleRejectDrive = (jobId) => {
//     console.log(`Reject drive for job ID: ${jobId}`);
//     // In a real app: call API to update status
//     setShowJobDetail(false);
//   };

//   // If showing job detail, render the detail view
//   if (showJobDetail && selectedJob) {
//     return (
//       <EmployerRequestDetail
//         college={selectedJob.collegeDetails}
//         onClose={() => setShowJobDetail(false)}
//         onAccept={() => handleAcceptDrive(selectedJob.id)}
//         onShortlist={() => handleShortlistDrive(selectedJob.id)}
//         onReject={() => handleRejectDrive(selectedJob.id)}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
//     <div className="max-w-7xl mx-auto p-4 bg-white">
//       <div className="flex justify-between items-center mt-10 mb-4">
//         <div>
//           <h1 className="text-3xl font-bold">Manage On-Campus Applications</h1>
//           <p className="text-gray-600 mt-2">Track Your Job Listings and Streamline Candidate Applications</p>
//         </div>
//         <button className="bg-black text-white px-4 py-2 rounded-md">
//           Post a Job
//         </button>
//       </div>
      
//       <div className="border rounded-md mt-10">
//         {/* Tabs */}
//         <div className="flex border-b">
//           <button 
//             className={`px-4 py-2 ${activeTab === 'All Jobs' ? 'border-b-2 border-black font-medium' : ''}`}
//             onClick={() => setActiveTab('All Jobs')}
//           >
//             All Jobs ({jobs.length})
//           </button>
//           <button 
//             className={`px-4 py-2 ${activeTab === 'Published' ? 'border-b-2 border-black font-medium' : ''}`}
//             onClick={() => setActiveTab('Published')}
//           >
//             Published
//           </button>
//           <button 
//             className={`px-4 py-2 ${activeTab === 'Drafts' ? 'border-b-2 border-black font-medium' : ''}`}
//             onClick={() => setActiveTab('Drafts')}
//           >
//             Drafts
//           </button>
//         </div>
        
//         {/* Search and filters */}
//         <div className="p-4 border-b flex flex-wrap items-center gap-2">
//           <div className="relative flex-grow max-w-sm">
//             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//               <Search className="w-4 h-4 text-gray-500" />
//             </div>
//             <input
//               type="text"
//               className="w-full pl-10 pr-4 py-2 border rounded-md"
//               placeholder="Search by name or email"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
          
//           <button 
//             className="flex items-center gap-2 px-4 py-2 border rounded-md"
//             onClick={() => setShowFilters(!showFilters)}
//           >
//             <Filter className="w-4 h-4" />
//             Filters
//           </button>
          
//           <div className="ml-auto text-sm text-gray-500">
//             Showing {startIndex + 1}-{Math.min(endIndex, filteredJobs.length)} of {filteredJobs.length}
//           </div>
//         </div>
        
//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-white">
//               <tr className="border-b">
//                 <th className="px-4 py-3 text-left">Job Title</th>
//                 <th className="px-4 py-3 text-left">Status</th>
//                 <th className="px-4 py-3 text-left">Deadline</th>
//                 <th className="px-4 py-3 text-left">Views</th>
//                 <th className="px-4 py-3 text-left">Applications</th>
//                 <th className="px-4 py-3 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4">
//                     <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-black border-r-transparent"></div>
//                     <p className="mt-2">Loading jobs...</p>
//                   </td>
//                 </tr>
//               ) : currentJobs.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="text-center py-4 text-gray-500">
//                     No jobs found matching your criteria.
//                   </td>
//                 </tr>
//               ) : (
//                 currentJobs.map(job => (
//                   <tr 
//                     key={job.id} 
//                     className="border-b hover:bg-gray-50 cursor-pointer"
//                     onClick={() => handleView(job.id)}
//                   >
//                     <td className="px-4 py-3">
//                       <div className="font-medium">{job.title}</div>
//                       <div className="text-sm text-gray-500">
//                         {job.type} • {job.location}
//                       </div>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span className={`px-2 py-1 text-xs rounded-full ${
//                         job.status === 'Published' 
//                           ? 'bg-green-100 text-green-800' 
//                           : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {job.status}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">{job.deadline}</td>
//                     <td className="px-4 py-3">{job.views}</td>
//                     <td className="px-4 py-3">{job.applications}</td>
//                     <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
//                       <div className="flex gap-2">
//                         <button onClick={() => handleView(job.id)} className="text-gray-500 hover:text-gray-700" title="View Job">
//                           <Eye size={18} />
//                         </button>
//                         <button onClick={() => handleEdit(job.id)} className="text-gray-500 hover:text-gray-700" title="Edit Job">
//                           <Edit size={18} />
//                         </button>
//                         <button onClick={() => handleApplications(job.id)} className="text-gray-500 hover:text-gray-700" title="View Applications">
//                           <Users size={18} />
//                         </button>
//                         <button onClick={() => handleExport(job.id)} className="text-gray-500 hover:text-gray-700" title="Export Job Data">
//                           <FileText size={18} />
//                         </button>
//                         <button onClick={() => handleDelete(job.id)} className="text-gray-500 hover:text-gray-700" title="Delete Job">
//                           <Trash size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
        
//         {/* Pagination */}
//         <div className="flex items-center justify-between p-4">
//           <button 
//             onClick={handlePrevPage} 
//             disabled={currentPage === 1}
//             className="flex items-center gap-1 px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             <ChevronLeft size={16} />
//             Prev
//           </button>
          
//           <div className="flex gap-2">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//               <button
//                 key={page}
//                 onClick={() => handlePageClick(page)}
//                 className={`w-8 h-8 flex items-center justify-center rounded-md ${
//                   currentPage === page 
//                     ? 'bg-black text-white' 
//                     : 'border hover:bg-gray-50'
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}
//           </div>
          
//           <button 
//             onClick={handleNextPage} 
//             disabled={currentPage === totalPages}
//             className="flex items-center gap-1 px-4 py-2 border rounded-md disabled:opacity-50"
//           >
//             Next
//             <ChevronRight size={16} />
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import CollegeRequestDetail from './CollegeRequestDetail';
import { format, isValid } from 'date-fns';

const API_BASE_URL = import.meta.env.VITE_Backend_URL;

// Helper function to safely format dates
const safeFormatDate = (dateString, formatStr = 'MMM d, yyyy') => {
  if (!dateString) return 'Not Specified';
  const date = new Date(dateString);
  return isValid(date) ? format(date, formatStr) : 'Invalid Date';
};

export default function EmployerOnCampusJobManagement() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [colleges, setColleges] = useState([]);
  const [collegesLoading, setCollegesLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${API_BASE_URL}/api/company/jobmanagement/on-campus-drives`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        }
      );
      const processedJobs = response.data.data?.map(job => ({
        ...job,
        preferredLocations: Array.isArray(job.preferredLocations) ? job.preferredLocations : []
      })) || [];
      setJobs(processedJobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch drives.");
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
        `${API_BASE_URL}/api/company/jobmanagement/on-campus-drives/${jobId}/colleges`,
        {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        }
      );
      setColleges(response.data.data || []);
    } catch (err) {
      console.error("Error fetching colleges:", err);
      setError(err.response?.data?.message || err.message || "Failed to fetch colleges.");
      setColleges([]);
    } finally {
      setCollegesLoading(false);
    }
  };

  const handleUpdateApplicationStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${API_BASE_URL}/api/company/applications/${applicationId}/status`,
        { status },
        {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        }
      );
      if (selectedJob) {
        fetchCollegesForJob(selectedJob._id);
      }
      alert(`Application status updated to: ${status}`);
    } catch (err) {
      console.error("Error updating application status:", err);
      setError(err.response?.data?.message || err.message || "Failed to update status.");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const searchLower = searchQuery.toLowerCase();
    const locationsMatch = Array.isArray(job.preferredLocations)
      ? job.preferredLocations.some(location =>
        location?.toLowerCase().includes(searchLower))
      : false;

    return (
      (job.lookingFor?.toLowerCase().includes(searchLower)) ||
      locationsMatch ||
      (job._id?.toLowerCase().includes(searchLower))
    );
  });

  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + itemsPerPage);

  const handleViewColleges = (job) => {
    if (job.applicationCount === 0) {
      alert("No colleges have applied for this drive yet.");
      return; 
    }
    setSelectedJob(job);
    fetchCollegesForJob(job._id);
  };

  const handleBackToList = () => {
    setSelectedJob(null);
    setColleges([]);
  };

  const displayLocations = (locations) => {
    if (!locations || locations.length === 0) return 'N/A';
    return Array.isArray(locations) ? locations.join(', ') : String(locations);
  };

  if (selectedJob) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <div className="max-w-3xl mx-auto p-4">
          <button
            onClick={handleBackToList}
            className="flex items-center text-gray-600 hover:text-black mb-6"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to drives
          </button>

          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Applications for: {selectedJob.lookingFor || 'N/A'}
            </h2>
            <p className="text-gray-600">
              {displayLocations(selectedJob.preferredLocations)} • {selectedJob.employmentType || 'N/A Type'}
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
            <div className="space-y-6">
              {colleges.map(college => (
                <CollegeRequestDetail
                  key={college.applicationId}
                  collegeApplication={college} // Pass the fully merged college object
                  onAccept={() => handleUpdateApplicationStatus(college.applicationId, 'Accepted')}
                  onShortlist={() => handleUpdateApplicationStatus(college.applicationId, 'Shortlisted')}
                  onReject={() => handleUpdateApplicationStatus(college.applicationId, 'Rejected')}
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
            <h1 className="text-3xl font-bold text-gray-900">Manage On-Campus Drives</h1>
            <p className="text-gray-600 mt-2">Track Your On-Campus Drives and College Applications</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg mt-10 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-grow w-full sm:max-w-sm">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by role or location"
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
                  <th className="px-4 py-3">Looking For</th>
                  <th className="px-4 py-3">Locations</th>
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
                          {job.lookingFor || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {job.employmentType || 'N/A Type'}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {displayLocations(job.preferredLocations)}
                      </td>
                      <td className="px-4 py-4">
                        {(job.endDate)}
                      </td>
                      <td className="px-4 py-4">{job.applicationCount || 0}</td>
                      <td className="px-4 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewColleges(job)}
                            disabled={job.applicationCount === 0}
                            className="text-gray-500 hover:text-blue-600 p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={currentPage === totalPages || totalPages === 0}
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