import { useParams, Link } from 'react-router-dom';
import RelatedJobs from './RelatedJob';

const JobDetail = ({ jobs }) => {
  const { id } = useParams();
  const job = jobs.find(job => job.id === id);

  if (!job) {
    return <div className="container mx-auto px-4 py-8">Job not found</div>;
  }

  // Find related jobs based on similar skills or category
  const relatedJobs = jobs
    .filter(j => j.id !== job.id && 
      (j.category === job.category || 
       j.skills.some(skill => job.skills.includes(skill))))
    .slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-8">
        <div className="mb-6 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="flex items-start">
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
                {job.logo ? (
                  <img src={job.logo} alt={`${job.company} logo`} className="w-12 h-12 object-contain" />
                ) : (
                  <div className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold">{job.title}</h1>
                <div className="text-gray-600">{job.company}</div>
                <div className="mt-2 flex flex-wrap">
                  <div className="flex items-center mr-4 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>{job.type}</span>
                  </div>
                  {job.experience && (
                    <div className="flex items-center mr-4 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{job.experience}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Save</button>
              <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Apply</button>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Job description</h2>
            <div className="mb-6">
              <h3 className="font-medium mb-2">About The Role</h3>
              <p className="text-gray-700 mb-4">{job.aboutRole}</p>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">What you'll do</h3>
              <p className="text-gray-700 mb-4">{job.responsibilities}</p>
            </div>
            {job.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {job.details.map((detail, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-sm text-gray-500">{detail.label}</h4>
                    <p className="font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Key Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">About company</h2>
            <p className="text-gray-700 mb-4">{job.aboutCompany}</p>
            
            {job.companyInfo && (
              <div className="text-sm text-gray-600">
                <p>{job.companyInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedJobs jobs={relatedJobs} />
      
      <div className="mt-6 bg-white">
        <Link to="/saved-jobs" className="text-blue-600 hover:text-blue-800">
          &larr; Back to all jobs
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;