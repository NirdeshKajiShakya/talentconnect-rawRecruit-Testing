import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ApplyForOppurtunity, getJobDetails } from '@/lib/User_AxiosInstance';

function OffCampusJobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState(null); // Initialize as null

  const loadJobDetails = async () => {
    try {
      setIsLoading(true);


      const details = await getJobDetails(jobId);

      setJobDetail(details.data[0]); // Access the first element of the data array
      setError(null);
    } catch (err) {
      setError('Failed to load job details. Please try again later.');
      console.error('Error fetching job details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) { // Only load details if jobId is available
      loadJobDetails();
    }
  }, [jobId]);

  const handleBackToList = () => {
    navigate('/student-dashboard/off-campus-listings');
  };

  const handleApply = async () => {
    try {
      // if (jobDetail && jobDetail.jobStatus === 'Open') { // Use jobStatus from your schema
      const response = await ApplyForOppurtunity(jobId); // Pass jobType if 
      if (response?.data.success === true) { // Check for boolean true
        alert("Application submitted successfully!");
      } else {
        alert("Failed to submit application. Please try again.");
      }
      // } else {
      //   alert("Application is not open or job details are missing.");
      // }
    } catch (error) {
      console.error("Error during application:", error); // Use console.error
      alert('Failed to submit application. Please try again.'); // Generic error for user
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div> {/* Corrected color to blue */}
      </div>
    );
  }

  if (error || !jobDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p className="text-xl font-semibold">{error || "Job not found"}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={loadJobDetails}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Determine job status styling for the header
  let headerStatusClasses = '';
  switch (jobDetail.jobStatus) {
    case 'Open':
      headerStatusClasses = 'text-green-600';
      break;
    case 'Closed':
      headerStatusClasses = 'text-red-600';
      break;
    case 'Pending':
      headerStatusClasses = 'text-yellow-600';
      break;
    default:
      headerStatusClasses = 'text-gray-600';
  }


  return (
    <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center">
          {/* Company Logo/Profile Image */}
          <div className="w-12 h-12 bg-gray-200 mr-4 flex items-center justify-center rounded-full overflow-hidden">
            {jobDetail.companyPosted?.profileImage ? (
              <img
                src={jobDetail.companyPosted.profileImage}
                alt={jobDetail.companyPosted.companyDetails.companyName || "Company Logo"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; // Prevent infinite loop if fallback also fails
                  e.target.src = 'https://placehold.co/48x48/cccccc/000000?text=Logo'; // Generic fallback image
                }}
              />
            ) : (
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            {/* Company Name and Job Roles */}
            <h2 className="text-xl font-bold">
              {jobDetail.companyPosted?.companyDetails?.companyName || "N/A"} - {jobDetail.jobRoles?.map((j, i) => (<span key={i}>{j}{i < jobDetail.jobRoles.length - 1 ? ', ' : ''}</span>)) || 'N/A'}
            </h2>
            {/* Job Status */}
            <p className={`text-sm ${headerStatusClasses}`}>Application {jobDetail.jobStatus}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button onClick={handleBackToList} className="p-2 border border-gray-300 rounded hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
          <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800" onClick={handleApply}>Apply</button>
        </div>
      </div>

      {/* About Company */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">About {jobDetail.companyPosted?.companyDetails?.companyName || "Company"}</h3>
        <p className="text-gray-700 mb-4">{jobDetail.companyPosted?.companyDetails?.description || 'No company description available.'}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 p-4 rounded-md">
            <div className="font-bold text-lg">{jobDetail.companyPosted?.companyDetails?.numberOfEmployees || 'N/A'}</div>
            <div className="text-sm text-gray-600">Employees</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-md">

            <div className="font-bold text-lg">N/A</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-md">
            <div className="font-bold text-lg capitalize">{jobDetail.companyPosted?.companyDetails?.industryType || 'N/A'}</div>
            <div className="text-sm text-gray-600">Industries</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-md">
            <div className="font-bold text-lg">{jobDetail.companyPosted?.companyDetails?.country || 'N/A'}</div>
            <div className="text-sm text-gray-600">Countries</div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Program Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
            </svg>
            <div>
              {/* Using minEducation and studentStreams */}
              <div className="font-medium">{jobDetail.minEducation || 'N/A'}</div>
              <div className="text-sm text-gray-600">Streams: {jobDetail.studentStreams?.join(', ') || 'N/A'}</div>
            </div>
            {/* Location  */}


          </div>
          <div className="ml-4 flex">Location:
            <div className="font-medium text-gray-600 "> {Array.isArray(jobDetail.location) ? jobDetail.location.join(', ') : jobDetail.location || 'N/A'}</div>

          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <div>
              <div className="font-medium">Compensation</div>
              <div className="text-gray-700">{jobDetail.minPackage?.currency || 'N/A'} {jobDetail.minPackage?.amount || 'Not Mentioned'}</div>
              {/* Benefits is not in your schema, using placeholder */}
              <div className="text-sm text-gray-600">Benefits: Not specified</div>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <div>
              {/* Academics is not in your schema, using placeholder */}
              <div className="font-medium">Academics: Not specified</div>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <div>
              <div className="font-medium">Venue: {jobDetail.venue || 'N/A'}</div> {/* Use 'venue' from schema */}
            </div>
          </div>
          {/* Number of round  */}
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            </svg>
            <div>
              <div className="font-medium">Number of rounds: <span className='text-gray-600'>{jobDetail.rounds || 'N/A'}</span></div>
            </div>
          </div>

        </div>
        {/* About the role  */}
        <div className="flex items-start mt-5">
          <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> </svg>
          <div>
            <div className="font-medium">About the role</div>
            <div className="text-gray-700">{jobDetail.description || 'No description available.'}</div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Job Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Job Title:</div> {/* Changed to Job Title for clarity */}
            <div>{jobDetail.jobTitle || 'N/A'}</div> {/* Use jobTitle */}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Industry Type:</div>
            <div>{jobDetail.companyPosted?.companyDetails?.industryType || 'N/A'}</div> {/* Access from companyPosted */}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Department:</div>

            <div>N/A</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Employment Type:</div>
            <div className="capitalize">{jobDetail.employmentType || 'N/A'}</div> {/* Use employmentType */}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Role Category:</div>
            <div>{jobDetail.jobRoles || 'N/A'}</div> {/* Use jobCategory */}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Salary Range:</div>
            <div>{jobDetail.minPackage?.currency || 'N/A'} {jobDetail.minPackage?.amount || 'Not Mentioned'} /month</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Work Mode:</div>
            <div className="capitalize">{jobDetail.workMode || 'N/A'}</div> {/* Use workMode */}
          </div>
        </div>
      </section>


      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Selection Process</h3>
        <div className="relative flex items-center justify-between overflow-x-auto px-4">
          {/* Display selection process steps */}
          {jobDetail.selectionProcess && jobDetail.selectionProcess.length > 0 ? (
            jobDetail.selectionProcess.map((step, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm mx-1">
                {step}
              </span>
            ))
          ) : (
            <span>Not specified</span>
          )}
        </div>
      </section>

      {/* Required Skills */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {jobDetail.skills && jobDetail.skills.length > 0 ? (
              jobDetail.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm">{skill}</span>
              ))
            ) : (
              <span>No skills specified.</span>
            )}
          </div>
        </div>
      </section>

      {/* Important Dates */}
      <section>
        <h3 className="text-lg font-semibold mb-3">Important Dates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border border-gray-200 p-3 rounded-md">
            <div className="text-sm text-gray-600">Registration Deadline</div>
            <div className="font-medium">
              {jobDetail.endDate ? new Date(jobDetail.endDate).toLocaleDateString() : 'N/A'}
            </div>
          </div>
          <div className="border border-gray-200 p-3 rounded-md">
            <div className="text-sm text-gray-600">Test Date</div>

            <div className="font-medium">N/A</div>
          </div>
          <div className="border border-gray-200 p-3 rounded-md">
            <div className="text-sm text-gray-600">Interview Window</div>

            <div className="font-medium">N/A</div>
          </div>
          <div className="border border-gray-200 p-3 rounded-md">
            <div className="text-sm text-gray-600">Results</div>

            <div className="font-medium">N/A</div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default OffCampusJobDetail;
