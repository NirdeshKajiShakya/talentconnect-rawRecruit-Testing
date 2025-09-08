import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//  import { fetchJobDetails, fetchSimilarJobs} from '../../../../constants/JobListing'
import JobCard from '@/components/Student/StudentDashboard/JobListing/JobCard';
import { ApplyForJobListingOppurtunity, getJobLisingJobDetails, SaveOppurtunity } from '@/lib/User_AxiosInstance';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setIsLoading(true);

        // Fetch job details
        const details = await getJobLisingJobDetails(jobId);
        console.log("..../", details.data[0]);
        setJobDetails(details.data[0]);

        // Fetch similar jobs
        // const similar = await fetchSimilarJobs(jobId);
        // setSimilarJobs(similar);
        setError(null);
      } catch (err) {
        setError('Failed to load job details. Please try again later.');
        console.error('Error fetching job details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadJobDetails();
  }, [jobId]);

  const handleSave = async () => {
    try {
      const response = await SaveOppurtunity(jobId, jobDetails?.jobType);
      if (response) alert('Job saved!');
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Failed to submit application. Please try again.');
    }
  };

  const handleApply = async () => {
    try {
      const response = await ApplyForJobListingOppurtunity(jobId);
      if (response) alert('Application submitted successfully!');
    } catch (err) {
      console.error('Error applying for job:', err);
      alert('Failed to submit application. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !jobDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p className="text-xl font-semibold">{error || "Job not found"}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => navigate('/student-dashboard/job-listing')}
          >
            Back to Job Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{jobDetails.jobTitle}</h1>
            <p className="text-gray-600 mb-2">{jobDetails.companyPosted?.companyDetails?.companyName}</p>
            <p className="text-sm text-gray-500 mb-2">Job ID: {jobDetails._id}</p>
            <div className="flex items-center mb-2">
              <span className="inline-flex items-center mr-4">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                {jobDetails.yearsOfExperience} yrs
              </span>
              <span className="inline-flex items-center capitalize">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {jobDetails.location}
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleSave}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow"
            >
              Save
            </button>
            <button
              onClick={handleApply}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Job description</h2>
          <div className="mb-4">
            <h3 className="font-medium mb-2">About The Role:</h3>
            <p className="text-gray-700">{jobDetails.description}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-medium mb-2">What you'll do:</h3>
            <p className="text-gray-700">{jobDetails?.responsibilities}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm font-medium text-gray-500">Role:</p>
              <p className="text-gray-700">{jobDetails.jobTitle}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Industry Type:</p>
              <p className="text-gray-700">{jobDetails.comapnyId?.companyDetails?.industryType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Department:</p>
              <p className="text-gray-700">{jobDetails?.department}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Employment Type:</p>
              <p className="text-gray-700">{jobDetails?.employmentType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Role Category:</p>
              <p className="text-gray-700">{jobDetails?.jobType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Salary Range:</p>
              <p className="text-gray-700">{jobDetails.minPackage.currency} {jobDetails?.minPackage.amount}/month</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Work Mode:</p>
              <p className="text-gray-700">{jobDetails.workMode}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Minimum Education: <span className="text-gray-700"> {jobDetails.minEducation}</span></p>
              <p className="text-sm font-medium text-gray-500">Prefered field of study: <span className="text-gray-700">  {jobDetails.studentStreams}</span></p>
            </div>
            {/* <div>
              <p className="text-sm font-medium text-gray-500">PG:</p>
              <p className="text-gray-700">{jobDetails.education?.pg}</p>
            </div> */}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Key Skills</h2>
          <div className="flex flex-wrap gap-2">
            {jobDetails?.skills?.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">About company</h2>
          <p className="text-gray-700 mb-4">{jobDetails?.companyPosted?.companyDetails.description}</p>

          <h3 className="font-medium mb-2">Company Info</h3>
          <p className="text-gray-700">
            <span className="font-medium">Address:</span> {jobDetails?.companyPosted?.companyDetails.companyLocation} {jobDetails?.companyPosted?.companyDetails.state}, {jobDetails?.companyPosted?.companyDetails.country}
          </p>
        </div>
      </div>

    </div>
  );
};

export default JobDetails;