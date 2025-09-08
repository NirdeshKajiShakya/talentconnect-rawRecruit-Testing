import { createContext, useState, useContext, useEffect } from 'react';
// import { getApplications } from '@/constants/applicationService';
import { getOncampusJobs } from '@/lib/College_AxiosIntance';

const ApplicationContext = createContext();

export const useApplications = () => useContext(ApplicationContext);

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: 'All Companies',
    role: 'All Role',
    searchQuery: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  
  // Fetch applications on component mount
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await getOncampusJobs()
        setApplications(data.data.data);
        setFilteredApplications(data.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...applications];
    
    // Filter by status if not 'All Companies'
    if (filters.status !== 'All Companies') {
      result = result.filter(app => 
        filters.status === 'Registered Companies' ? app.status === 'Registered' :
        filters.status === 'Shortlisted Companies' ? app.status === 'Shortlisted' :
        filters.status === 'Rejected Companies' ? app.status === 'Rejected' : true
      );
    }
    
    // Filter by role if not 'All Role'
    if (filters.role !== 'All Role') {
      result = result.filter(app => app.position === filters.role);
    }
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(query) || 
        app.position.toLowerCase().includes(query)
      );
    }
    
    setFilteredApplications(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, applications]);

  // Get current applications for pagination
  const getCurrentApplications = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredApplications.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Get total pages for pagination
  const getTotalPages = () => Math.ceil(filteredApplications.length / itemsPerPage);

  // Get a single application by ID
  const getApplicationById = (id) => {
    return applications.find(app => app.id === id);
  };

  const value = {
    applications,
    filteredApplications,
    loading,
    error,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    getCurrentApplications,
    getTotalPages,
    getApplicationById,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};