import { useState } from 'react';
import { parseResume } from '@/constants/parser';

const useResumeAppLogic = () => {
  const [view, setView] = useState('search');
  const [candidates, setCandidates] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    salary: '',
    search: '',
    jobStatus: {
      active: true,
      expired: true,
    },
    postedBy: {
      me: true,
      user2: false,
      user3: false,
      user4: false,
      user5: false,
    },
  });

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newCandidates = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const parsedData = await parseResume(file);
        newCandidates.push(parsedData);
      } catch (error) {
        console.error('Error parsing resume:', error);
      }
    }

    setCandidates([...candidates, ...newCandidates]);
    setView('applications');
  };

  const handleSearch = (searchParams) => {
    console.log('Searching with params:', searchParams);
    setView('applications');
  };

  const updateFilters = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const shortlistCandidate = (id) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, shortlisted: true } : candidate
      )
    );
  };

  return {
    view,
    setView,
    candidates,
    filters,
    handleFileUpload,
    handleSearch,
    updateFilters,
    shortlistCandidate,
  };
};

export default useResumeAppLogic;
