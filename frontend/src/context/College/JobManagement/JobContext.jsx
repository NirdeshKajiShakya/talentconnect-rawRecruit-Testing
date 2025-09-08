import React, { createContext, useState, useContext } from 'react';
import { sampleJobs } from '@/constants/JobsData';

const JobContext = createContext(undefined);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API fetch on mount
  React.useEffect(() => {
    setTimeout(() => {
      setJobs(sampleJobs);
      setLoading(false);
    }, 500);
  }, []);

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  // Action handlers
  const acceptDrive = (id) => {
    console.log(`Accepted drive for job ID: ${id}`);
    // In a real app: API call to update status
  };

  const shortlistDrive = (id) => {
    console.log(`Shortlisted drive for job ID: ${id}`);
    // In a real app: API call to update status
  };

  const rejectDrive = (id) => {
    console.log(`Rejected drive for job ID: ${id}`);
    // In a real app: API call to update status
  };

  return (
    <JobContext.Provider value={{ 
      jobs, 
      loading, 
      getJobById,
      acceptDrive,
      shortlistDrive,
      rejectDrive
    }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};