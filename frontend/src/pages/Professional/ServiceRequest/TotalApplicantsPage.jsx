import { useState } from 'react';
import { 
  FiMapPin, FiMail, FiPhone, FiBriefcase, FiDollarSign, 
  FiCalendar, FiUser, FiMessageSquare, FiEye, FiStar, FiX
} from 'react-icons/fi';
import PageHeader from "@/components/dashboard/PageHeader"
import { useNavigate } from 'react-router-dom';

function TotalApplicantsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filters, setFilters] = useState({
    active: false,
    closed: false,
    expired: true
  });

  // Sample applicant data
  const applicants = [
    {
      id: 1,
      name: 'Name Surname',
      location: 'Bengaluru, India',
      email: 'xyz@gmail.com',
      phone: '1234567890',
      currentSalary: '₹117,450',
      expectedSalary: '₹358,450',
      education: 'B.Tech (Mechanical)',
      experience: '5 years',
      languages: 'English, Hindi & Punjabi',
      gender: 'Male, 24Y',
      designation: 'Backend Developer at TalentConnects',
      industry: 'IT',
      skills: [
        'UX/UI Design', 'Figma', 'Tableau', 'Power BI', 'Motion Graphics',
        '3D Modeling', 'Excel (Advanced)', 'Project Management',
        'Product Management', 'Critical Thinking', 'Emotional Intelligence', 'Teamwork',
        'Leadership'
      ],
      lastActive: 'Today',
      socialLinks: {
        linkedin: true,
        github: true,
        portfolio: true,
        cv: true
      }
    },
    {
      id: 2,
      name: 'Name Surname',
      location: 'Bengaluru, India',
      email: 'xyz@gmail.com',
      phone: '1234567890',
      currentSalary: '₹117,450',
      expectedSalary: '₹358,450',
      education: 'B.Tech (Mechanical)',
      experience: '5 years',
      languages: 'English, Hindi',
      gender: 'Female, 24Y',
      designation: 'Backend Developer at TalentConnects',
      industry: 'IT',
      skills: [
        'UX/UI Design', 'Figma', 'Tableau', 'Power BI', 'Motion Graphics',
        '3D Modeling', 'Excel (Advanced)', 'Project Management',
        'Product Management', 'Critical Thinking', 'Emotional Intelligence', 'Teamwork',
        'Leadership'
      ],
      lastActive: 'Today',
      socialLinks: {
        linkedin: true,
        github: true,
        portfolio: true,
        cv: true
      }
    }
  ];

  const handleFilterChange = (filterName) => {
    setFilters({
      ...filters,
      [filterName]: !filters[filterName]
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearAllFilters = () => {
    setFilters({
      active: false,
      closed: false,
      expired: false
    });
    setSearchTerm('');
  };

  const clearJobStatusFilter = () => {
    setFilters({
      ...filters,
      active: false,
      closed: false,
      expired: false
    });
  };

  const handleViewApplicantDetails = (applicantId) => {
    // Navigate to the off-campus applicant page
    navigate(`/professional/service-request/applicant?applicantid=${applicantId}`);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <PageHeader title="Total Applicants" />
      
      <p className="text-gray-600 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros.
      </p>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-4 rounded border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button 
                className="text-blue-600 text-sm"
                onClick={clearAllFilters}
              >
                Clear all
              </button>
            </div>
            
            <p className="text-sm text-gray-500 mb-4">Showing 0 of 100</p>
            
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Job"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Job status</h3>
                <button 
                  className="text-blue-600 text-sm"
                  onClick={clearJobStatusFilter}
                >
                  Clear
                </button>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    checked={filters.active}
                    onChange={() => handleFilterChange('active')}
                  />
                  <span className="ml-2 text-sm">Active Jobs</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    checked={filters.closed}
                    onChange={() => handleFilterChange('closed')}
                  />
                  <span className="ml-2 text-sm">Closed Jobs</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    checked={filters.expired}
                    onChange={() => handleFilterChange('expired')}
                  />
                  <span className="ml-2 text-sm">Expired Jobs</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          {/* Search and sort */}
          <div className="flex justify-between mb-6">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded appearance-none bg-white"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="">Sort by</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="date_asc">Date (Oldest)</option>
              <option value="date_desc">Date (Newest)</option>
            </select>
          </div>
          
          {/* Applicant cards */}
          <div className="space-y-6">
            {applicants.map(applicant => (
              <div key={applicant.id} className="bg-white rounded border border-gray-200 p-6">
                <div className="flex items-start gap-4">
                  {/* Profile section */}
                  <div className="bg-gray-200 w-12 h-12 rounded-full flex-shrink-0"></div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{applicant.name}</h3>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FiMapPin className="mr-1 text-gray-400" />
                          <span>{applicant.location}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        Last active: {applicant.lastActive}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mb-4">
                      <div className="flex items-center text-sm">
                        <FiMail className="mr-2 text-gray-400" />
                        <span>{applicant.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiPhone className="mr-2 text-gray-400" />
                        <span>{applicant.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiDollarSign className="mr-2 text-gray-400" />
                        <span>Current Salary: {applicant.currentSalary}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <FiDollarSign className="mr-2 text-gray-400" />
                        <span>Expected Salary: {applicant.expectedSalary}</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {applicant.socialLinks.linkedin && (
                        <a href="#" className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded">
                          <span className="text-sm">in</span>
                        </a>
                      )}
                      {applicant.socialLinks.github && (
                        <a href="#" className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded">
                          <FiGithub />
                        </a>
                      )}
                      {applicant.socialLinks.portfolio && (
                        <a href="#" className="flex items-center justify-center px-4 py-1 border border-gray-300 rounded text-sm">
                          Portfolio
                        </a>
                      )}
                      {applicant.socialLinks.cv && (
                        <a href="#" className="flex items-center justify-center px-4 py-1 border border-gray-300 rounded text-sm">
                          CV
                        </a>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Key Info :</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                        <div className="flex items-center text-sm">
                          <FiBookOpen className="mr-2 text-gray-400" />
                          <span>{applicant.education}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FiBriefcase className="mr-2 text-gray-400" />
                          <span>{applicant.experience}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FiMessageSquare className="mr-2 text-gray-400" />
                          <span>Speaks {applicant.languages}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <FiUser className="mr-2 text-gray-400" />
                          <span>{applicant.gender}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div>
                        <span className="text-sm font-medium">Designation :</span>
                        <span className="text-sm ml-2">{applicant.designation}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Industry :</span>
                        <span className="text-sm ml-2">{applicant.industry}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Languages :</span>
                        <span className="text-sm ml-2">{applicant.languages}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium">Skills :</span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {applicant.skills.slice(0, 5).map((skill, index) => (
                            <span 
                              key={index} 
                              className="text-xs px-3 py-1 bg-gray-100 border border-gray-200 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                          {applicant.skills.length > 5 && (
                            <span className="text-xs px-3 py-1 bg-gray-100 border border-gray-200 rounded">
                              +{applicant.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          Chat
                        </button>
                        <button 
                          className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                          onClick={() => handleViewApplicantDetails(applicant.id)}
                        >
                          View Details
                        </button>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-2">
                        <button 
                          className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800"
                          onClick={() => handleViewApplicantDetails(applicant.id)}
                        >
                          Shortlist Candidate
                        </button>
                        <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                          <FiX className="mr-1" />
                          Reject Application
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom icon components
const FiBookOpen = ({ className }) => {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
    </svg>
  );
};

const FiGithub = ({ className }) => {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  );
};

const FiSearch = ({ className }) => {
  return (
    <svg 
      className={className} 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
};

export default TotalApplicantsPage;