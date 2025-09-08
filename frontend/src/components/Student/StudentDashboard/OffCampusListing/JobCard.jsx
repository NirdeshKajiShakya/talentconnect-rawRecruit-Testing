
import { useState } from 'react';

function JobCard({ job, onClick }) {
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
      statusClasses = 'bg-yellow-100 text-yellow-800';
      break;
    default:
      statusClasses = 'bg-gray-100 text-gray-800';
  }

  return (
    <div className="border border-gray-300 rounded bg-white p-4 flex flex-col h-full relative" onClick={() => onClick(job._id)}>
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

      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-200 mr-3 flex items-center justify-center rounded-full overflow-hidden">
          {job.companyPosted?.companyDetails?.profileImage ? (
            <img
              src={job.companyPosted.companyDetails.profileImage}
              alt={job.companyPosted.companyDetails.companyName || "Company Logo"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/40x40/cccccc/000000?text=Logo';
              }}
            />
          ) : (
            <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <div>
          <h3 className="font-semibold">{job.companyPosted?.companyDetails?.companyName || "No Company Name"}</h3>
          {job.workMode && <span className="text-xs bg-gray-100 px-2 py-1 rounded">{job.workMode}</span>}
        </div>
      </div>

      {job.studentStreams && job.studentStreams.length > 0 && (
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-1 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347m6.718-5.077l-.825.825A9.016 9.016 0 0110.25 20.25H4.875a2.625 2.625 0 01-2.625-2.625V6.75a2.625 2.625 0 012.625-2.625h10.25a2.625 2.625 0 012.625 2.625v1.375m-9.75 0l.693 1.025M12 18.25h.008v.008H12v-.008ZM16.5 7.5a.75.75 0 100-1.5.75.75 0 000 1.5Z" />
          </svg>
          <span className="text-sm">Streams: {job.studentStreams.join(', ')}</span>
        </div>
      )}

      <div className="flex items-center mb-2">
        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        <span className="text-sm">{Array.isArray(job.location) ? job.location.join(', ') : job.location}</span>
      </div>

      <div className="flex items-center mb-3">
        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <span className="text-sm">{job.workMode}</span>
      </div>

      <div className="flex gap-1 mb-2">
        {job?.skills?.map((skill, index) => (
          <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">{skill}</span>
        ))}
      </div>

      <div className="mb-2">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-1 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00-.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008Z" />
          </svg>
          <span className="text-sm font-medium">{Array.isArray(job.jobRoles) ? job.jobRoles.join(', ') : job.jobRoles}</span>
        </div>
      </div>

      <div className="flex items-center mb-3">
        <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="text-sm">{job.minPackage?.currency} {job.minPackage?.amount || 'Not Mentioned'}</span>
      </div>

      <p className="text-sm text-gray-600 mb-4 flex-grow">{job.description || 'No description available.'}</p>

      <div className="mt-auto">
        <div className="flex justify-between text-xs text-gray-500 mb-3">
          <span>Hiring Process:</span>
          <div className="flex">
            {job?.selectionProcess?.map((step, index) => (
              <span key={index} className="mx-1">
                {step}
                {index < job.selectionProcess.length - 1 && " - "}
              </span>
            ))}
            {(!job.selectionProcess || job.selectionProcess.length === 0) && <span>Not specified</span>}
          </div>
        </div>
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Register Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
