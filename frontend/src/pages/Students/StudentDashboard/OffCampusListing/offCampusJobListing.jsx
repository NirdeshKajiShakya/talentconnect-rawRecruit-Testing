import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '@/components/Student/StudentDashboard/OffCampusListing/JobCard';
import { getRelaventOffcampusOpportunity } from '@/lib/User_AxiosInstance';

function OffCampusoffCampusJobss() {
  const [offCampusJobs, setOffCampusJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleJobClick = (jobId) => {
    navigate(`/student-dashboard/off-campus-listings/${jobId}`);
  };

  const fetchOffcampusOpportunity = async () => {
    try {
      setIsLoading(true);

      const response = await getRelaventOffcampusOpportunity();
      setOffCampusJobs(response.data.data);
      setError(null);
    } catch (error) {
      setError('Failed to load jobs. Please try again later.')
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOffcampusOpportunity();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center p-4">
          <p className="text-xl font-semibold">{error}</p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            // onClick={() => window.location.reload()}
            onClick={() => fetchOffcampusOpportunity()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-2">Off-Campus Jobs based on your preferences</h1>
      <p className="text-gray-600 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.</p>

      <div className="flex justify-between mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded bg-white"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <select
            className="block w-full p-2 text-sm border border-gray-300 rounded bg-white appearance-none pr-8"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="recent">Recent</option>
            <option value="salary">Salary</option>
            <option value="company">Company</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offCampusJobs?.map(job => (
          <JobCard key={job._id} job={job} onClick={handleJobClick} />
        ))}
      </div>

      <div className="flex justify-end mt-6">
        <button className="text-sm text-white bg-black px-4 py-2 border border-gray-300 rounded hover:bg-blue-600">
          View all
        </button>
      </div>
    </div>
  );
}

export default OffCampusoffCampusJobss;