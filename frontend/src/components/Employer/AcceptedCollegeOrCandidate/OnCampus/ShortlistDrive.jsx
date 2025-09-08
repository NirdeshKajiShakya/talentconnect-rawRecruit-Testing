import { FaCalendarAlt, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ShortlistDrive = ({
  drives = [],
  loading = false,
  error = null,
  pagination = { currentPage: 1, totalItems: 0, itemsPerPage: 8 },
  filters = { batchYear: '2025', location: 'All Locations', searchTerm: '' },
  onPageChange = () => {},
  onFilterChange = () => {},
  customLabels = {
    title: 'Shortlisted Drives',
    subtitle: 'Track Your Job Listings and Streamline Candidate Applications',
    manageButtonText: 'Manage Drive'
  }
}) => {
  const navigate = useNavigate();
  const { currentPage, totalItems, itemsPerPage } = pagination;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleManageDrive = (driveId) => {
    navigate(`/accepted/on-campus-listings/${driveId}`);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    // Logic to show limited pagination numbers
    let pageNumbers = [];
    if (totalPages <= 5) {
      pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else if (currentPage <= 3) {
      pageNumbers = [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPages - 2) {
      pageNumbers = Array.from({ length: 5 }, (_, i) => totalPages - 4 + i);
    } else {
      pageNumbers = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
    }

    return (
      <div className="flex justify-between items-center mt-8">
        <button 
          className="px-4 py-2 border rounded-md flex items-center gap-1 disabled:opacity-50" 
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Prev
        </button>
        
        <div className="flex gap-2">
          {pageNumbers.map(num => (
            <button
              key={num}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                currentPage === num ? 'bg-black text-white' : 'border'
              }`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          ))}
        </div>
        
        <button 
          className="px-4 py-2 border rounded-md flex items-center gap-1 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    );
  };

  const renderDriveCard = (drive) => (
    <div key={drive.id} className="border rounded-md overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{drive.institute}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            drive.status === 'Completed' ? 'bg-gray-100 text-gray-600' : 
            drive.status === 'On-Going' ? 'bg-green-100 text-green-600' : 
            'bg-blue-100 text-blue-600'
          }`}>
            {drive.status}
          </span>
        </div>
        
        <div className="mt-3 flex items-center gap-2 text-gray-600">
          <FaCalendarAlt className="text-xs" />
          <span className="text-sm">{drive.date}</span>
        </div>
        
        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <FaMapMarkerAlt className="text-xs" />
          <span className="text-sm">{drive.location}</span>
        </div>
        
        <div className="mt-3 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-500">Proposed Dates:</p>
            <p className="text-sm">{drive.proposedDates}</p>
          </div>
          
          <button 
            onClick={() => handleManageDrive(drive.id)}
            className="bg-black text-white py-2 px-4 rounded-md text-sm hover:bg-gray-800 mt-4 transition-colors"
          >
            {customLabels.manageButtonText}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-1">{customLabels.title}</h1>
      <p className="text-gray-600 mb-6">{customLabels.subtitle}</p>
      
      {/* Search and Filter Section */}
      <div className="border rounded-md p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow mt-6">
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full p-2 border rounded-md pl-8"
              value={filters.searchTerm}
              onChange={(e) => onFilterChange('searchTerm', e.target.value)}
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="min-w-[100px] ">
              <label className="block text-sm text-gray-600 mb-1">Batch Year</label>
              <select 
                className="w-full p-2 border rounded-md " 
                value={filters.batchYear}
                onChange={(e) => onFilterChange('batchYear', e.target.value)}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
            
            <div className="min-w-[150px]">
              <label className="block text-sm text-gray-600 mb-1">Location</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={filters.location}
                onChange={(e) => onFilterChange('location', e.target.value)}
              >
                <option value="All Locations">All Locations</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <p className="text-sm text-gray-600">
            Showing {drives.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </p>
        </div>
      </div>
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      
      {/* Error State */}
      {!loading && error && (
        <div className="bg-red-50 p-4 rounded-md text-red-600 mb-6">
          {error}
        </div>
      )}
      
      {/* Empty State */}
      {!loading && !error && drives.length === 0 && (
        <div className="bg-gray-50 p-8 rounded-md text-center">
          <p className="text-gray-500 text-lg">No drives found matching your criteria.</p>
        </div>
      )}
      
      {/* Drives Grid */}
      {!loading && !error && drives.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drives.map(renderDriveCard)}
        </div>
      )}
      
      {/* Pagination */}
      {!loading && !error && renderPagination()}
    </div>
  );
};

ShortlistDrive.propTypes = {
  drives: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      institute: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      proposedDates: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ),
  loading: PropTypes.bool,
  error: PropTypes.string,
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number
  }),
  filters: PropTypes.shape({
    batchYear: PropTypes.string,
    location: PropTypes.string,
    searchTerm: PropTypes.string
  }),
  onPageChange: PropTypes.func,
  onFilterChange: PropTypes.func,
  customLabels: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    manageButtonText: PropTypes.string
  })
};

export default ShortlistDrive;