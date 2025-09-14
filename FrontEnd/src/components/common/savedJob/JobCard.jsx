const JobCard = ({ job }) => {
  return (
    <div className="border rounded-md p-4 hover:shadow-md transition-shadow">
      <div className="flex">
        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-md">
          {job?.logo ? (
            <img src={job?.logo} alt={`${job?.company} logo`} className="w-12 h-12 object-contain" />
          ) : (
            <div className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="ml-4 flex-1">
          <div className="flex text-sm text-gray-500 mb-1">
            <span>{job?.jobDetails[0].location}</span>
            <span className="mx-2">•</span>
            <span>{job?.jobDetails[0].employmentType}</span>
            <span className="mx-2">•</span>
            <span>{job?.jobDetails[0].workMode}</span>
          </div>

          <h3 className="font-semibold text-lg">{job?.jobDetails[0]?.jobTitle || job?.jobDetails[0]?.jobRoles}</h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3 capitalize">{job?.jobType}</p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-3 capitalize">
            {job?.jobDetails[0]?.description}
          </p>
        </div>

        {/* <div className="ml-4 flex flex-col items-end">
          <div className="flex items-center text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{job?.timeAgo} ago</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default JobCard;