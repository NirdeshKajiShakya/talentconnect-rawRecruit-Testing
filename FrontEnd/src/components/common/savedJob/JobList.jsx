import { useState } from 'react';
import { Link } from 'react-router-dom';
import JobCard from './JobCard';
import SearchBar from './SearchBar';

const JobList = ({ jobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredJobs = jobs?.filter(job =>
    job?.jobDetails[0]?.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job?.jobDetails[0]?.jobRoles[0]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job?.jobDetails[0]?.companyPosted?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job?.jobDetails[0]?.collegePosted?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'company') {
      return a.company.localeCompare(b.company);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-white container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-2">Saved Jobs</h1>
      <p className="text-gray-600 mb-6">
        Browse your saved opportunities
      </p>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="mt-4 md:mt-0">
          <select
            className="border rounded-md p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
            <option value="company">Sort by Company</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {
          sortedJobs.length > 0 ? sortedJobs.map(job => (
            <Link to={`/student-dashboard/${job?.jobType}/${job?.jobDetails[0]._id}`} key={job?.jobDetails[0]._id}>
              <JobCard job={job} />
            </Link>
          )) : (
            <span className='text-red-500'>No saved jobs</span>
          )
        }
      </div>
    </div>
  );
};

export default JobList;