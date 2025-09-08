import { useState } from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  const [isSaved, setIsSaved] = useState(job.isSaved || false);

  const toggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
   
  };
  let statusClasses = '';
  switch (job.jobStatus) {
    case 'Open':
      statusClasses = 'bg-green-100 text-green-800';
      break;
    case 'Closed':
      statusClasses = 'bg-red-100 text-red-800';
      break;
    case 'Pending':
      statusClasses = 'bg-yellow-100 text-yellow-800'; // Using yellow for pending status
      break;
    default:
      statusClasses = 'bg-gray-100 text-gray-800'; // 
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
    
      <div className="absolute top-4 right-4 flex items-center space-x-2">
       
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses}`}>
          {job.jobStatus}
        </div>
      
        <button
          onClick={toggleSave}
          className="text-gray-400 hover:text-blue-500 focus:outline-none"
          aria-label={isSaved ? "Unsave job" : "Save job"}
        >
          {isSaved ? (
           
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          ) : (
          
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-5">
        <div className="flex flex-col mb-2">
          {/* Link to job details page */}
          <Link to={`/${localStorage.getItem('selectedRole')}-dashboard/job-listing/${job._id}`} className="block ">
            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors mb-1">
              {job.jobTitle}
            </h3>
           
            <p className="text-sm text-gray-600">{job.companyPosted?.companyName}</p>
          </Link>
        </div>

      
        <div className="flex flex-wrap text-sm text-gray-600 mb-2">
         
          <span className="mr-3 capitalize">{Array.isArray(job.location) ? job.location.join(', ') : job.location}</span>
          <span className="mr-3">•</span>
          <span className="mr-3 capitalize">{job.employmentType}</span>
          <span className="mr-3">•</span>
          <span className='capitalize'>{job.workMode}</span>
        </div>
       
        <p className="text-gray-700 mb-4 line-clamp-3">
          {job.description?.slice(0, 150)}{job.description && job.description.length > 150 ? '...' : ''}
        </p>

        {/* Apply now button */}
        <Link
          to={`/${localStorage.getItem('selectedRole')}-dashboard/job-listing/${job._id}`}
          className="block w-full py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
        >
          Apply now
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
