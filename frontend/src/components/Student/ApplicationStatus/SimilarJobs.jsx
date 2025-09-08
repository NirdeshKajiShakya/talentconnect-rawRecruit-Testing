import { useState } from 'react';
import { Search, Bookmark } from 'lucide-react';

const SimilarJobs = ({
  jobs,
  title = "Similar jobs for you",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("relevance");
   
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set());

  const toggleBookmark = (id) => {
    setBookmarkedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "company") return a.company.localeCompare(b.company);
      if (sortOption === "date") return new Date(b.date) - new Date(a.date);
      return 0; // relevance
    });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500 mb-6">{description}</p>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <div className="relative">
          <select
            className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="relevance">Sort by</option>
            <option value="date">Date</option>
            <option value="company">Company</option>
          </select>
          <div className="absolute right-3 top-3 pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="border border-gray-200 rounded-md p-4 relative bg-white hover:shadow-md transition">
              {/* Image placeholder */}
              <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center mb-4">
                <span className="text-gray-400">📷</span>
              </div>

              {/* Bookmark */}
            <button
              className="absolute top-4 right-4"
              onClick={() => toggleBookmark(job.id)}>
              <Bookmark
                className="w-5 h-5 transition-all"
                strokeWidth={2}
                stroke={bookmarkedJobs.has(job.id) ? "#3B82F6" : "#9CA3AF"} // Tailwind's blue-500 and gray-400
                fill={bookmarkedJobs.has(job.id) ? "#3B82F6" : "none"}
              />
            </button>


              {/* Job Info */}
              <h4 className="text-base font-semibold mb-1">{job.title}</h4>
              <p className="text-sm text-gray-600 mb-1">
                {job.location} &bull; {job.type} &bull; {job.remote ? "Remote" : "On-site"}
              </p>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">{job.description}</p>

              {/* Button */}
              <button className="w-full text-sm text-center py-2 border border-gray-300 rounded hover:bg-gray-100 transition">
                Apply now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">No matching jobs found.</div>
      )}

      {/* View All */}
      <div className="mt-6 flex justify-center">
        <button className="text-sm border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition">
          View all
        </button>
      </div>
    </div>
  );
};

export default SimilarJobs;
