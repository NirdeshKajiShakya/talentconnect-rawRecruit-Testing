import { Link } from 'react-router-dom';

const RelatedJobCard = ({ job }) => {
  return (
    <div className="border rounded-md p-4 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-md mb-3">
        {job.logo ? (
          <img src={job.logo} alt={`${job.company} logo`} className="w-8 h-8 object-contain" />
        ) : (
          <div className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      
      <h3 className="font-semibold">{job.title}</h3>
      
      <div className="text-sm text-gray-500 my-1">
        <span>{job.location}</span>
        <span className="mx-1">•</span>
        <span>{job.type}</span>
        <span className="mx-1">•</span>
        <span>{job.remote ? 'Remote' : 'On-site'}</span>
      </div>
      
      <p className="mt-2 text-sm text-gray-600 line-clamp-3 mb-4">
        {job.description}
      </p>
      
      <Link to={`/saved-jobs/${job.id}`}>
        <button className="w-full py-2 px-4 border border-gray-300 rounded text-sm hover:bg-gray-50">
          Apply now
        </button>
      </Link>
    </div>
  );
};

const RelatedJobs = ({ jobs }) => {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-md shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Similar Jobs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs.map(job => (
          <RelatedJobCard key={job.id} job={job} />
        ))}
      </div>

      {jobs.length > 5 && (
        <div className="mt-4 text-center">
          <button className="text-blue-600 hover:text-blue-800">
            View all
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedJobs;