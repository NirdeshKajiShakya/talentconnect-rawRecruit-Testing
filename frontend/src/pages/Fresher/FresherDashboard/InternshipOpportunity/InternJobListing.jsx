

import { useState, useEffect } from 'react';
import JobListSection from '@/components/Student/StudentDashboard/IntershipOpportunity/JobListSection';
import { getAllInternship } from '@/lib/User_AxiosInstance';

const FInternJobListings = () => {
  const [profileJobs, setProfileJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInternships = async () => {
    try {
      setIsLoading(true);
      const response = await getAllInternship();
      // Corrected: Access the 'data' property of the response.data.data object
      setProfileJobs(response.data.data);
      setError(null);
    } catch (error) {
      setError('Failed to load internships. Please try again later.');
      console.error('Error fetching internships:', error); // Use console.error for errors
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
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
            onClick={() => fetchInternships()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <JobListSection
        title="Internships based on your profile"
        description="Explore internship opportunities tailored to your academic background and skills."
        jobs={profileJobs}
        userType={localStorage.getItem('selectedRole')} // Pass userType to JobListSection
      />

      {/* You can uncomment and use this section if you implement preference-based filtering */}
      {/* <JobListSection
        title="Internships based on your preferences"
        description="Discover internships matching your saved preferences."
        jobs={preferenceJobs}
        userType={localStorage.getItem('selectedRole')}
      /> */}
    </div>
  );
};

export default FInternJobListings;