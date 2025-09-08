


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { jobListings, detailedJobData } from '@/constants/offCampusListing'
import { ApplyForOppurtunity, getJobDetails, SaveOppurtunity } from '@/lib/User_AxiosInstance';


function OffCampusJobDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jobDetail, setJobDetail] = useState(null);

  const loadJobDetails = async () => {
    try {
      setIsLoading(true);
      const details = await getJobDetails(jobId);
      setJobDetail(details.data[0]);
      setError(null);
    } catch (err) {
      setError('Failed to load job details. Please try again later.');
      console.error('Error fetching job details:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    loadJobDetails();
  }, [jobId]);

  const handleBackToList = () => {
    navigate('/fresher-dashboard/off-campus-listings');
  };

  const handleSave = async () => {
    try {
      const response = await SaveOppurtunity(jobId, jobDetail?.jobType);
      if (response) alert('Job saved!');
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleApply = async () => {
    try {
      // if (jobDetail?.status === 'Open') {
      const response = await ApplyForOppurtunity(jobId, jobDetail.jobType);
      if (response.success === 'true') alert("Applied");
      // }
      else alert("Application Closed!")
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/48x48/cccccc/000000?text=Logo';
                }}
              />
            ) : (
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold">{jobDetail?.companyPosted?.companyDetails.companyName} - {jobDetail?.jobRoles.map((j, i) => (<span key={i}>{j}</span>))}</h2>
            <p className="text-sm text-gray-600">Application {jobDetail.status}</p>
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
        <h3 className="text-lg font-semibold mb-3">About {jobDetail?.companyPosted?.companyDetails?.companyName}</h3>
        <p className="text-gray-700 mb-4">{jobDetail?.companyPosted?.companyDetails.description}</p>

        <div className="grid grid-cols-4 gap-4">
          <div className="border border-gray-200 p-4">
            <div className="font-bold text-lg">{jobDetail?.companyPosted?.companyDetails.numberOfEmployees}</div>
            <div className="text-sm text-gray-600">Employees</div>
          </div>
          <div className="border border-gray-200 p-4 rounded-md">
            <div className="font-bold text-lg">N/A</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
          <div className="border border-gray-200 p-4">
            <div className="font-bold text-lg capitalize">{jobDetail?.companyPosted?.companyDetails.industryType}</div>
            <div className="text-sm text-gray-600">Industries</div>
          </div>
          <div className="border border-gray-200 p-4">
            <div className="font-bold text-lg">{jobDetail?.companyPosted?.companyDetails.country}</div>
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
              <div className="font-medium">{jobDetail.minEducation || 'N/A'}</div>
              <div className="text-sm text-gray-600">Streams: {jobDetail.studentStreams?.join(', ') || 'N/A'}</div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <div>
              <div className="font-medium">Location</div>
              <div className="text-gray-700"> {Array.isArray(jobDetail.location) ? jobDetail.location.join(', ') : jobDetail.location || 'N/A'}</div>
            </div>
          </div>

          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <div>
              <div className="font-medium">Compensation</div>
              <div className="text-gray-700">{jobDetail.minPackage?.currency || 'N/A'} {jobDetail.minPackage?.amount || 'Not Mentioned'}</div>
              <div className="text-sm text-gray-600">Benefits: Not specified</div>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <div>
              <div className="font-medium">Academics: Not specified</div>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <div>
              <div className="font-medium">Venue: {jobDetail.venue || 'N/A'}</div>
            </div>
          </div>
          <div className="flex items-start">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            <div>
              <div className="font-medium">Number of rounds: <span className='text-gray-600'>{jobDetail.rounds || 'N/A'}</span></div>
            </div>
          </div>

          <div className="flex items-start mt-5">
            <svg className="w-5 h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m-5 4h4a2 2 0 002-2V6a2 2 0 00-2-2H9a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <div>
              <div className="font-medium">About the role</div>
              <div className="text-gray-700">{jobDetail.description || 'No description available.'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Job Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Job Title:</div>
            <div>{jobDetail.jobTitle || 'N/A'}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Industry Type:</div>
            <div>{jobDetail.companyPosted?.companyDetails?.industryType || 'N/A'}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Department:</div>
            <div>N/A</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Employment Type:</div>
            <div className="capitalize">{jobDetail.employmentType || 'N/A'}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Role Category:</div>
            <div>{jobDetail.jobRoles || 'N/A'}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Salary Range:</div>
            <div>{jobDetail.minPackage?.currency || 'N/A'} {jobDetail.minPackage?.amount || 'Not Mentioned'} /month</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-600 mr-1">Work Mode</div>
            <div>{jobDetail?.workMode}</div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Selection Process</h3>
        <div className="relative flex items-center justify-between overflow-x-auto px-4">
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