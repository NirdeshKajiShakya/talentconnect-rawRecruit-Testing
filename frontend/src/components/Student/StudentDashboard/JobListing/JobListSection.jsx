import { useEffect, useState } from 'react';
import JobCard from './JobCard';

const JobListSection = ({ title, description, jobs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('relevance');
  const [sortMenuOpen, setSortMenuOpen] = useState(false);


  // Filter jobs based on search term
  // const filteredJobs = jobs.filter(job => 
  //   job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   job.company?.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // // Sort jobs based on selected option
  // const sortedJobs = [...filteredJobs].sort((a, b) => {
  //   switch (sortOption) {
  //     case 'date':
  //       return new Date(b.postedDate) - new Date(a.postedDate);
  //     case 'salary-high':
  //       return b.salaryMax - a.salaryMax;
  //     case 'salary-low':
  //       return a.salaryMin - b.salaryMin;
  //     case 'relevance':
  //     default:
  //       return 0; // Default is by relevance (as returned from API)
  //   }
  // });

  // // Show only the first 6 jobs, can be expanded with "View all" button
  // const displayJobs = sortedJobs.slice(0, 6);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex items-center">
          <div className="relative mr-2">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="relative">
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none"
              onClick={() => setSortMenuOpen(!sortMenuOpen)}
            >
              <span>Sort by</span>
              <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            {sortMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'relevance' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setSortOption('relevance');
                        setSortMenuOpen(false);
                      }}
                    >
                      Relevance
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'date' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setSortOption('date');
                        setSortMenuOpen(false);
                      }}
                    >
                      Date Posted
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'salary-high' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setSortOption('salary-high');
                        setSortMenuOpen(false);
                      }}
                    >
                      Salary (High to Low)
                    </button>
                  </li>
                  <li>
                    <button
                      className={`block px-4 py-2 text-sm w-full text-left ${sortOption === 'salary-low' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      onClick={() => {
                        setSortOption('salary-low');
                        setSortMenuOpen(false);
                      }}
                    >
                      Salary (Low to High)
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs?.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      {jobs.length > 6 && (
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            View all
          </button>
        </div>
      )}
    </div>
  );
};

export default JobListSection;